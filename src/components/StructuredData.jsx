import { useEffect } from 'react';
import { BUSINESS } from '../config/business';

// Emits schema.org NailSalon JSON-LD only when the core business details are verified.
// Nothing is rendered while name/phone/address are incomplete.
export default function StructuredData() {
  useEffect(() => {
    const { address, phone, siteUrl, openingHours, socialLinks, businessName } = BUSINESS;
    if (!address || !phone) return undefined;

    const data = {
      '@context': 'https://schema.org',
      '@type': 'NailSalon',
      name: businessName,
      telephone: phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: address.street,
        addressLocality: address.city,
        addressRegion: address.region,
        postalCode: address.postalCode,
        addressCountry: 'US',
      },
      ...(siteUrl && { url: siteUrl }),
      ...(socialLinks.length && { sameAs: socialLinks.map((s) => s.url) }),
      ...(openingHours.some((h) => h.schema) && { openingHours: openingHours.map((h) => h.schema).filter(Boolean) }),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return null;
}
