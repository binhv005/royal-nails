import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import FAQSection from '../components/FAQSection';
import FinalCTASection from '../components/FinalCTASection';

export default function Home() {
  useEffect(() => {
    document.title = 'Royal Nail Store | Nail & Beauty Services in Ventura, CA';
  }, []);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
