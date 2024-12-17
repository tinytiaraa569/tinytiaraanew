// src/components/SetConversionRate.jsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateConversionRates } from "../src/redux/actions/currencyActions";

const SetConversionRate = () => {
  const [rate, setRate] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR"); // Default currency for setting rate
  const dispatch = useDispatch();
  const conversionRates = useSelector((state) => state.currency.conversionRates);

  const handleRateChange = (e) => {
    const value = e.target.value;
    // Validate that the input is a valid number
    setRate(value === "" ? "" : parseFloat(value));
  };

  const handleSetRate = () => {
    if (rate !== "" && !isNaN(rate)) {
      dispatch(updateConversionRates(selectedCurrency, rate));
      setRate(0); // Reset rate after setting
    } else {
      alert("Please enter a valid rate."); // Alert for invalid input
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Conversion Rates</h2>
      
      {/* Table to display current conversion rates */}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-4 text-left">Currency</th>
            <th className="border border-gray-200 p-4 text-left">Conversion Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(conversionRates).map(([currency, value]) => (
            <tr key={currency} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-4">{currency}</td>
              <td className="border border-gray-200 p-4">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Input and buttons for updating rates */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Update Conversion Rate</h3>
        <input
          type="number"
          value={rate}
          onChange={handleRateChange}
          placeholder="Set conversion rate"
          className="border rounded p-2 mb-4 w-full"
        />
        <div className="flex flex-wrap gap-4">
          {Object.keys(conversionRates).map((currency) => (
            <button
              key={currency}
              onClick={() => setSelectedCurrency(currency)}
              className={`${
                selectedCurrency === currency
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } hover:bg-blue-600 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              {currency}
            </button>
          ))}
        </div>
        <button
          onClick={handleSetRate}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Rate
        </button>
      </div>
    </div>
  );
};

export default SetConversionRate;
