const btnMinus = document.querySelector('[data-action="minus"]');
const btnPlus = document.querySelector('[data-action="plus"]');
const counter = document.querySelector('[data-counter]');

btnMinus.addEventListener('click', () => {
  if (parseInt(counter.innerText) > 1) {
    counter.innerText = --counter.innerText;
  }
});

btnPlus.addEventListener('click', () => {
  counter.innerText = ++counter.innerText;
});
