import { isEscapeKey } from './util.js';

const PER_PAGE_COMMENTS = 5;
let startIndex = 0;
let allComments = [];

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const shownCommentCount = bigPicture.querySelector('.comments-shown');
const socialCommentLoader = bigPicture.querySelector('.comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
}

const renderPicterInfo = ({ url, description, likes, comments }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
};

function renderCommentElement({ avatar, message, name }) {
  const commentElement = socialComment.cloneNode(true);
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__text').textContent = message;
  commentElement.querySelector('.social__picture').alt = name;
  return commentElement;
}

function createComments() {
  const endIndex = Math.min(startIndex + PER_PAGE_COMMENTS, allComments.length);
  const commentsFragment = document.createDocumentFragment();

  for (let i = startIndex; i < endIndex; i++) {
    const commentData = allComments[i];
    const commentElement = renderCommentElement(commentData);
    commentsFragment.appendChild(commentElement);
  }

  socialComments.appendChild(commentsFragment);
  startIndex = endIndex;
  shownCommentCount.textContent = endIndex;
  if (startIndex >= allComments.length) {
    socialCommentLoader.classList.add('hidden');
    startIndex = allComments.length;
  } else {
    socialCommentLoader.classList.remove('hidden');
  }
}

const onCancelBtnClick = () => {
  closeBigPhoto();
};

const onMoreCommentsClick = () => {
  createComments();
};

function closeBigPhoto() {
  document.removeEventListener('keydown', onEscKeydown);
  showBigPicture(false);
  body.classList.remove('modal-open');
}

function openBigPhoto(data) {
  startIndex = 0;
  allComments = data.comments;
  socialComments.innerHTML = '';
  showBigPicture(true);
  body.classList.add('modal-open');

  renderPicterInfo(data);
  createComments();

  document.addEventListener('keydown', onEscKeydown);
  socialCommentLoader.addEventListener('click', onMoreCommentsClick);
}

function showBigPicture(visible) {
  if (visible) {
    bigPicture.classList.remove('hidden');
  } else {
    bigPicture.classList.add('hidden');
  }
}

bigPictureCancel.addEventListener('click', onCancelBtnClick);


export { openBigPhoto };
