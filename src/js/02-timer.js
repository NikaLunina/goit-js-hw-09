import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');

const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

// const countDownDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
      countDownDate = selectedDates[0];
    }
  },
};

flatpickr(inputDate, options);

btnStart.disabled = true;

let intervalId = null;

btnStart.addEventListener('click', startTimer);

function countDownTime() {
  const now = Date.now();

  const diff = new Date(inputDate.value) - now;
  const timerDays = convertMs(diff);
  if (diff >= 0) {
    days.textContent = addZero(timerDays.days);
    hours.textContent = addZero(timerDays.hours);
    minutes.textContent = addZero(timerDays.minutes);
    seconds.textContent = addZero(timerDays.seconds);
  }
}

function startTimer() {
  btnStart.disabled = true;
  intervalId = setInterval(countDownTime, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(number) {
  return String(number).padStart(2, 0);
}

