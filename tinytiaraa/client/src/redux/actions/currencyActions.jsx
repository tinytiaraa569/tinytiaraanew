export const CHANGE_CURRENCY = "CHANGE_CURRENCY";
export const UPDATE_CONVERSION_RATES = "UPDATE_CONVERSION_RATES";
export const INITIALIZE_CONVERSION_RATES = "INITIALIZE_CONVERSION_RATES";



// Action to change the selected currency
export const changeCurrency = (currency) => ({
  type: CHANGE_CURRENCY,
  payload: currency,
});

// Action to update the conversion rates
export const updateConversionRates = (currency, rate) => ({
  type: UPDATE_CONVERSION_RATES,
  payload: { currency, rate },
});

export const initializeConversionRates = (rates) => ({
  type: INITIALIZE_CONVERSION_RATES,
  payload: rates,
});