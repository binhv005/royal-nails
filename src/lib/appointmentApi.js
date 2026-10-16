import { APPOINTMENT_API_URL, SALON_TIME_ZONE } from '../config/business';

export const isAppointmentApiConfigured = Boolean(APPOINTMENT_API_URL);

// Sends an appointment request. Resolves only when the server confirms it saved
// the request (2xx); anything else throws so the UI never fakes a success.
export async function submitAppointmentRequest(values) {
  if (!APPOINTMENT_API_URL) throw new Error('Appointment API is not configured');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(APPOINTMENT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        fullName: values.fullName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim() || null,
        service: values.service,
        preferredDate: values.preferredDate || null,
        preferredTime: values.preferredTime || null,
        timeZone: SALON_TIME_ZONE,
        contactPreference: values.contactPreference,
        notes: values.notes.trim() || null,
        consent: values.consent,
        website: values.website, // honeypot — must stay empty
      }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    return true;
  } finally {
    clearTimeout(timeout);
  }
}
