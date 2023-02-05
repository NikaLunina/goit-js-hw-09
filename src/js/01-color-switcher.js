function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

const body = document.querySelector('body');

let intervalId = null;
const interval = 1000;
btnStop.disabled = true;

btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  btnStop.disabled = false;
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, interval);
});

btnStop.addEventListener('click', () => {
  clearInterval(intervalId);
  btnStop.disabled = true;
  btnStart.disabled = false;
});
