import {getRandomArrayElement} from './util.js';
import {getRandomInteger} from './util.js';
const NAME = [
  'Артём',
  'Мария',
  'Иван',
  'Елена',
  'Александр',
  'Анна',
  'Дмитрий',
  'София',
  'Максим',
  'Алиса'
];

const DESCRIPTION = [
  'Прекрасный закат на пляже',
  'Люксовый автомобиль с открытыми дверьми, демонстрирующий роскошь и стиль..',
  'Улыбающийся маленький мальчик на качелях.',
  'Макро-снимок капли росы.',
  'Счастливые друзья на пикнике.',
  'Мощная волна в океане.',
  'Огни ночного города в реке.',
  'Зимний лес с покрытыми снегом деревьями.',
  'Поле подсолнухов.',
  'Туманный пейзаж с горами.',
  'Пушистый котенок с клубком ниток.'
];
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const generateRandomAvatar = function () {
  const avatarNumber = getRandomInteger(1, 6);
  return `img/avatar-${avatarNumber}.svg`;
};


const generateComment = function () {
  return {
    commentId: getRandomInteger(1, 1000),
    avatar: generateRandomAvatar(),
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAME)
  };
};
const createComments = function () {
  const comments = [];
  const commentCount = getRandomInteger(0, 30);
  for (let j = 0; j < commentCount; j++) {
    comments.push(generateComment());
  }
  return comments;
};
const createPhotoArray = function () {
  const photoArray = [];
  for (let i = 1; i <= 25; i++) {
    const photoId = i;
    const url = `photos/${i}.jpg`;
    const description = getRandomArrayElement(DESCRIPTION);
    const likes = getRandomInteger(15, 200);
    const comments = createComments();

    photoArray.push({ id: photoId, url, description, likes, comments });
  }

  return photoArray;

};

export {createPhotoArray};

