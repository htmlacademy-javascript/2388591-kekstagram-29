const body = document.querySelector('body');

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success');
  const successElement = successTemplate.content.cloneNode(true);
  const successSection = successElement.querySelector('.success');

  body.appendChild(successElement);

  const closeSuccessMessage = () => {
    successSection.remove();
  };

  const successButton = successSection.querySelector('.success__button');
  successSection.addEventListener('click', closeSuccessMessage);
  successButton.addEventListener('click', closeSuccessMessage);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeSuccessMessage();
    }
  });
};

const showError = () => {
  const errorTemplate = document.querySelector('#error');
  const errorElement = errorTemplate.content.cloneNode(true);
  const errorSection = errorElement.querySelector('.error');

  body.appendChild(errorElement);

  const closeError = () => {
    errorSection.remove();
  };

  const errorButton = errorSection.querySelector('.error__button');
  errorSection.addEventListener('click', closeError);
  errorButton.addEventListener('click', closeError);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeError();
    }
  });
};

export { showSuccessMessage, showError };

