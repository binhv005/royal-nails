import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Siblings that share a row enter one after another.
const STAGGER = '.svc-card, .gallery__tile';

// Fades `.reveal` elements in as they enter the viewport. The hiding styles only
// apply once `js-reveal` is set, so content stays visible if this never runs.
export default function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) return undefined;

    document.documentElement.classList.add('js-reveal');

    document.querySelectorAll(STAGGER).forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${(i % 3) * 110}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);
}
