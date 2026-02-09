// analytics.js
export const pageview = (path) => {
  window.gtag('config', 'G-4FBTH79S88', {
    page_path: path,
  });
};


export const trackEvent = (action, params = {}) => {
  window.gtag('event', action, params);
};