import { TRACKING_ENABLED } from '../config/business';

// Thin wrapper around the Google tag / GTM dataLayer. It does nothing until
// tracking is explicitly enabled (VITE_ENABLE_TRACKING=true) and a tag is installed.
// Never pass personal data (names, phone numbers, emails, notes) as params.
export function track(event, params = {}) {
  if (!TRACKING_ENABLED || typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export const EVENTS = {
  call: 'click_call',
  book: 'click_book_appointment',
  formStart: 'appointment_form_start',
  formSubmit: 'appointment_form_submit',
  requestSuccess: 'appointment_request_success',
  directions: 'click_directions',
  social: 'click_social_link',
};
