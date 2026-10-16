import { useEffect, useState } from 'react';
import { BookButton, CallButton } from './ui';

// Fixed Call / Book bar on small screens. It steps aside while the guest is
// typing in the booking form so it never covers fields or the submit button.
export default function MobileCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const form = () => document.querySelector('.booking__form');
    const onFocusIn = (e) => setHidden(Boolean(form()?.contains(e.target)));
    const onFocusOut = () => setTimeout(() => setHidden(Boolean(form()?.contains(document.activeElement))), 0);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  return (
    <div className={`mobile-cta${hidden ? ' is-hidden' : ''}`}>
      <CallButton variant="secondary" location="mobile_bar">Call</CallButton>
      <BookButton location="mobile_bar" icon>Book</BookButton>
    </div>
  );
}
