import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import CartPage from './Components/CartPage';
import { CartProvider } from './context/CartContext';
import CarouselPreview from './Components/CarouselPreview';
import ReviewsCarousel from './Components/ReviewsCarousel';
import ImageTextReveal from './Components/ImageTextReveal';
import HoursPage from './Components/HoursPage';
import ContactPage from './Components/ContactPage';
import About from './Components/About';
import ProductsList from './Components/ProductsList';
import ProductDetail from './Components/ProductDetail';
import CateringList from './Components/CateringList';
import CateringDetail from './Components/CateringDetail';
import PageWrapper from './Components/PageWrapper';

function App() {
  const carouselImages = [
    `${process.env.PUBLIC_URL}/main1.png`,
    `${process.env.PUBLIC_URL}/main2.png`,
    `${process.env.PUBLIC_URL}/main3.png`,
  ];

  const reviews = [
    { author: 'Maria P.', text: 'Υπέροχα προϊόντα και άμεση εξυπηρέτηση!', stars: 5 },
    { author: 'Giorgos K.', text: 'Γευστικά και υψηλή ποιότητα.', stars: 5 },
    { author: 'Eleni S.', text: 'Συνιστώ ανεπιφύλακτα.', stars: 4 },
  ];

  return (
    <BrowserRouter>
      <CartProvider>
      <div className="App min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <main>
                <CarouselPreview images={carouselImages} />
                <ImageTextReveal
                  image={`${process.env.PUBLIC_URL}/items/Γαμήλια-τούρτα-600x750.jpg`}
                  title="Ροδίνι - Παραδοσιακά γλυκά"
                  text="Με οδηγό τη δημιουργική έμπνευση, την παράδοση και την μακρόχρονη εμπειρία, το εργαστήριο-ζαχαροπλαστείο Ροδινι στέκει για 5 η δεκαετία..."
              />
                <ImageTextReveal
                  image={`${process.env.PUBLIC_URL}/items/Βασιλόπιτες-με-σοκολάταΟ.-600x453.jpg`}
                  title="Εξειδικευμένες παραγγελίες"
                  text="Οι μπεζέδες και τα ξακουστά Ροδίνια είναι το απαραίτητο κέρασμα..."
                  reverse
                />
                <ReviewsCarousel reviews={reviews} />
              </main>
            }
          />

          <Route path="/ωραριο-καταστηματος" element={<PageWrapper title="Ωράριο Καταστήματος"><HoursPage /></PageWrapper>} />
          <Route path="/επικοινωνια" element={<PageWrapper title="Επικοινωνία"><ContactPage /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper title="ΠΟΙΟΙ ΕΙΜΑΣΤΕ"><About /></PageWrapper>} />
          <Route path="/ΠΟΙΟΙ-ΕΙΜΑΣΤΕ" element={<PageWrapper title="ΠΟΙΟΙ ΕΙΜΑΣΤΕ"><About /></PageWrapper>} />
          {/* Listings and details */}
          <Route path="/προιοντα" element={<PageWrapper title="Προϊόντα"><ProductsList /></PageWrapper>} />
          <Route path="/προιοντα/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
          <Route path="/catering" element={<PageWrapper title="Catering"><CateringList /></PageWrapper>} />
          <Route path="/catering/:id" element={<PageWrapper><CateringDetail /></PageWrapper>} />
          <Route path="/καλαθι" element={<PageWrapper title="Καλάθι"><CartPage /></PageWrapper>} />
          <Route path="/cart" element={<PageWrapper title="Καλάθι"><CartPage /></PageWrapper>} />
          {/* English aliases */}
          <Route path="/hours" element={<PageWrapper title="Ωράριο Καταστήματος"><HoursPage /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper title="Επικοινωνία"><ContactPage /></PageWrapper>} />
        </Routes>

        <Footer />
      </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
