const ALERT_DURATION = 20000;
const showAlert = (message) => {
  const alert = document.createElement('div');
  const style = alert.style;
  style.position = 'absolute';
  style.zIndex = '100';
  style.left = '0';
  style.right = '0';
  style.top = '0';
  style.padding = '10px 3px';
  style.fontSize = '15px';
  style.textAlign = 'center';
  style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_DURATION);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export { isEscapeKey, showAlert, debounce };


