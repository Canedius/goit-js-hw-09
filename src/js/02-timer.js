import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const myInput = document.querySelector('#datetime-picker');
const buttonEL = document.querySelector('button[data-start]');
const dayslabelEL = document.querySelector('span[data-days]');
const hourlabelEL = document.querySelector('span[data-hours]');
const minlabelEL = document.querySelector('span[data-minutes]');
const secondlabelEL = document.querySelector('span[data-seconds]');

buttonEL.setAttribute('disabled', 'true');
let timer = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {},
};

const fp = flatpickr(myInput, options); // flatpickr

fp.config.onChange.push(function (selectedDates) {
  const data = selectedDates[0].getTime();
  if (data <= Date.now()) {
    buttonEL.setAttribute('disabled', 'true');
    return Notiflix.Notify.failure('Please choose a date in the future');
  }

  buttonEL.removeAttribute('disabled');
  buttonEL.addEventListener('click', () => {
    if (timer) {
      return;
    }
    timer = true;
    const timerId = setInterval(() => {
      const ms = data - Date.now();
      console.log(ms);
      addLeadingZero(convertMs(ms));
      if (ms < 1000) {
        clearInterval(timerId);
      }
    }, 1000);
  });
});

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

function addLeadingZero({ days, hours, minutes, seconds }) {
  dayslabelEL.textContent = String(days).padStart(3, '0');
  hourlabelEL.textContent = String(hours).padStart(2, '0');
  minlabelEL.textContent = String(minutes).padStart(2, '0');
  secondlabelEL.textContent = String(seconds).padStart(2, '0');
}
