import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// emailjs will be dynamically imported when needed to avoid build-time errors

const money = (v) => `€${v.toFixed(2)}`;

const validatePhone = (phone) => {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 6; // simple check
};

const luhnCheck = (value) => {
  const digits = value.replace(/\D/g, '');
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits.charAt(i), 10);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

const validateExpiry = (exp) => {
  if (!exp) return false;
  const cleaned = exp.trim();
  const parts = cleaned.split('/');
  if (parts.length !== 2) return false;
  let month = parseInt(parts[0], 10);
  let year = parseInt(parts[1], 10);
  if (isNaN(month) || isNaN(year)) return false;
  if (year < 100) {
    // assume YY -> 20YY
    year += 2000;
  }
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const expDate = new Date(year, month - 1 + 1, 1); // first day of month after expiry
  return expDate > now;
};

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 19);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

const CartPage = () => {
  const { items, updateQty, removeItem, clear, total } = useCart();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({ name: '', address: '', phone: '' });
  const [payment, setPayment] = useState({ method: 'card', cardName: '', cardNumber: '', expiry: '' });
  const [errors, setErrors] = useState({});
  const [emailStatus, setEmailStatus] = useState(null);
  const navigate = useNavigate();
  const summaryRef = useRef();

  const itemCount = items.reduce((s, it) => s + it.qty, 0);

  const next = () => {
    const errs = {};
    if (step === 1) {
      if (!shipping.name.trim()) errs.name = 'Απαιτείται το ονοματεπώνυμο';
      if (!shipping.address.trim()) errs.address = 'Απαιτείται διεύθυνση';
      if (!validatePhone(shipping.phone)) errs.phone = 'Εισάγετε έγκυρο τηλέφωνο';
    }
    if (step === 2 && payment.method === 'card') {
      if (!payment.cardName.trim()) errs.cardName = 'Απαιτείται όνομα κάρτας';
      const cleaned = payment.cardNumber.replace(/\s/g, '');
      if (!/^[0-9]{12,19}$/.test(cleaned) || !luhnCheck(cleaned)) errs.cardNumber = 'Εισάγετε έγκυρο αριθμό κάρτας';
      if (!validateExpiry(payment.expiry)) errs.expiry = 'Εισάγετε έγκυρη ημερομηνία λήξης (MM/YY)';
    }
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep((s) => Math.min(4, s + 1));
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  const placeOrder = async () => {
    // demo: generate PDF, try to send email (if configured), then clear cart
    await exportPdf();
    // try sending EmailJS if configured
    const emailRes = await sendEmailJS();
    if (!emailRes.ok) {
      console.warn('EmailJS not sent:', emailRes.message);
      setEmailStatus({ type: 'error', message: emailRes.message || 'EmailJS not configured' });
    } else {
      setEmailStatus({ type: 'success', message: 'Η παραγγελία στάλθηκε με email.' });
    }
    clear();
    setStep(4);
  };

  const exportPdf = async () => {
    if (!summaryRef.current) return;
    const el = summaryRef.current;
    const canvas = await html2canvas(el, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('rodini-order.pdf');
    return pdf.output('datauristring');
  };

  const sendEmail = () => {
    const subject = encodeURIComponent('Νέα Παραγγελία από Ροδίνι');
    let body = `Παραγγελία (${new Date().toLocaleString()}):%0D%0A`;
    body += `Όνομα: ${shipping.name}%0D%0AΔιεύθυνση: ${shipping.address}%0D%0AΤηλέφωνο: ${shipping.phone}%0D%0A%0D%0A`;
    items.forEach((it) => {
      body += `${it.title} - ${it.qty} x ${it.price.toFixed(2)}€ = ${ (it.qty * it.price).toFixed(2) }€%0D%0A`;
    });
    body += `%0D%0AΣύνολο: ${total.toFixed(2)}€`;
    const mailto = `mailto:?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const sendEmailJS = async () => {
    // Dynamic import so build doesn't fail when 'emailjs-com' is not installed.
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userId = process.env.REACT_APP_EMAILJS_USER_ID || null;
    if (!serviceId || !templateId) return { ok: false, message: 'EmailJS not configured' };
    try {
      // generate pdf data uri to attach
      let pdfDataUri = null;
      if (summaryRef.current) {
        const canvas = await html2canvas(summaryRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdfDataUri = pdf.output('datauristring');
      }

      const templateParams = {
        date: new Date().toLocaleString(),
        name: shipping.name,
        address: shipping.address,
        phone: shipping.phone,
        items: items.map((it) => `${it.title} x${it.qty} = ${ (it.qty * it.price).toFixed(2) }€`).join('\n'),
        total: total.toFixed(2),
        attachment: pdfDataUri,
      };

      let emailjsModule;
      try {
        emailjsModule = await import('emailjs-com');
      } catch (impErr) {
        return { ok: false, message: 'EmailJS module not installed' };
      }

      const emailjsLib = emailjsModule.default || emailjsModule;
      if (userId && emailjsLib.init) emailjsLib.init(userId);
      if (!emailjsLib.send) return { ok: false, message: 'EmailJS send not available' };
      await emailjsLib.send(serviceId, templateId, templateParams, userId);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err?.text || err?.message || String(err) };
    }
  };

  if (!items.length && step < 4) {
    return (
      <div className="container py-5">
        <h2>Το καλάθι είναι κενό</h2>
        <p>Προσθέστε προϊόντα από τη σελίδα προϊόντων.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Καλάθι — {itemCount} αντικείμενα</h2>
      {emailStatus && (
        <div className={`alert ${emailStatus.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
          {emailStatus.message}
        </div>
      )}

      {/* Stepper */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          {[
            { id: 1, label: 'Διεύθυνση' },
            { id: 2, label: 'Πληρωμή' },
            { id: 3, label: 'Ανασκόπηση' },
            { id: 4, label: 'Επιβεβαίωση' },
          ].map((s) => (
            <div key={s.id} className="text-center" style={{ flex: 1 }}>
              <div className={`mx-auto mb-1 rounded-circle d-flex align-items-center justify-content-center ${step === s.id ? 'bg-primary text-white' : s.id < step ? 'bg-success text-white' : 'bg-light text-muted'}`} style={{ width: 40, height: 40 }}>
                {s.id}
              </div>
              <div className={`small ${step === s.id ? 'fw-bold' : ''}`}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className="progress mt-3" style={{ height: 6 }}>
          <div className="progress-bar" role="progressbar" style={{ width: `${((step - 1) / 3) * 100}%` }} aria-valuenow={step} aria-valuemin="0" aria-valuemax="4"></div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card p-3 mb-3">
            {step === 1 && (
              <section>
                <h4 className="mb-3">1. Διεύθυνση αποστολής</h4>
                <div className="mb-3">
                  <label className="form-label">Ονοματεπώνυμο</label>
                  <input className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Διεύθυνση</label>
                  <input className={`form-control ${errors.address ? 'is-invalid' : ''}`} value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Τηλέφωνο</label>
                  <input className={`form-control ${errors.phone ? 'is-invalid' : ''}`} value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Συνέχισε ψώνια</button>
                  <button className="btn btn-primary" onClick={next}>Συνέχεια στην πληρωμή</button>
                </div>
              </section>
            )}

            {step === 2 && (
              <section>
                <h4 className="mb-3">2. Πληρωμή</h4>
                <div className="mb-3">
                  <label className="form-label">Τρόπος πληρωμής</label>
                  <select className="form-select" value={payment.method} onChange={(e) => setPayment({ ...payment, method: e.target.value })}>
                    <option value="card">Κάρτα</option>
                    <option value="cash">Μετρητά κατά την παράδοση</option>
                  </select>
                </div>
                {payment.method === 'card' && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Όνομα κάρτας</label>
                      <input className={`form-control ${errors.cardName ? 'is-invalid' : ''}`} value={payment.cardName} onChange={(e) => setPayment({ ...payment, cardName: e.target.value })} />
                      {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Αριθμός κάρτας</label>
                      <input className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`} value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: formatCardNumber(e.target.value) })} />
                      {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                      <div className="mt-2">
                        {payment.cardNumber.replace(/\D/g, '').length > 0 && (
                          (() => {
                            const cleaned = payment.cardNumber.replace(/\D/g, '');
                            const valid = cleaned.length >= 12 && luhnCheck(cleaned);
                            return (
                              <small className={valid ? 'text-success' : 'text-danger'}>
                                {valid ? 'Έγκυρος αριθμός κάρτας' : 'Άκυρος αριθμός κάρτας'}
                              </small>
                            );
                          })()
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Ημερομηνία λήξης</label>
                      <input className={`form-control ${errors.expiry ? 'is-invalid' : ''}`} value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} placeholder="MM/YY" />
                      {errors.expiry && <div className="invalid-feedback">{errors.expiry}</div>}
                    </div>
                  </>
                )}
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-secondary" onClick={prev}>Πίσω</button>
                  <button className="btn btn-primary" onClick={next}>Συνέχεια στην ανασκόπηση</button>
                </div>
              </section>
            )}

            {step === 3 && (
              <section>
                <h4 className="mb-3">3. Ανασκόπηση παραγγελίας</h4>
                <div className="list-group mb-3">
                  {items.map((it) => (
                    <div key={it.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{it.title}</strong>
                        <div className="small">{money(it.price)} x {it.qty}</div>
                      </div>
                      <div className="d-flex align-items-center">
                        <input type="number" min={1} value={it.qty} className="form-control form-control-sm me-2" style={{ width: 80 }} onChange={(e) => updateQty(it.id, Number(e.target.value) || 1)} />
                        <button className="btn btn-sm btn-danger" onClick={() => removeItem(it.id)}>Αφαίρεση</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <strong>Σύνολο:</strong>
                  <div>{money(total)}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-secondary" onClick={prev}>Πίσω</button>
                  <button className="btn btn-success" onClick={placeOrder}>Επιβεβαίωση παραγγελίας</button>
                </div>
              </section>
            )}

            {step === 4 && (
              <section>
                <h4 className="mb-3">4. Επιβεβαίωση</h4>
                <p>Η παραγγελία σας καταχωρήθηκε επιτυχώς. Σας ευχαριστούμε!</p>
                <div className="d-flex gap-2 mb-3">
                  <button className="btn btn-primary" onClick={() => navigate('/')}>Επιστροφή στο κατάστημα</button>
                  <button className="btn btn-outline-secondary" onClick={exportPdf}>Λήψη παραγγελίας (PDF)</button>
                  <button className="btn btn-outline-info" onClick={sendEmail}>Αποστολή μέσω email</button>
                </div>
              </section>
            )}
          </div>
        </div>

        <aside className="col-12 col-lg-4">
          <div className="card p-3" ref={summaryRef}>
            <h5 className="mb-3">Περίληψη παραγγελίας</h5>
            {items.map((it) => (
              <div key={it.id} className="d-flex justify-content-between small mb-2">
                <div>{it.title} × {it.qty}</div>
                <div>{money(it.price * it.qty)}</div>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between fw-bold"> <div>Σύνολο</div> <div>{money(total)}</div> </div>
            <div className="text-muted small mt-2">Τα προσωπικά σας στοιχεία θα χρησιμοποιηθούν μόνο για την επεξεργασία της παραγγελίας.</div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
