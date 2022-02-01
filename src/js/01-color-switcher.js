const startBtnEL = document.querySelector('button[data-start]');
const stopBtnEL = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

startBtnEL.addEventListener('click', colorSwitcher);
stopBtnEL.addEventListener('click', colorSwitcherOf);

function colorSwitcher(e) {
  startBtnEL.setAttribute('disabled', 'true');
  stopBtnEL.removeAttribute('disabled');
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function colorSwitcherOf(e) {
  stopBtnEL.setAttribute('disabled', 'true');
  startBtnEL.removeAttribute('disabled');
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
