function calCartPriceAndDelivery() {
  const cartItems = document.querySelectorAll('.cart-item');
  const totalPriceEl = document.querySelector('.total-price');
  const deliveryCost = document.querySelector('.delivery-cost');
  const cartDelivery = document.querySelector('[data-cart-delivery]');

  let totalPrice = 0;

  cartItems.forEach((item) => {
    const amountEl = item.querySelector('[data-counter]').innerText;
    const priceEl = item
      .querySelector('.price__currency')
      .innerText.split('$')[1];
    const currentPrice = parseInt(amountEl) * parseFloat(priceEl);
    totalPrice += currentPrice;
  });

  totalPriceEl.innerText = totalPrice.toFixed(2);

  if (totalPrice > 0) {
    cartDelivery.classList.remove('none');
  } else {
    cartDelivery.classList.add('none');
  }
  if (totalPrice >= 20) {
    deliveryCost.classList.add('free');
    deliveryCost.innerText = 'Free';
  } else {
    deliveryCost.classList.remove('free');
    deliveryCost.innerText = '$5.99';
  }
}
