import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BookButton, BrandLogo, CallButton } from './ui';
import { BUSINESS } from '../config/business';
import { NAV_LINKS } from '../data/content';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('top'); // top (over the hero) | wine | cream
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('#home');
  const menuRef = useRef(null);

  useEffect(() => {
    // Which section sits under the bar decides its colour: transparent over the hero,
    // wine over wine sections and the footer, cream over everything else.
    const WINE = ['services', 'why', 'faq', 'footer'];
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 16);
      const probe = 40;
      const els = document.querySelectorAll('main > section, footer');
      let next = 'cream';
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          if (el.classList.contains('hero')) next = 'top';
          else if (WINE.some((n) => el.classList.contains(n))) next = 'wine';
          break;
        }
      }
      setTheme(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
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
    <header className={`header${scrolled ? ' header--scrolled' : ''}${theme !== 'top' || open ? ' header--solid' : ''}${theme === 'wine' || open ? ' header--dark' : ''}${open ? ' header--open' : ''}`}>
      <div className="container header__inner">
        <BrandLogo />

        <nav className="header__nav" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={current === link.href ? 'is-active' : undefined} aria-current={current === link.href ? 'location' : undefined}>{link.label}</a>
          ))}
        </nav>

        <p className="header__marquee" aria-label={BUSINESS.tagline}>
          <span className="header__marquee-track" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>{BUSINESS.tagline}</span>
            ))}
          </span>
        </p>

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
