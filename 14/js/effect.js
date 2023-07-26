const effectRadios = document.querySelectorAll('.effects__radio');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const previewImage = document.querySelector('.img-upload__preview img');

const applyEffect = (effect, intensity) => {
  switch (effect) {
    case 'none':
      previewImage.style.filter = 'none';
      break;
    case 'chrome':
      previewImage.style.filter = `grayscale(${intensity})`;
      break;
    case 'sepia':
      previewImage.style.filter = `sepia(${intensity})`;
      break;
    case 'marvin':
      previewImage.style.filter = `invert(${intensity * 100}%)`;
      break;
    case 'phobos':
      previewImage.style.filter = `blur(${intensity * 3}px)`;
      break;
    case 'heat':
      previewImage.style.filter = `brightness(${1 + intensity * 2})`;
      break;
    default:
      previewImage.style.filter = 'none';
      break;
  }
};


function resetEffect() {
  effectLevelContainer.style.display = 'none';
  previewImage.style.filter = 'none';
  effectLevelValue.value = '100%';
  slider.noUiSlider.set(100);
}

const onEffectChange = () => {
  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  const effectLevel = selectedEffect === 'none' ? 0 : 1;
  effectLevelContainer.style.display = selectedEffect === 'none' ? 'none' : 'block';
  slider.noUiSlider.set(effectLevel);
  effectLevelValue.value = effectLevel;
  applyEffect(selectedEffect, effectLevel);
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const onSliderUpdate = (values, handle) =>{
  effectLevelValue.value = values[handle];
  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  applyEffect(selectedEffect, values[handle]);
};
slider.noUiSlider.on('update', onSliderUpdate);

effectRadios.forEach((radio) => {
  radio.addEventListener('change', onEffectChange);
});

onEffectChange();

export { resetEffect };
