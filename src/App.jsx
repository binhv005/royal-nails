import { useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import GallerySection from './components/GallerySection';
import AboutSection from './components/AboutSection';
import BookingSection from './components/BookingSection';
import FAQSection from './components/FAQSection';
import FinalCTASection from './components/FinalCTASection';
import Footer from './components/Footer';
import MobileCTA from './components/MobileCTA';
import StructuredData from './components/StructuredData';
import useReveal from './hooks/useReveal';
import { missingBusinessData } from './config/business';

export default function App() {
  useReveal();

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
      <main id="main">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <WhyChooseUsSection />
        <GallerySection />
        <FAQSection />
        <BookingSection />
        <FinalCTASection />
      </main>
      <Footer />
      <MobileCTA />
      <StructuredData />
    </>
  );
}
