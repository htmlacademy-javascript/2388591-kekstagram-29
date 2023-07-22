import { isEscapeKey } from './util.js';

const PER_PAGE_COMMENTS = 5;

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');
const shownCommentCount = bigPictureElement.querySelector('.comments-shown');
const socialCommentLoader = bigPictureElement.querySelector('.comments-loader');
const socialComments = bigPictureElement.querySelector('.social__comments');
const socialComment = bigPictureElement.querySelector('.social__comment');


let startIndex = 0;
let allComments = [];

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
}

const renderPicterInfo = ({ url, description, likes, comments }) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
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
  showBigPicture(false);
  bodyElement.classList.remove('modal-open');

}

function openBigPhoto(data) {
  startIndex = 0;
  allComments = data.comments;
  socialComments.innerHTML = '';
  showBigPicture(true);
  bodyElement.classList.add('modal-open');

  renderPicterInfo(data);
  createComments();

  socialCommentLoader.addEventListener('click', onMoreCommentsClick);
}

function showBigPicture(visible) {
  if (visible) {
    bigPictureElement.classList.remove('hidden');
  } else {
    bigPictureElement.classList.add('hidden');
  }
}

bigPictureCancel.addEventListener('click', onCancelBtnClick);
document.addEventListener('keydown', onEscKeydown);

export { openBigPhoto };
