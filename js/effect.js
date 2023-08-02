const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};
const effectToFilter = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};
const effectToSliderOptions = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};
const effectsFieldset = document.querySelector('.img-upload__effects');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const previewImage = document.querySelector('.img-upload__preview img');

let chosenEffect = Effect.DEFAULT;

const setImageStyle = () => {
  if (chosenEffect === Effect.DEFAULT) {
    previewImage.style.filter = 'none';
    return;
  }

  const { value } = effectLevelValue;
  const { style, unit } = effectToFilter[chosenEffect];
  previewImage.style.filter = `${style}(${value}${unit})`;
};

const onSliderUpdate = () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(effectLevelSlider, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
  });
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
};

const showSlider = () => {
  effectLevelContainer.classList.remove('hidden');
};

const hideSlider = () => {
  effectLevelContainer.classList.add('hidden');
};

const destroySlider = () => {
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }

  setImageStyle();
};
const setSlider = () => {
  destroySlider();
  if (chosenEffect !== Effect.DEFAULT) {
    createSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  } else {
    hideSlider();
  }
};
const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
};
const resetEffect = () => {
  setEffect(Effect.DEFAULT);
};

const onEffectChange = () => {
  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  setEffect(selectedEffect);
};
const initEffects = () => {
  setSlider();
  effectsFieldset.addEventListener('change', onEffectChange);
};
initEffects();

export { resetEffect };
