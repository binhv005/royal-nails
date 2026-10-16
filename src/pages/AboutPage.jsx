import { useEffect } from 'react';
import AboutSection from '../components/AboutSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import FinalCTASection from '../components/FinalCTASection';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About | Royal Nail Store';
  }, []);

  return (
    <>
      <AboutSection />
      <WhyChooseUsSection />
      <FinalCTASection />
    </>
  );
}
