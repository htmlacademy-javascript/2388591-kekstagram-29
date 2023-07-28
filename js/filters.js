import { createThumbnails } from './thumbnails.js';
import { showAlert } from './util.js';

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const sortRandomly = (array) => array.sort(() => Math.random() - 0.5);

const applyFilter = async (filter, photos) => {
  try {
    let filteredPhotos = [...photos];
    if (filter === FilterType.RANDOM) {
      filteredPhotos = sortRandomly(filteredPhotos).slice(0, 10);
    } else if (filter === FilterType.DISCUSSED) {
      filteredPhotos.sort(sortByComments);
    }
    createThumbnails(filteredPhotos);
  } catch (error) {
    showAlert(error.message);
  }
};

export { applyFilter, FilterType };


