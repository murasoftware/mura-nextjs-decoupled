export const AnalyticsClick = (eventCategory, eventAction) => {
  if (!eventCategory || !eventAction) {
    throw new Error('Missing required field for Google Analytics');
  }
  if (window.ga) {
    window.ga('send', 'event', eventCategory, eventAction);
  }

}