

const $hours = document.getElementById('hours'),
      $minutes = document.getElementById('minutes'),
      $seconds = document.getElementById('seconds'),
      $btnSettings = document.getElementById('btn-settings');

const hoursAndGrades = {
  12: -90,
  1: -60,
  2: -30,
  3: 0,
  4: 30,
  5: 60,
  6: 90,
  7: 120,
  8: 150,
  9: 180,
  10: 210,
  11: 240,
}

// Functions for the theme

const setThemeColor = (color) =>  {
  localStorage.setItem('theme-color', color);
} 

const getThemeColor = () => {
  return localStorage.getItem('theme-color');
}

const setTheme = (colorSelect) => {
  document.body.className = '';
  document.body.classList.add(`theme-${colorSelect}`);
}


// Functions for the get the date

const getHours = (date) => {
  const hours = date.getHours();
  return hours;
}

const getMinutes = (date) => {
  const minutes = date.getMinutes();
  return minutes;
}

const getSeconds = (date) => {
  const seconds = date.getSeconds();
  return seconds;
}

const convertMilitaryToStandart = (time) => {
  let timeResult = (12 - time) < 0 ? -1 * (12 - time) : 12 * time;
  return timeResult
}


// ANIMATIONS

const animationHours = (hoursStandarts) => {
  $hours.style.transform = `rotate(${hoursAndGrades[hoursStandarts]}deg)`;
}

const animationMinutes = (minutes) => {
  let grades = 0;

  if(minutes <= 15){
    grades = minutes * 6 - 90;
  }  else if(minutes > 15) {
    grades = minutes * 6 - 90; 
  }

  $minutes.style.transform = `rotate(${grades}deg)`;
}

const animationSeconds = (seconds) => {
  let grades = 0;

  if(seconds <= 15){
    grades = seconds * 6 - 90;
  }  else if(seconds > 15) {
    grades = seconds * 6 - 90; 
  }

  $seconds.style.transform = `rotate(${grades}deg)`;
}

const getDate = () =>  {
  const date = new Date();
  let hours = getHours(date);
  let hoursStandarts = hours > 12 ? convertMilitaryToStandart(hours) : hours;
  let minutes = getMinutes(date);
  let seconds = getSeconds(date)

  animationHours(hoursStandarts);
  animationMinutes(minutes);
  animationSeconds(seconds);
}


const renderModalSettings = () => {
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.classList.add('modal-settings');
  modal.innerHTML = `
    <section class="modal-settings__content">
      <h3 class="modal-settings__title">Settigns Clock</h3>
      <form id="settigns-form">
        <p>Choose a color for the clock: </p>
        <div class="modal-settings__colors">
          <label for="color-default" class="modal-settings__color modal-settings__color-default"></label>
          <input type="radio" id="color-default" name="color" value="default" />

          <label for="color-red" class="modal-settings__color modal-settings__color-red"></label>
          <input type="radio" id="color-red" name="color" value="red" />

          <label for="color-green" class="modal-settings__color modal-settings__color-green"></label>
          <input type="radio" id="color-green" name="color" value="green" />
        </div>
      </form>
    </section>
  `;
  document.body.appendChild(modal);

  document.getElementById('settigns-form').addEventListener('change', e => {
    let colorSelect = e.srcElement.value;
    setTheme(colorSelect);
    setThemeColor(colorSelect);
    modal.remove();
  });
}


$btnSettings.addEventListener('click', event => {
  renderModalSettings();
});


// Remove the modal
document.addEventListener('keydown', event => {
  if(event.key === 'Escape') {
    document.getElementById('modal').remove();
  }
});


document.addEventListener('DOMContentLoaded', event => {
  getDate();
  setInterval(() => getDate(), 1000);

  let colorTheme = getThemeColor();
  setTheme(colorTheme);
});


