const STEP = 25;

const scaleValueControl = document.querySelector('.scale__control--value');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const previewImage = document.querySelector('.img-upload__preview img');

function updateValue(newValue) {
  scaleValueControl.value = `${newValue}%`;
  const scaleValue = newValue / 100;
  previewImage.style.transform = `scale(${scaleValue})`;
}

function changeValue(increase) {
  let currentValue = parseInt(scaleValueControl.value, 10);
  currentValue += increase ? STEP : -STEP;
  if (currentValue >= 25 && currentValue <= 100) {
    updateValue(currentValue);
  }
}

smallerButton.addEventListener('click', () => {
  changeValue(false);
});

biggerButton.addEventListener('click', () => {
  changeValue(true);
});

function resetScale() {
  updateValue(100);
}

export { resetScale };
