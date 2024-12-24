import { CHANGE_CURRENCY, UPDATE_CONVERSION_RATES ,INITIALIZE_CONVERSION_RATES } from "../actions/currencyActions";

const initialState = {
  currency: "INR", // Default currency set to INR
  conversionRates: {
    // INR: 1,          // Base currency
    // USD: 0.018,      // US Dollar
    // EUR: 0.011,      // Euro
    // GBP: 0.0096,     // British Pound
    // AUD: 0.019,      // Australian Dollar
    // CAD: 0.016,      // Canadian Dollar
    // JPY: 1.82,       // Japanese Yen
    // CNY: 0.087,      // Chinese Yuan
    // CHF: 0.011,      // Swiss Franc
    // SEK: 0.12,       // Swedish Krona
    // NOK: 0.13,       // Norwegian Krone
    // DKK: 0.011,      // Danish Krone
    // SGD: 0.016,      // Singapore Dollar
    // HKD: 0.094,      // Hong Kong Dollar
    // NZD: 0.020,      // New Zealand Dollar
    // ZAR: 0.23,       // South African Rand
    // BRL: 0.06,       // Brazilian Real
    // RUB: 1.12,       // Russian Ruble
    // MXN: 0.21,       // Mexican Peso
    // KRW: 16.31,      // South Korean Won
    // MYR: 0.055,      // Malaysian Ringgit
    // THB: 0.42,       // Thai Baht
    // SAR: 0.045, 
  },
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    case UPDATE_CONVERSION_RATES:
      return {
        ...state,
        conversionRates: {
          ...state.conversionRates,
          [action.payload.currency]: action.payload.rate,
        },
      };
      case INITIALIZE_CONVERSION_RATES:
        return {
          ...state,
          conversionRates: action.payload,
        };
    default:
      return state;
  }
};

export default currencyReducer;
