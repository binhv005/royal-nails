// Small shared building blocks used across sections.
import { Link } from 'react-router-dom';
import { CalendarDays, Phone } from 'lucide-react';
import { BUSINESS, telHref } from '../config/business';
import { EVENTS, track } from '../lib/analytics';

// Official logo artwork, used as provided: public/Royal Lotus Nails & Spa Logo.png
export const LOGO_SRC = '/Royal%20Lotus%20Nails%20&%20Spa%20Logo.png';

export function BrandLogo({ size = 'md' }) {
  return (
    <Link to="/" className={`brand brand--${size}`} aria-label={`${BUSINESS.businessName} — home`}>
      <img src={LOGO_SRC} alt={BUSINESS.businessName} width="1536" height="1024" />
    </Link>
  );
}

// Two-part title: bold uppercase line plus an italic script line tucked underneath.
export function TitleParts({ parts }) {
  const [main, accent] = parts;
  return (
    <>
      <span className="title__main">{main}</span>
      <span className="title__accent">{accent}</span>
    </>
  );
}

export function SectionHeading({ title, description, align = 'left', id, light = false, className = '' }) {
  return (
    <div className={`heading heading--${align}${light ? ' heading--light' : ''}${className ? ` ${className}` : ''}`}>
      <h2 id={id} className="heading__title">{Array.isArray(title) ? <TitleParts parts={title} /> : title}</h2>
      {description && <p className="heading__text">{description}</p>}
    </div>
  );
}

// Fine-line lotus used as a quiet brand motif.
export function LotusMark({ className = '' }) {
  return (
    <svg className={`lotus ${className}`} viewBox="0 0 120 64" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M60 58C52 47 50 28 60 8c10 20 8 39 0 50Z" />
      <path d="M60 58c-10-5-21-16-23-33 13 2 21 14 23 33Z" />
      <path d="M60 58c10-5 21-16 23-33-13 2-21 14-23 33Z" />
      <path d="M60 58C46 58 28 52 17 38c15-4 31 6 43 20Z" />
      <path d="M60 58c14 0 32-6 43-20-15-4-31 6-43 20Z" />
      <path d="M4 58h40M76 58h40" strokeLinecap="round" />
    </svg>
  );
}

export const bookingHref = BUSINESS.bookingUrl || '/contact';
const bookingExternal = BUSINESS.bookingUrl ? { target: '_blank', rel: 'noopener noreferrer' } : null;

export function BookButton({ children = 'Book an Appointment', variant = 'primary', icon = false, className = '', location, onClick }) {
  const props = {
    className: `btn btn--${variant} ${className}`,
    onClick: () => {
      track(EVENTS.book, { location });
      onClick?.();
    },
  };
  const content = (
    <>
      {icon && <CalendarDays size={17} strokeWidth={1.6} aria-hidden="true" />}
      {children}
    </>
  );
  return bookingExternal ? (
    <a href={bookingHref} {...bookingExternal} {...props}>{content}</a>
  ) : (
    <Link to={bookingHref} {...props}>{content}</Link>
  );
}

// Renders nothing until a verified phone number is configured — no dead tel: links.
export function CallButton({ children = 'Call Now', variant = 'secondary', className = '', location, onClick }) {
  if (!telHref) return null;
  return (
    <a
      href={telHref}
      className={`btn btn--${variant} ${className}`}
      onClick={() => {
        track(EVENTS.call, { location });
        onClick?.();
      }}
    >
      <Phone size={16} strokeWidth={1.6} aria-hidden="true" />
      {children}
    </a>
  );
}
