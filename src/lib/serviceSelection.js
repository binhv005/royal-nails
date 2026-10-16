// Lets service links pre-select a service in the booking form. The choice is remembered,
// because the booking form lives on another page that mounts after the click.
const EVENT = 'royal:select-service';
let pending = null;

export const selectService = (service) => {
  pending = service;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: service }));
};

export const onServiceSelected = (handler) => {
  if (pending) {
    handler(pending);
    pending = null;
  }
  const listener = (e) => {
    pending = null;
    handler(e.detail);
  };
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
};
