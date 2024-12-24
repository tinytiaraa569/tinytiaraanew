import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrency, initializeConversionRates } from "../src/redux/actions/currencyActions";
import { server } from "@/server";

const CurrencySelector = ({ toggleCurrencySelector, onCurrencySelect , currencyDataz}) => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency.currency);

  const currencyData = (currencyDataz && Array.isArray(currencyDataz) ? currencyDataz : []).reduce((acc, item) => {
    acc[item.code] = {
      country: item.country,
      flag: item.flag,
    };
    return acc;
  }, {});

  
  
  console.log(currencyData);

  // const currencyData = {
  //   USD: { country: "United States", flag: "https://flagcdn.com/us.svg" },
  //   EUR: { country: "European Union", flag: "https://flagcdn.com/eu.svg" },
  //   INR: { country: "India", flag: "https://flagcdn.com/in.svg" },
  //   GBP: { country: "United Kingdom", flag: "https://flagcdn.com/gb.svg" },
  //   AUD: { country: "Australia", flag: "https://flagcdn.com/au.svg" },
  //   CAD: { country: "Canada", flag: "https://flagcdn.com/ca.svg" },
  //   JPY: { country: "Japan", flag: "https://flagcdn.com/jp.svg" },
  //   CNY: { country: "China", flag: "https://flagcdn.com/cn.svg" },
  //   NZD: { country: "New Zealand", flag: "https://flagcdn.com/nz.svg" },
  //   SGD: { country: "Singapore", flag: "https://flagcdn.com/sg.svg" },
  //   CHF: { country: "Switzerland", flag: "https://flagcdn.com/ch.svg" },
  //   HKD: { country: "Hong Kong", flag: "https://flagcdn.com/hk.svg" },
  //   SEK: { country: "Sweden", flag: "https://flagcdn.com/se.svg" },
  //   NOK: { country: "Norway", flag: "https://flagcdn.com/no.svg" },
  //   DKK: { country: "Denmark", flag: "https://flagcdn.com/dk.svg" },
  //   RUB: { country: "Russia", flag: "https://flagcdn.com/ru.svg" },
  //   ZAR: { country: "South Africa", flag: "https://flagcdn.com/za.svg" },
  //   BRL: { country: "Brazil", flag: "https://flagcdn.com/br.svg" },
  //   MXN: { country: "Mexico", flag: "https://flagcdn.com/mx.svg" },
  //   KRW: { country: "South Korea", flag: "https://flagcdn.com/kr.svg" },
  //   MYR: { country: "Malaysia", flag: "https://flagcdn.com/my.svg" },
  //   THB: { country: "Thailand", flag: "https://flagcdn.com/th.svg" },
  //   SAR: { country: "Saudi Arabia", flag: "https://flagcdn.com/sa.svg" },

  const fetchCurrencyData = async () => {
    try {
      const response = await fetch(`${server}/get-all-currencies`);
      const data = await response.json();
  
      // Transform API response to match the format expected in conversionRates
      const conversionRates = data.reduce((acc, curr) => {
        acc[curr.code] = curr.exchangeRate;
        return acc;
      }, {});
  
      
      dispatch(initializeConversionRates(conversionRates));
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  };
  
  // Fetch currency data on component mount
  useEffect(() => {
    fetchCurrencyData();
  }, []);
  // };

  const selectedCurrencyData = currencyData[currency] || {};

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    dispatch(changeCurrency(newCurrency)); // Update Redux state
    fetchCurrencyData()
    onCurrencySelect(newCurrency); // Call the passed function to update parent state
  };

  return (
    <div>
      <h1 className="text-[15px] text-center text-[#000000c2]">
        Change Country / Currency
      </h1>

      {/* Selected flag and country */}
      <div className="slectedflagdata flex items-center justify-center py-3">
        {selectedCurrencyData.flag && (
          <img
            src={selectedCurrencyData.flag}
            alt={selectedCurrencyData.country}
            className="w-8 h-5 mr-2"
          />
        )}
        <h1 className="text-[14px] font-semibold">
          {selectedCurrencyData.country || "Selected country"} - {currency}
        </h1>
      </div>

      {/* Custom Currency Selector */}
      <div className="currency-selector py-3 flex justify-center items-center">
        <label
          className="!text-[12px] font-semibold mr-2 text-[#2b2b2b77] cursor-pointer"
          htmlFor="Changecurrency"
        >
          Change Currency:
        </label>
        <div className="relative">
          <select
            id="Changecurrency"
            value={currency}
            onChange={handleCurrencyChange}
            className="!text-[12px] p-2 border border-gray-300 !rounded-lg cursor-pointer appearance-none"
          >
            {Object.keys(currencyData).map((code) => (
              <option key={code} value={code}>
                {currencyData[code].country} ({code})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center my-1 mb-3 cursor-pointer">
        <button className="productviewmore" onClick={toggleCurrencySelector}>
          Update Currency
        </button>
      </div>
    </div>
  );
};

export default CurrencySelector;
