const body = document.querySelector('body');

let successSection = null;
let errorSection = null;

const closeSuccessMessage = () => {
  successSection.remove();
};

const onEscKeydownSuccess = (e) => {
  if (e.key === 'Escape') {
    e.stopImmediatePropagation();
    document.removeEventListener('keydown', onEscKeydownSuccess);
    closeSuccessMessage();
  }
};
const closeError = () => {
  errorSection.remove();
};

const onEscKeydownError = (e) => {
  e.stopImmediatePropagation();
  if (e.key === 'Escape') {
    document.removeEventListener('keydown', onEscKeydownError);
    closeError();
  }

};

const closeSectionOnBodyClick = (section, onBodyClickHandler) => (evt) => {
  if (evt.target.closest(`.${section.className}__inner`)) {
    return;
  }
  onBodyClickHandler();
};

const createAndShowSection = (templateId, sectionClassName, onBodyClickHandler, onEscKeydownHandler) => {
  const template = document.querySelector(templateId);
  const element = template.content.cloneNode(true);
  const section = element.querySelector(`.${sectionClassName}`);
  body.appendChild(element);

  const button = section.querySelector(`.${sectionClassName}__button`);
  button.addEventListener('click', () => section.remove());
  body.addEventListener('click', closeSectionOnBodyClick(section, onBodyClickHandler));
  document.addEventListener('keydown', onEscKeydownHandler);

  return section;
};

const showSuccessMessage = () => {
  successSection = createAndShowSection('#success', 'success', closeSuccessMessage, onEscKeydownSuccess);
};

const showError = () => {
  errorSection = createAndShowSection('#error', 'error', closeError, onEscKeydownError);
};

export { showSuccessMessage, showError };

