import { useEffect, useRef, useState } from 'react';
import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react';
import { SectionHeading } from './ui';
import { SERVICE_OPTIONS } from '../data/content';
import { BUSINESS, SALON_TIME_ZONE, telHref } from '../config/business';
import { isAppointmentApiConfigured, submitAppointmentRequest } from '../lib/appointmentApi';
import { onServiceSelected } from '../lib/serviceSelection';
import { EVENTS, track } from '../lib/analytics';

const EMPTY = {
  fullName: '',
  phone: '',
  email: '',
  service: '',
  preferredDate: '',
  preferredTime: '',
  contactPreference: 'Phone Call',
  notes: '',
  consent: false,
  website: '', // honeypot
};

const CONTACT_PREFERENCES = ['Phone Call', 'Text Message', 'Email'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Today's date in the salon's time zone (YYYY-MM-DD), so "past date" checks match Ventura.
const salonToday = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: SALON_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

function validate(v) {
  const errors = {};
  if (v.fullName.trim().length < 2) errors.fullName = 'Please enter your full name.';

  const digits = v.phone.replace(/\D/g, '');
  if (!v.phone.trim()) errors.phone = 'Please enter a phone number so we can reach you.';
  else if (digits.length < 10 || digits.length > 15 || /[a-z]/i.test(v.phone))
    errors.phone = 'Please enter a valid phone number, e.g. (805) 555-0123.';

  if (v.contactPreference === 'Email' && !v.email.trim())
    errors.email = 'Please add your email, since you prefer to be contacted by email.';
  else if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) errors.email = 'Please enter a valid email address.';

  if (!v.service) errors.service = 'Please choose a service.';
  if (v.preferredDate && v.preferredDate < salonToday()) errors.preferredDate = 'Please choose today or a future date.';
  if (v.notes.length > 500) errors.notes = 'Please keep your notes under 500 characters.';
  if (!v.consent) errors.consent = 'Please confirm we may contact you about this request.';
  return errors;
}

function Field({ name, label, optional, error, children, full = true }) {
  return (
    <div className={`field${full ? ' field--full' : ''}`}>
      <label htmlFor={`f-${name}`}>
        {label} {optional && <span>(optional)</span>}
      </label>
      {children}
      {error && (
        <span className="field__error" id={`e-${name}`}>
          <CircleAlert size={14} aria-hidden="true" /> {error}
        </span>
      )}
    </div>
  );
}

export default function BookingSection() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const started = useRef(false);
  const formRef = useRef(null);

  useEffect(
    () =>
      onServiceSelected((service) => {
        setValues((v) => ({ ...v, service }));
        setErrors((e) => ({ ...e, service: undefined }));
      }),
    []
  );

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const onFocus = () => {
    if (started.current) return;
    started.current = true;
    track(EVENTS.formStart);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting' || !isAppointmentApiConfigured) return;

    const found = validate(values);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      formRef.current.querySelector(`[name="${firstError}"]`)?.focus();
      return;
    }

    track(EVENTS.formSubmit, { service: values.service });
    setStatus('submitting');
    try {
      await submitAppointmentRequest(values);
      track(EVENTS.requestSuccess, { service: values.service });
      setStatus('success');
      setValues(EMPTY);
    } catch {
      setStatus('error'); // keep everything the guest typed
    }
  };

  const bind = (name) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange: update,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `e-${name}` : undefined,
  });

  const disabled = !isAppointmentApiConfigured;

  return (
    <section className="section booking" id="booking" aria-labelledby="booking-title">
      <div className="container">
        <div className="booking__intro reveal">
          <SectionHeading
            id="booking-title"
            title={['Let’s plan your', 'next beauty visit']}
            description="Tell us a little about the services you are interested in, and our team can follow up with you."
            align="center"
          />
          {telHref && (
            <p className="booking__call">
              Prefer to talk? <a href={telHref} onClick={() => track(EVENTS.call, { location: 'booking' })}>Call {BUSINESS.phone}</a>
            </p>
          )}
        </div>

        <div className="booking__card reveal reveal--zoom">
          <figure className="booking__photo">
            <img src="/form.jpg" alt="Guest relaxing in a towel wrap surrounded by candles, orchids, nail polish and beauty tools" width="900" height="1546" loading="lazy" decoding="async" />
          </figure>

        <form ref={formRef} className="booking__form" onSubmit={onSubmit} onFocus={onFocus} noValidate>

          {status === 'success' ? (
            <div className="booking__success field--full" role="status">
              <CircleCheck size={28} strokeWidth={1.4} aria-hidden="true" />
              <h3>Thank you — your request has been received.</h3>
              <p>
                Your appointment is not confirmed yet. Our team will contact you to confirm availability.
              </p>
              <button type="button" className="btn btn--secondary" onClick={() => setStatus('idle')}>
                Send another request
              </button>
            </div>
          ) : (
            <>
              <Field name="fullName" label="Full Name" error={errors.fullName}>
                <input type="text" autoComplete="name" required {...bind('fullName')} />
              </Field>

              <Field name="phone" label="Phone Number" error={errors.phone} full={false}>
                <input type="tel" autoComplete="tel" inputMode="tel" required {...bind('phone')} />
              </Field>

              <Field name="email" label="Email Address" optional={values.contactPreference !== 'Email'} error={errors.email} full={false}>
                <input type="email" autoComplete="email" {...bind('email')} />
              </Field>

              <Field name="service" label="Preferred Service" error={errors.service}>
                <select required {...bind('service')}>
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>

              <Field name="preferredDate" label="Preferred Date" optional error={errors.preferredDate} full={false}>
                <input type="date" min={salonToday()} {...bind('preferredDate')} />
              </Field>

              <Field name="preferredTime" label="Preferred Time" optional full={false}>
                <input type="time" step="900" {...bind('preferredTime')} />
              </Field>

              <fieldset className="field field--full choice">
                <legend>Contact Preference</legend>
                <div className="choice__options">
                  {CONTACT_PREFERENCES.map((p) => (
                    <label key={p} className="choice__option">
                      <input type="radio" name="contactPreference" value={p} checked={values.contactPreference === p} onChange={update} />
                      <span>{p}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <Field name="notes" label="Additional Notes" optional error={errors.notes}>
                <textarea rows={3} maxLength={500} {...bind('notes')} />
              </Field>

              {/* Honeypot for bots — hidden from people and assistive tech */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="f-website">Website</label>
                <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
              </div>

              <div className="field field--full">
                <label className="consent">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={values.consent}
                    onChange={update}
                    aria-invalid={errors.consent ? true : undefined}
                    aria-describedby={errors.consent ? 'e-consent' : undefined}
                  />
                  <span>
                    I agree that Royal Nail Store may contact me about this appointment request using the
                    contact details and preference I provided.
                  </span>
                </label>
                {errors.consent && (
                  <span className="field__error" id="e-consent">
                    <CircleAlert size={14} aria-hidden="true" /> {errors.consent}
                  </span>
                )}
              </div>

              {status === 'error' && (
                <p className="notice notice--error field--full" role="alert">
                  <CircleAlert size={18} aria-hidden="true" />
                  We couldn’t send your request. Your details are still here — please try again in a moment
                  {telHref ? ' or call the salon.' : '.'}
                </p>
              )}

              <div className="field--full booking__submit">
                <button type="submit" className="btn btn--primary" disabled={disabled || status === 'submitting'} aria-busy={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <>
                      <LoaderCircle size={17} className="spin" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    'Request an Appointment'
                  )}
                </button>
              </div>
            </>
          )}
        </form>
        </div>
      </div>
    </section>
  );
}
