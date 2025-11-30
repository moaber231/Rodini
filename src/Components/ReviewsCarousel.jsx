import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

// --- Helper Component για τα Αστέρια ---
const Stars = ({ count = 5 }) => (
  <div className="flex justify-center" style={{ color: '#FFC107' }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className="text-xl">
        {i < count ? '★' : '☆'}
      </span>
    ))}
  </div>
);

// --- Dummy Data (Προσομοίωση δεδομένων από API) ---
// Θα αντικατασταθεί με την πραγματική κλήση API
const fetchReviewsFromApi = async () => {
    // Καθυστέρηση για προσομοίωση κλήσης δικτύου
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    return [
        { id: 1, author: 'Γιώργος Π.', text: 'Πολύ γρήγορη εξυπηρέτηση και άριστη ποιότητα στα προϊόντα!', stars: 5 },
        { id: 2, author: 'Μαρία Κ.', text: 'Εξαιρετική εμπειρία αγοράς. Σίγουρα θα ξαναψωνίσω.', stars: 4 },
        { id: 3, author: 'Νίκος Δ.', text: 'Το κατάστημα Rodini είναι η πρώτη μου επιλογή για είδη δώρων.', stars: 5 },
        { id: 4, author: 'Ελένη Ζ.', text: 'Χρειάζεται βελτίωση στο delivery.', stars: 3 },
    ];
};

const ReviewsCarousel = () => {
    // 1. Αποθήκευση των Reviews
    const [reviews, setReviews] = useState([]);
    // 2. State για την φόρτωση
    const [loading, setLoading] = useState(true);
    // 3. State για πιθανό λάθος
    const [error, setError] = useState(null);

    // 4. useEffect Hook για την Φόρτωση των Δεδομένων
    useEffect(() => {
        const loadReviews = async () => {
            try {
                // Εδώ γίνεται η ΠΡΑΓΜΑΤΙΚΗ κλήση στο API
                const data = await fetchReviewsFromApi(); 
                setReviews(data);
                setError(null);
            } catch (err) {
                console.error("Σφάλμα κατά τη φόρτωση αξιολογήσεων:", err);
                setError('Αδυναμία φόρτωσης αξιολογήσεων. Δοκιμάστε αργότερα.');
            } finally {
                // Όταν ολοκληρωθεί (επιτυχώς ή με λάθος), σταματάει η φόρτωση
                setLoading(false); 
            }
        };

        loadReviews();
    }, []); // Το κενό array [] σημαίνει ότι τρέχει ΜΙΑ ΦΟΡΑ (όταν φορτώνει το component)

    // --- Render Logic ---

    if (loading) return (<div className="my-12 container text-center"><h2>Αξιολογήσεις Πελατών</h2><p>Φόρτωση...</p></div>);
    if (error) return (<div className="my-12 container text-center text-danger"><h2>Αξιολογήσεις Πελατών</h2><p>{error}</p></div>);
    if (reviews.length === 0) return (<div className="my-12 container text-center"><h2>Αξιολογήσεις Πελατών</h2><p>Δεν βρέθηκαν αξιολογήσεις.</p></div>);

    const placeholder = 'https://via.placeholder.com/900x360?text=Ροδίνι';

    return (
        <div className="my-12 container px-2">
            <h2 className="h3 text-center mb-4">Τι Λένε οι Πελάτες μας</h2>
            <Carousel prevLabel="Προηγούμενο" nextLabel="Επόμενο" prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />} nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}>
                {reviews.map((r) => (
                    <Carousel.Item key={r.id} interval={5000}>
                        <div className="d-flex flex-column flex-md-row align-items-center p-4" style={{gap:16}}>
                            <img src={placeholder} alt="review" className="d-none d-md-block" style={{width:300, height:160, objectFit:'cover', borderRadius:8}}/>
                            <div>
                                <Stars count={r.stars || 5} />
                                <p className="mt-3">"{r.text}"</p>
                                <p className="mt-2 text-end"><strong>- {r.author}</strong></p>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default ReviewsCarousel;