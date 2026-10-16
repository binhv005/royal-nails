import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { BookButton, BrandLogo, CallButton } from './ui';
import { BUSINESS } from '../config/business';
import { NAV_LINKS, SERVICES } from '../data/content';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('top'); // top (over the hero) | wine | cream
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [megaClosed, setMegaClosed] = useState(false);
  const [megaId, setMegaId] = useState(SERVICES[0].id); // service previewed in the Services menu
  const menuRef = useRef(null);

  useEffect(() => {
    // Which section sits under the bar decides its colour: transparent over the hero,
    // wine over wine sections and the footer, cream over everything else.
    const WINE = ['services', 'why', 'faq', 'footer', 'svc-hero'];
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
    onScroll(); // again after the new page has been laid out and scrolled to the top
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    // Closed menu is removed from the tab order and accessibility tree.
    if (menuRef.current) menuRef.current.inert = !open;
    document.body.classList.toggle('menu-open', open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const close = () => setOpen(false);

  const mega = SERVICES.find((sv) => sv.id === megaId) || SERVICES[0];
  const pool = [mega.image, ...(mega.more || []).map((m) => m.src)];
  const megaPhotos = Array.from({ length: 5 }, (_, i) => pool[i % pool.length]);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}${theme !== 'top' || open ? ' header--solid' : ''}${theme === 'wine' || open ? ' header--dark' : ''}${open ? ' header--open' : ''}`}>
      <div className="container header__inner">
        <BrandLogo />

        <nav className="header__nav" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const item = (
              <NavLink to={link.to} end={!link.sub} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                {link.label}
                {link.sub && <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />}
              </NavLink>
            );
            return link.sub ? (
              <div
                key={link.to}
                className={`nav-item nav-item--sub${megaClosed ? ' is-closed' : ''}`}
                onMouseLeave={() => setMegaClosed(false)}
                onClick={() => setMegaClosed(true)}
              >
                {item}
                <div className="nav-sub">
                  <div className="nav-sub__inner">
                    <div className="nav-sub__info">
                      <p className="nav-sub__eyebrow">Explore</p>
                      <Link to="/services" className="nav-sub__title">
                        {mega.title} <ArrowRight size={20} strokeWidth={1.6} aria-hidden="true" />
                      </Link>
                      <p className="nav-sub__text">{mega.tagline}</p>
                      <ul className="nav-sub__pills">
                        {SERVICES.map((sv) => (
                          <li key={sv.id}>
                            <Link
                              to={`/services/${sv.id}`}
                              className={sv.id === megaId ? 'is-hover' : undefined}
                              onMouseEnter={() => setMegaId(sv.id)}
                              onFocus={() => setMegaId(sv.id)}
                            >
                              {sv.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="nav-sub__photos" key={mega.id} aria-hidden="true">
                      {megaPhotos.map((src, i) => (
                        <img key={i} src={src} alt="" loading="lazy" decoding="async" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div key={link.to} className="nav-item">{item}</div>
            );
          })}
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
            <div key={link.to} className="mobile-menu__item">
              <NavLink to={link.to} end={!link.sub} onClick={close} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>{link.label}</NavLink>
              {link.sub && (
                <div className="mobile-menu__sub">
                  {SERVICES.map((sv) => (
                    <Link key={sv.id} to={`/services/${sv.id}`} onClick={close}>{sv.title}</Link>
                  ))}
                </div>
              )}
            </div>
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
