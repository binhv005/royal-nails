import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { BrandLogo } from './ui';
import { NAV_LINKS } from '../data/content';
import { BUSINESS, fullAddress, locationLabel, telHref } from '../config/business';
import { EVENTS, track } from '../lib/analytics';

export default function Footer() {
  const year = new Date().getFullYear();
  const { email, socialLinks, privacyPolicyUrl, termsUrl, businessName, mapUrl, mapEmbedUrl, city, stateCode } = BUSINESS;

  // Official URLs once configured (config/business.js); until then Google Maps searches the
  // business name + address/city, so no location is invented.
  const query = encodeURIComponent([businessName, fullAddress || `${city}, ${stateCode}`].join(' '));
  const mapSrc = mapEmbedUrl || `https://www.google.com/maps?q=${query}&output=embed`;
  const mapsLink = mapUrl || `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <BrandLogo size="lg" />
          <p>{businessName} — Nail &amp; Beauty Services in {locationLabel}.</p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h3>Explore</h3>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
        </nav>

        <div className="footer__col">
          <h3>Contact</h3>
          <p>{fullAddress || `${locationLabel}, ${BUSINESS.country}`}</p>
          {telHref && <a href={telHref} onClick={() => track(EVENTS.call, { location: 'footer' })}>{BUSINESS.phone}</a>}
          {email && <a href={`mailto:${email}`}>{email}</a>}
          {socialLinks.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" onClick={() => track(EVENTS.social, { network: s.label })}>
              {s.label}
            </a>
          ))}
          <Link to="/contact">Request an Appointment</Link>
        </div>

        <div className="footer__map">
          <div className="footer__map-head">
            <h3>Location Map</h3>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" onClick={() => track(EVENTS.directions)}>
              Open Maps <ExternalLink size={15} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
          <div className="footer__map-frame">
            <iframe
              title={`Map showing the location of ${businessName}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a className="footer__map-btn" href={mapsLink} target="_blank" rel="noopener noreferrer" onClick={() => track(EVENTS.directions)}>
              Open in Maps <ExternalLink size={14} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {year} {businessName}. All rights reserved.</p>
        {(privacyPolicyUrl || termsUrl) && (
          <div className="footer__legal">
            {privacyPolicyUrl && <a href={privacyPolicyUrl}>Privacy Policy</a>}
            {termsUrl && <a href={termsUrl}>Terms of Use</a>}
          </div>
        )}
      </div>
    </footer>
  );
}
