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

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function generateRandomAvatar () {
  const avatarNumber = getRandomInteger(1, 6);
  return `img/avatar-${avatarNumber}.svg`;
}
function getRandomArrayElement (elements){
  return elements[getRandomInteger(0, elements.length - 1)];
}
function createPhotoArray () {
  const photoArray = [];

  function geneateComments () {
    return {
      commentId: getRandomInteger(1, 1000),
      avatar: generateRandomAvatar(),
      message: getRandomArrayElement(MESSAGE),
      name: getRandomArrayElement(NAME)
    };
  }

  for (let i = 1; i <= 25; i++) {
    const photoId = i;
    const url = `photos/${i}.jpg`;
    const description = getRandomArrayElement(DESCRIPTION);
    const likes = getRandomInteger(15, 200);
    const commetCount = getRandomInteger (0, 30);
    const comments = [];
    for (let j = 0; j < commetCount; j++){
      comments.push(geneateComments());
    }
    photoArray.push({id: photoId, url, description, likes, comments});
  }
  return photoArray;

}

createPhotoArray();

