import React from 'react';

const HoursPage = ({ image = `${process.env.PUBLIC_URL}/Μπεζέδες-2-1365x2048.png` }) => {
  const hours = [
    ['Δευτέρα – Παρασκευή', '08:00 – 23:00'],
    ['Σάββατο', '08:00 – 23:00'],
    ['Κυριακή', '08:00 – 23:00'],
  ];

  return (
    <main>
      <div className="container-fluid px-0">
        <div className="hero-banner position-relative">
          <img src={image} alt="hero" className="img-fluid w-100" style={{ height: 320, objectFit: 'cover' }} />
          <div className="hero-overlay d-flex align-items-center justify-content-center">
            <h1 className="display-5 text-white fw-bold">ΩΡΑΡΙΟ ΚΑΤΑΣΤΗΜΑΤΟΣ</h1>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <h3 className="mb-3">ΠΛΗΡΟΦΟΡΙΕΣ</h3>
            <p className="lead">ΤΑ ΓΛΥΚΑ ΜΑΣ ΕΙΝΑΙ ΕΔΩ ΓΙΑ ΣΑΣ ΧΩΡΙΣ ΠΕΡΙΟΡΙΣΜΟΥΣ</p>
            <p>Μπορείτε πάντα να βλέπετε τις τρέχουσες ώρες λειτουργίας μας εδώ. Απλώς επισκεφτείτε μας. Σας περιμένουμε με χαρά!</p>
          </div>

          <div className="col-12 col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Ωράριο</h5>
                <ul className="list-unstyled mb-0">
                  {hours.map(([d, t]) => (
                    <li key={d} className="d-flex justify-content-between py-2 border-bottom">
                      <span>{d}</span>
                      <strong>{t}</strong>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 small text-muted">*Εκτός αυτών των ωρών λειτουργίας, είμαστε στην ευχάριστη θέση να σας εξυπηρετήσουμε κατόπιν συνεννόησης.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HoursPage;
