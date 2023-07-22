import { isEscapeKey } from './util.js';

const VALID_TAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_TAG_COUNT = 5;

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const imageInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const cancelBtn = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const ErrorText = {
  INVALID_TAG: 'Неправильный Хэштег',
  EXCEEDED_COUNT: `Нельзя указать больше ${MAX_TAG_COUNT} хэштегов.`,
  REPEATED_TAGS: 'Хэштеги не должны повторяться.',
};

const getValidTags = (tagText) => tagText.split(' ').map((tag) => tag.trim()).filter((tag) => tag.length > 0);

const hasValidTags = (value) => getValidTags(value).every((tag) => VALID_TAG_PATTERN .test(tag));

const hasExceededTagCount = (value) => getValidTags(value).length <= MAX_TAG_COUNT;

const hasRepeatedTags = (value) => {
  const lowerCaseTags = getValidTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const openModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
};
pristine.addValidator(
  hashtagField,
  hasExceededTagCount,
  ErrorText.EXCEEDED_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasRepeatedTags,
  ErrorText.REPEATED_TAGS,
  1,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  ErrorText.INVALID_TAG,
  2,
  true
);

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

function onFormSubmit (evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}
function onCancelBtnClick () {
  closeModal();
}

function onImageInputChange () {
  openModal();
}
function handleEscapeKey(evt) {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
}

hashtagField.addEventListener('keydown', handleEscapeKey);
commentField.addEventListener('keydown', handleEscapeKey);

imageInput.addEventListener('change', onImageInputChange);
cancelBtn.addEventListener('click', onCancelBtnClick);
form.addEventListener('submit', onFormSubmit);


