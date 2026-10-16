import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileCTA from './components/MobileCTA';
import StructuredData from './components/StructuredData';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BookingPage from './pages/BookingPage';
import useReveal from './hooks/useReveal';
import { missingBusinessData } from './config/business';

export default function App() {
  const { pathname } = useLocation();
  useReveal();

  // Every page change starts at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      const missing = missingBusinessData();
      // Development-only reminder; never runs in production builds.
      if (missing.length) console.info('[Royal Nail Store] Still to configure before launch:', missing.join(', '));
    }
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" className={pathname === '/' ? undefined : 'main--sub'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<BookingPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <MobileCTA />
      <StructuredData />
    </>
  );
}
