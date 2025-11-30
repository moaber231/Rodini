import React from 'react';

// Lightweight inline SVG icons sized for Bootstrap layout
const Icon = ({ children, size = 20 }) => (
    <span style={{ display: 'inline-flex', width: size, height: size, alignItems: 'center', justifyContent: 'center', marginRight: 8 }} aria-hidden>
        {children}
    </span>
);

const Footer = ({
    locationName = 'Rodini',
    address = 'Πατριάρχου Ιωακείμ 7, Θεσσαλονίκη 546 22',
    phone = '231 023 3365',
    email = 'info@eshoprodini.gr',
    mapQuery = 'Πατριάρχου Ιωακείμ 7, Θεσσαλονίκη 546 22, Greece',
    hours = [
        ['Δευτέρα', '8:00–22:30'],
        ['Τρίτη', '8:00–22:30'],
        ['Τετάρτη', '8:00–22:30'],
        ['Πέμπτη', '8:00–22:30'],
        ['Παρασκευή', '8:00–22:30'],
        ['Σάββατο', '8:00–15:00'],
        ['Κυριακή', 'Κλειστά'],
    ],
}) => {
    // Use a standard Google Maps embed URL that works without API key
    const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    const directMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

    return (
        <footer className="footer bg-dark text-white pt-5">
            <div className="container">
                <div className="row gy-4">
                    {/* Contact */}
                    <div className="col-12 col-md-6 col-lg-3">
                        <h5 className="footer-title">{locationName}</h5>
                        <p className="mb-2"><Icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg></Icon>
                            <small className="text-light">{address}</small>
                        </p>

                        <p className="mb-1"><Icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.01l-2.2 2.21z"/></svg></Icon>
                            <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-light text-decoration-none">{phone}</a>
                        </p>

                        <p className="mb-3"><Icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></Icon>
                            <a href={`mailto:${email}`} className="text-light text-decoration-none">{email}</a>
                        </p>

                        <div className="d-grid gap-2">
                            <a href={directMapLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Δες στους Χάρτες</a>
                            <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn btn-outline-light btn-sm">Κάλεσε τώρα</a>
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="col-12 col-md-6 col-lg-3">
                        <h5 className="footer-title">Ωράριο λειτουργίας</h5>
                        <ul className="list-unstyled">
                            {hours.map(([day, time]) => (
                                <li key={day} className="d-flex justify-content-between py-1 border-bottom border-secondary">
                                    <span className={time === 'Κλειστά' ? 'text-danger' : ''}>{day}</span>
                                    <span className={`fw-bold ${time === 'Κλειστά' ? 'text-danger' : ''}`}>{time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Map */}
                    <div className="col-12 col-lg-4">
                        <h5 className="footer-title">Βρείτε μας</h5>
                        <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm">
                            <iframe
                                title="Χάρτης Τοποθεσίας Καταστήματος"
                                src={mapSrc}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <p className="mt-2"><a href={directMapLink} target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none small">Άνοιγμα στο Google Maps</a></p>

                        {/* Social icons under map */}
                        <div className="mt-3 d-flex gap-2">
                            <a href="https://www.facebook.com/" aria-label="Facebook" className="text-light bg-secondary bg-opacity-10 rounded px-3 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M12 2H9a3 3 0 0 0-3 3v2H3v3h3v6h3v-6h2.5l.5-3H9V5a1 1 0 0 1 1-1h2V2z"/></svg>
                            </a>
                            <a href="https://www.youtube.com/" aria-label="YouTube" className="text-light bg-secondary bg-opacity-10 rounded px-3 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h-.102C3.668 2.043 1 2.816 1 8s2.668 5.957 6.949 6.001h.102C12.332 13.957 15 13.184 15 8s-2.668-5.957-6.949-6.001zM6.5 10.5V5.5L10.5 8 6.5 10.5z"/></svg>
                            </a>
                            <a href="https://x.com/" aria-label="Twitter" className="text-light bg-secondary bg-opacity-10 rounded px-3 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5 9.341-9.334 0-.14 0-.282-.009-.423A6.68 6.68 0 0 0 16 3.542a6.556 6.556 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.084.797A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.381A3.323 3.323 0 0 1 .64 6.575v.041a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.615-.057 3.293 3.293 0 0 0 3.066 2.284A6.588 6.588 0 0 1 .78 13.58 6.32 6.32 0 0 1 0 13.538a9.344 9.344 0 0 0 5.026 1.47"/></svg>
                            </a>
                            <a href="https://www.instagram.com/" aria-label="Instagram" className="text-light bg-secondary bg-opacity-10 rounded px-3 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3.5A4.5 4.5 0 1 0 8 12.5 4.5 4.5 0 0 0 8 3.5zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="mt-4" />

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center py-3 small text-white-50">
                    <div>© {new Date().getFullYear()} {locationName}. Όλα τα δικαιώματα διατηρούνται.</div>
                    <a href="https://konstantinos-gkogkos-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none small"><div>Created by <strong>K.Gkogkos</strong></div></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;