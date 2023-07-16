import { isEscapeKey } from './util.js';
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');
const socialCommentCount = bigPictureElement.querySelector('.social__comment-count');
const socialCommentLoader = bigPictureElement.querySelector('.comments-loader');
const socialComments = bigPictureElement.querySelector('.social__comments');
const socialComment = bigPictureElement.querySelector('.social__comment');

const bodyElement = document.querySelector('body');
const onBigPhotoEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

const renderPicterInfo = ({url, description, likes, comments}) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};


const renderComments = ({comments}) => {

  const commentsFragment = document.createDocumentFragment();
  comments.forEach(({avatar, message, name}) => {
    const commentElement = socialComment.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__text').textContent = message;
    commentElement.querySelector('.social__picture').alt = name;

    commentsFragment.append(commentElement);

  });
  socialComments.innerHTML = '';
  socialComments.appendChild(commentsFragment);

};


const openBigPhoto = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  socialCommentLoader.classList.add('hidden');
  document.addEventListener('keydown', onBigPhotoEscKeydown);
  renderPicterInfo(data);
  renderComments(data);

};

function closeBigPhoto () {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
}

//Этот код заменила делегированием
// thumbnail.forEach((element) => {
//   element.addEventListener('click', () => {
//     openBigPhoto();
//   });
// });

//Cancel button
bigPictureCancel.addEventListener('click', () => {
  closeBigPhoto();
});

export { openBigPhoto };
