import { trackEvent } from '../analytics/trackEvent';

const TrackedExternalLink = ({ eventName, eventPayload, onClick, ...props }) => {
  const handleClick = (event) => {
    trackEvent(eventName, eventPayload);
    onClick?.(event);
  };

  return <a {...props} onClick={handleClick} />;
};

export default TrackedExternalLink;
