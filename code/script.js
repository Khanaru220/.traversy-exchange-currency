'use strict';

const sourceCurrencyEl = document.querySelector('.source-currency');
const targetCurrencyEl = document.querySelector('.target-currency');

const amountOneEl = document.querySelector('.amount-one');
const amountTwoEl = document.querySelector('.amount-two');
const btnSwapEl = document.querySelector('.swap-btn');
const ratioEl = document.querySelector('.ratio');

// ----------------------------

let ratio = 0;

const swap = function () {
  [sourceCurrencyEl.value, targetCurrencyEl.value] = [
    targetCurrencyEl.value,
    sourceCurrencyEl.value,
  ];
};

const calculate = function () {
  const targetCurrency = targetCurrencyEl.value;
  const sourceCurrency = sourceCurrencyEl.value;
  fetch(
    `https://v6.exchangerate-api.com/v6/77cba8ea0b88d443816a69e1/latest/${sourceCurrency}`
  )
    .then(res => res.json())
    .then(data => {
      // var "ratio" outside, if ratio not change --> not apply biggerRatio()
      if (ratio !== data.conversion_rates[targetCurrency]) {
        ratio = data.conversion_rates[targetCurrency];
        ratioEl.innerText = `1 ${sourceCurrency} = ${ratio} ${targetCurrency}`;
        biggerRatio();
      }

      amountTwoEl.value = (amountOneEl.value * ratio).toFixed(2);
    });
};

const biggerRatio = function () {
  setTimeout(() => ratioEl.classList.add('bigger'));
  setTimeout(() => ratioEl.classList.remove('bigger'), 800);
};

// init
setTimeout(calculate, 10500);

// ADD event listner

for (const el of [sourceCurrencyEl, targetCurrencyEl]) {
  el.addEventListener('change', calculate);
}

for (const el of [amountOneEl, amountTwoEl]) {
  el.addEventListener('input', calculate);
}

btnSwapEl.addEventListener('click', () => {
  swap(), calculate();
});
