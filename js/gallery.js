import { createThumbnails } from './thumbnails.js';
import { showAlert, debounce } from './util.js';
import { getData } from './api.js';
import { openBigPhoto } from './full-picture.js';
import { applyFilter, FilterType } from './filters.js';

const pictures = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

let currentFilter = FilterType.DEFAULT;
let photos = [];

imgFilters.classList.remove('img-filters--inactive');

const applyFilterWithDebounce = debounce(applyFilter);

const handleFilterClick = (evt) => {
  const filterId = evt.target.id;

  if (currentFilter === filterId) {
    return;
  }

  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');

  evt.target.classList.add('img-filters__button--active');

  currentFilter = filterId;

  applyFilterWithDebounce(currentFilter, photos);
};

filterButtons.forEach((button) => {
  button.addEventListener('click', handleFilterClick);
});

const renderGallery = async () => {
  try {
    photos = await getData();
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
    showAlert(error.message);
  }
};

renderGallery();


