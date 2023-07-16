import { createThumbnails, thumbnails } from './thumbnails.js';
import { openBigPhoto } from './full-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-picture-id]');
    if(!thumbnail) {
      return;
    }
    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.pictureId
    );
    openBigPhoto(picture);
  });
  createThumbnails();

};
renderGallery(thumbnails);
export { renderGallery };
