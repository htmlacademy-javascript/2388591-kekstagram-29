import { createPhotoArray } from './data.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbnails = createPhotoArray();

const createThumbnails = function () {
  const pictureFragment = document.createDocumentFragment();

  thumbnails.forEach(({url, description, likes, comments, id}) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments ').textContent = comments.length;
    pictureElement.dataset.pictureId = id;
    pictureFragment.append(pictureElement);
  });
  pictures.appendChild(pictureFragment);
};

export { createThumbnails, thumbnails };
