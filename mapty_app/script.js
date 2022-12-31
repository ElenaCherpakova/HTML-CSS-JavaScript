'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      // const { longitude } = position.coords;
      console.log(`https://www.google.ca/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];
      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        minZoom: 5,
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(map);

      // Handling clicks on map

      map.on('click', mapE => {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    () => {
      alert('Could not get your position');
    }
  );

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});
