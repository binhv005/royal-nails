import { useEffect } from 'react';
import ServicesSection from '../components/ServicesSection';
import FinalCTASection from '../components/FinalCTASection';

export default function ServicesPage() {
  useEffect(() => {
    document.title = 'Services | Royal Nail Store';
  }, []);

  return (
    <>
      <ServicesSection />
      <FinalCTASection />
    </>
  );
}
