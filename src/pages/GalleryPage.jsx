import { useEffect } from 'react';
import GallerySection from '../components/GallerySection';
import FinalCTASection from '../components/FinalCTASection';

export default function GalleryPage() {
  useEffect(() => {
    document.title = 'Gallery | Royal Nail Store';
  }, []);

  return (
    <>
      <GallerySection />
      <FinalCTASection />
    </>
  );
}
