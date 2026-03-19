export const trackEvent = (name, payload = {}) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.va === 'function') {
    window.va('event', { name, ...payload });
  }
};
