import { getCurrency } from './request.js';
import clearContainer from './clearContainer.js';
import { getCurrencyChar } from './getCurrency.js';


export const renderCurrenciesTable = (containerEl, currencies, initialCurrency, onClickCallback) => {
  Object.entries(currencies.Valute).forEach((valute) => {

    const currency = document.createElement('div');
    currency.classList.add('elementCurrency');
    currency.textContent = valute[0];

    if (initialCurrency === 'RUB') {
      initialCurrency = 'USD'
    }

    if (valute[0] === initialCurrency) {
      currency.classList.add('activeCurrency');
      onClickCallback(valute[1]);
    }

    currency.addEventListener('click', () => {
      clearContainer(containerEl);
      currency.classList.add('activeCurrency');
      onClickCallback(valute[1])
    })
    containerEl.append(currency);
  });
}


export const getInputsUpdater = (fromInputContainer, fromInput, toInputContainer, toInput) => {
  return (stateFrom, stateTo) => {
    fromInputContainer.textContent = stateFrom.exchangeString;
    toInputContainer.textContent = stateTo.exchangeString;
    fromInput.value = stateFrom.amount;
    toInput.value = stateTo.amount;
  }
}