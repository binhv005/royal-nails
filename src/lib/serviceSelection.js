// Lets service links pre-select a service in the booking form.
const EVENT = 'royal:select-service';

export const selectService = (service) =>
  window.dispatchEvent(new CustomEvent(EVENT, { detail: service }));

export const onServiceSelected = (handler) => {
  const listener = (e) => handler(e.detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
};
