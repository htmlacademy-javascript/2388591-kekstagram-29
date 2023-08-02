import { isEscapeKey } from './util.js';
import { showSuccessMessage, showError } from './message.js';
import { sendData } from './api.js';
import { resetScale } from './scale.js';
import { resetEffect } from './effect.js';

const MAX_TAG_COUNT = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const ErrorText = {
  INVALID_TAG: 'Неправильный Хэштег',
  EXCEEDED_COUNT: `Нельзя указать больше ${MAX_TAG_COUNT} хэштегов.`,
  REPEATED_TAGS: 'Хэштеги не должны повторяться.',
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const imageInput = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const cancelBtn = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const getValidTags = (tagText) =>
  tagText
    .split(' ')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

const hasValidTags = (value) =>
  getValidTags(value).every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));

const hasExceededTagCount = (value) => getValidTags(value).length <= 5;

const hasRepeatedTags = (value) => {
  const lowerCaseTags = getValidTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const openModal = () => {
  imgOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  hashtagField.addEventListener('keydown', handleEscapeKey);
  commentField.addEventListener('keydown', handleEscapeKey);
};

const closeModal = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagField.removeEventListener('keydown', handleEscapeKey);
  commentField.removeEventListener('keydown', handleEscapeKey);

  form.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  imgOverlay.classList.add('hidden');
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
    const isErrorMessageShow = Boolean(document.querySelector('.error'));
    if (isErrorMessageShow) {
      return;
    }
    evt.preventDefault();
    closeModal();
  }
}

async function onFormSubmit(evt) {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуется...';
  const formData = new FormData(form);

  try {
    await sendData(formData);
    closeModal();
    showSuccessMessage();
  } catch (error) {
    showError();
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  }
}

function onCancelBtnClick() {
  closeModal();
}

function onImageInputChange() {
  openModal();
}

function handleEscapeKey(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

const onFileInputChange = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (file && matches) {
    imgPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${imgPreview.src}')`;
    });
  }
  openModal();
};

fileChooser.addEventListener('change', onFileInputChange);
imageInput.addEventListener('change', onImageInputChange);
cancelBtn.addEventListener('click', onCancelBtnClick);
form.addEventListener('submit', onFormSubmit);


