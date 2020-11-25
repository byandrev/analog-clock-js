

const $hours = document.getElementById('hours'),
      $minutes = document.getElementById('minutes'),
      $seconds = document.getElementById('seconds');

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
  return 12 - time;
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


document.addEventListener('DOMContentLoaded', event => {
  getDate();
  setInterval(() => getDate(), 1000);
});


