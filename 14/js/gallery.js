import {showAlert} from './util.js';
import { getData } from './api.js';
import { openBigPhoto } from './full-picture.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnails = function (photos) {
  const pictureFragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments, id }) => {
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

const renderGallery = async () => {
  try {
    const photos = await getData();
    createThumbnails(photos);

    pictures.addEventListener('click', (evt) => {
      const thumbnail = evt.target.closest('[data-picture-id]');
      if (!thumbnail) {
        return;
      }
      evt.preventDefault();
      const picture = photos.find((item) => item.id === +thumbnail.dataset.pictureId);
      openBigPhoto(picture);
    });
  } catch (error) {
    showAlert(error);
  }
};

renderGallery();

export { renderGallery };
