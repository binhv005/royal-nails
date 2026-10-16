import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BookButton, BrandLogo, CallButton } from './ui';
import { NAV_LINKS } from '../data/content';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('#home');
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav link of the section that is currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setCurrent(`#${e.target.id}`));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // Closed menu is removed from the tab order and accessibility tree.
    if (menuRef.current) menuRef.current.inert = !open;
    document.body.classList.toggle('menu-open', open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}${open ? ' header--open' : ''}`}>
      <div className="container header__inner">
        <BrandLogo />

        <nav className="header__nav" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={current === link.href ? 'is-active' : undefined} aria-current={current === link.href ? 'location' : undefined}>{link.label}</a>
          ))}
        </nav>

        <div className="header__actions">
          <CallButton variant="outline-light" className="btn--sm" location="header" />
          <BookButton variant="light" className="btn--sm" location="header" />
        </div>

        <button
          type="button"
          className="header__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      <div ref={menuRef} className={`mobile-menu${open ? ' is-open' : ''}`} id="mobile-menu">
        <nav aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={close} className={current === link.href ? 'is-active' : undefined}>{link.label}</a>
          ))}
        </nav>
        <div className="mobile-menu__actions">
          <BookButton location="mobile_menu" onClick={close} />
          <CallButton location="mobile_menu" onClick={close} />
        </div>
      </div>
    </header>
  );
}
