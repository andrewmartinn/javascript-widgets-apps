window.addEventListener('DOMContentLoaded', () => {
  let counter = 0;
  let timeInterval = null;
  const time = document.querySelector('.time');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const resetBtn = document.getElementById('resetBtn');

  const startTimer = () => {
    // check for running time interval
    if (timeInterval) {
      return;
    }

    // call updateTimer to count time every 1 second
    timeInterval = setInterval(updateTimer, 1000);
  }

  // clear exisiting time interval and reset interval
  const stopTimer = () => {
    clearInterval(timeInterval);
    timeInterval = null;
  }

  // reset global variables and clear time intervals
  const resetTimer = () => {
    stopTimer();
    counter = 0;
    time.textContent = `00:00:00`;
  }

  // update counter and construct time string
  const updateTimer = () => {
    counter++;

    // construct time string format
    let hours = Math.floor(counter / 3600);
    let minutes = Math.floor((counter - (hours * 3600)) / 60);
    let seconds = counter % 60;

    // prefix time with 0 if less than 10
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    time.textContent = `${hours}:${minutes}:${seconds}`;
  }

  // event listeners
  startBtn.addEventListener('click', startTimer);
  stopBtn.addEventListener('click', stopTimer);
  resetBtn.addEventListener('click', resetTimer);
});
