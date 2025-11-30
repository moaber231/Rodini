import React from 'react';

const ContactPage = ({ image = `${process.env.PUBLIC_URL}/Μπεζέδες-2-1365x2048.png` }) => {
  return (
    <main>
      <div className="container-fluid px-0">
        <div className="hero-banner position-relative">
          <img src={image} alt="contact-hero" className="img-fluid w-100" style={{ height: 240, objectFit: 'cover' }} />
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <h2>Ροδίνι Ζαχαροπλαστείο</h2>
            <p className="mb-1">Πατριάρχου Ιωακείμ 7, Θεσσαλονίκη 546 22</p>
            <p className="mb-1">+30 231 023 3365</p>
            <p className="mb-3">hello@zaxaroplastio-rodini.gr</p>

            <h5 className="mt-4">ΕΛΑΤΕ Ή ΑΦΗΣΤΕ ΜΗΝΥΜΑ</h5>
            <p>Επικοινωνήστε μαζί μας για οποιοδήποτε θέμα σχετικό με την εταιρεία ή τις υπηρεσίες μας. Θα σας απαντήσουμε το συντομότερο.</p>

            <form>
              <div className="mb-2">
                <input className="form-control form-control-sm" placeholder="Ονοματεπώνυμο" />
              </div>
              <div className="mb-2">
                <input className="form-control form-control-sm" placeholder="Το email σας" />
              </div>
              <div className="mb-2">
                <textarea className="form-control form-control-sm" placeholder="Μήνυμα" rows="4"></textarea>
              </div>
              <div>
                <button type="button" className="btn btn-primary">ΑΠΟΣΤΟΛΗ</button>
              </div>
            </form>
          </div>

          <div className="col-12 col-md-6">
            <div className="ratio ratio-16x9 mb-3">
              <iframe src={`https://maps.google.com/maps?q=${encodeURIComponent('Πατριάρχου Ιωακείμ 7, Θεσσαλονίκη')}&t=&z=15&ie=UTF8&iwloc=&output=embed`} title="map" style={{ border: 0 }} allowFullScreen loading="lazy" />
            </div>

            <div>
              <img src={image} alt="contact" className="img-fluid w-100" style={{ height: 200, objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
