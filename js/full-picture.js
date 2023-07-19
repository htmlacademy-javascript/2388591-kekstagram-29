import { isEscapeKey } from './util.js';

const PER_PAGE_COMMENTS = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');
const shownCommentCount = bigPictureElement.querySelector('.comments-shown');
const socialCommentLoader = bigPictureElement.querySelector('.comments-loader');
const socialComments = bigPictureElement.querySelector('.social__comments');
const socialComment = bigPictureElement.querySelector('.social__comment');
const totalCommentsCount = document.querySelector('.comments-count');
const bodyElement = document.querySelector('body');

let startIndex = 0;
let currentCommentsData = null;

function onBigPhotoEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
}
const renderPicterInfo = ({url, description, likes, comments}) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};
const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  const endIndex = Math.min(startIndex + PER_PAGE_COMMENTS, comments.length);
  for (let i = startIndex; i < endIndex; i++) {
    const { avatar, message, name } = comments[i];
    const commentElement = socialComment.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__text').textContent = message;
    commentElement.querySelector('.social__picture').alt = name;

    commentsFragment.appendChild(commentElement);
  }
  socialComments.appendChild(commentsFragment);
  startIndex += PER_PAGE_COMMENTS;
  shownCommentCount.textContent = endIndex;
  totalCommentsCount.textContent = comments.length;
  if (startIndex >= comments.length) {
    socialCommentLoader.classList.add('hidden');
    startIndex = comments.length;
  } else {
    socialCommentLoader.classList.remove('hidden');
  }
};

const loadMoreComments = () => {
  renderComments(currentCommentsData.comments);
};
function closeBigPhoto() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  currentCommentsData = null;
}
const openBigPhoto = (data) => {
  startIndex = 0;

  socialComments.innerHTML = '';
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  renderPicterInfo(data);
  renderComments(data.comments);
  socialCommentLoader.removeEventListener('click', loadMoreComments);
  currentCommentsData = data;
  socialCommentLoader.addEventListener('click', loadMoreComments);
};
bigPictureCancel.addEventListener('click', () => {
  closeBigPhoto();
});
document.addEventListener('keydown', onBigPhotoEscKeydown);

export { openBigPhoto };
