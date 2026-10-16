// Single source of truth for Royal Nail Store business details.
// Leave a field as `null` (or an empty array) until the salon owner provides
// verified information — the UI hides anything that is not configured,
// so no fake phone numbers, addresses or hours ever reach the page.

export const BUSINESS = {
  businessName: 'Royal Nail Store',
  tagline: 'Nail & Beauty Services in Ventura, California',
  city: 'Ventura',
  state: 'California',
  stateCode: 'CA',
  country: 'USA',

  phone: null, // e.g. '(805) 555-0000' — display format
  email: null, // official salon email only
  address: null, // e.g. { street: '', city: 'Ventura', region: 'CA', postalCode: '' }
  openingHours: [], // e.g. [{ days: 'Mon – Sat', hours: '9:30 AM – 7:00 PM' }]
  socialLinks: [], // e.g. [{ label: 'Instagram', url: 'https://instagram.com/...' }]

  bookingUrl: null, // external booking system, if the salon uses one
  mapUrl: null, // Google Maps directions link for the exact address
  mapEmbedUrl: null, // Google Maps embed URL for the exact address
  privacyPolicyUrl: null,
  termsUrl: null,
  siteUrl: null, // official domain, used for canonical/structured data
};

// Appointment request API (see .env.example). Not set = form shows it is not accepting requests yet.
export const APPOINTMENT_API_URL = import.meta.env.VITE_APPOINTMENT_API_URL || null;

// Analytics stays off until a properly configured tag + consent flow exist.
export const TRACKING_ENABLED = import.meta.env.VITE_ENABLE_TRACKING === 'true';

export const SALON_TIME_ZONE = 'America/Los_Angeles';

export const locationLabel = `${BUSINESS.city}, ${BUSINESS.state}`;

export const telHref = BUSINESS.phone ? `tel:${BUSINESS.phone.replace(/[^\d+]/g, '')}` : null;

export const fullAddress = BUSINESS.address
  ? [BUSINESS.address.street, BUSINESS.address.city, `${BUSINESS.address.region} ${BUSINESS.address.postalCode}`]
      .filter(Boolean)
      .join(', ')
  : null;

// Lists the details still missing so they can be surfaced during development.
export const missingBusinessData = () =>
  [
    !BUSINESS.phone && 'phone',
    !BUSINESS.email && 'email',
    !BUSINESS.address && 'address',
    !BUSINESS.openingHours.length && 'openingHours',
    !BUSINESS.socialLinks.length && 'socialLinks',
    !BUSINESS.mapUrl && 'mapUrl',
    !BUSINESS.privacyPolicyUrl && 'privacyPolicyUrl',
    !APPOINTMENT_API_URL && 'VITE_APPOINTMENT_API_URL',
  ].filter(Boolean);
