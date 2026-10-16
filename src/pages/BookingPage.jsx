import { useEffect } from 'react';
import BookingSection from '../components/BookingSection';

export default function BookingPage() {
  useEffect(() => {
    document.title = 'Contact & Booking | Royal Nail Store';
  }, []);

  return (
    <>
      <BookingSection />
    </>
  );
}
