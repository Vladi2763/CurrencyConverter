import { getCurrency } from './request.js';
import { renderCurrenciesTable, getInputsUpdater } from './createStructure.js';
import { getCurrencyChar } from './getCurrency.js';


export class AppState {
  _currentRate = '';
  _wantToBuyRate = '';
  _ratio = '';
  _currentAmount='';
  _wantToBuyAmount='';

  get currentRate() {
    return this._currentRate;
  }

  set currentRate(value) {
    this._currentRate = value;
    this.ratio = (this.currentRate.Value / this.wantToBuyRate.Value).toFixed(3);
    this._wantToBuyAmount = this.currentAmount * this.ratio;
    this.updateInputs();
  }

  get wantToBuyRate() {
    return this._wantToBuyRate;
  }

  set wantToBuyRate(value) {
    this._wantToBuyRate = value;
    this.ratio = (this.currentRate.Value / this.wantToBuyRate.Value).toFixed(3);
    this._wantToBuyAmount = this.currentAmount * (1 / this.ratio);
    this.updateInputs();
  }

  get ratio() {
    return this._ratio;
  }

  set ratio(value) {
    this._ratio = value;
  }

  get currentAmount() {
    return this._currentAmount;
  }

  set currentAmount(value) {
    this._currentAmount = value;
    this._wantToBuyAmount = value * this.ratio;
    this.updateInputs();
  }

  get wantToBuyAmount() {
    return this._wantToBuyAmount;
  }

  set wantToBuyAmount(value) {
    this._wantToBuyAmount = value;
    this._currentAmount = value * this.ratio;
    this.updateInputs();
  }

  constructor() {

    const tableConvertFrom = document.querySelector('.convertFrom .currencies');

    const tableConvertTo = document.querySelector('.convertTo .currencies');

    const inputFrom = document.querySelector('.convertFrom .input');

    const inputTo = document.querySelector('.convertTo .input');

    const convertFromCurrencyContainer = document.querySelector('.convertFrom .currencyContainer');

    const convertToCurrencyContainer = document.querySelector('.convertTo .currencyContainer');


    const locale = new Intl.NumberFormat().resolvedOptions().locale;

    let initialCurrency = getCurrencyChar(locale);

    inputFrom.addEventListener('input', (event) => {
      this.currentAmount = inputFrom.value;
    })

    inputTo.addEventListener('input', (event) => {
      this.wantToBuyAmount = inputTo.value;
    })

    this.inputsUpdateHandler = getInputsUpdater(convertFromCurrencyContainer, inputFrom, convertToCurrencyContainer, inputTo);

    getCurrency().then(currencies => {
      renderCurrenciesTable(tableConvertFrom, currencies, initialCurrency, (currentRate) => {
        this.currentRate = currentRate;
        if (!this.wantToBuyRate) {
          this.wantToBuyRate = currentRate;
        }
        this.ratio = (this.currentRate.Value / this.wantToBuyRate.Value).toFixed(3);

      });
      renderCurrenciesTable(tableConvertTo, currencies, initialCurrency, (wantToBuyRate) => {
        this.wantToBuyRate = wantToBuyRate;

        this.ratio = (this.currentRate.Value / this.wantToBuyRate.Value).toFixed(3);
      });
    
      this.currentAmount = 1;
    });
  }

  updateInputs() { 
    this.inputsUpdateHandler({
      amount: this.currentAmount,
      exchangeString: `1 ${this.currentRate.CharCode} = ${this.ratio} ${this.wantToBuyRate.CharCode}`
    }, {
      amount: this.wantToBuyAmount,
      exchangeString: `1 ${this.wantToBuyRate.CharCode} = ${(1 / this.ratio).toFixed(3)} ${this.currentRate.CharCode}`
    });
  }
}

