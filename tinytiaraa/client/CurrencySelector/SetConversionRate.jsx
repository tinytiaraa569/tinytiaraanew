// src/components/SetConversionRate.jsx

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateConversionRates } from "../src/redux/actions/currencyActions";

// const SetConversionRate = () => {
//   const [rate, setRate] = useState(0);
//   const [selectedCurrency, setSelectedCurrency] = useState("EUR"); // Default currency for setting rate
//   const dispatch = useDispatch();
//   const conversionRates = useSelector((state) => state.currency.conversionRates);

//   const handleRateChange = (e) => {
//     const value = e.target.value;
//     // Validate that the input is a valid number
//     setRate(value === "" ? "" : parseFloat(value));
//   };

//   const handleSetRate = () => {
//     if (rate !== "" && !isNaN(rate)) {
//       dispatch(updateConversionRates(selectedCurrency, rate));
//       setRate(0); // Reset rate after setting
//     } else {
//       alert("Please enter a valid rate."); // Alert for invalid input
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Conversion Rates</h2>
      
//       {/* Table to display current conversion rates */}
//       <table className="min-w-full border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-200 p-4 text-left">Currency</th>
//             <th className="border border-gray-200 p-4 text-left">Conversion Rate</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(conversionRates).map(([currency, value]) => (
//             <tr key={currency} className="hover:bg-gray-50">
//               <td className="border border-gray-200 p-4">{currency}</td>
//               <td className="border border-gray-200 p-4">{value}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Input and buttons for updating rates */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2">Update Conversion Rate</h3>
//         <input
//           type="number"
//           value={rate}
//           onChange={handleRateChange}
//           placeholder="Set conversion rate"
//           className="border rounded p-2 mb-4 w-full"
//         />
//         <div className="flex flex-wrap gap-4">
//           {Object.keys(conversionRates).map((currency) => (
//             <button
//               key={currency}
//               onClick={() => setSelectedCurrency(currency)}
//               className={`${
//                 selectedCurrency === currency
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-black"
//               } hover:bg-blue-600 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
//             >
//               {currency}
//             </button>
//           ))}
//         </div>
//         <button
//           onClick={handleSetRate}
//           className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Update Rate
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SetConversionRate;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "@/server";
import {
  TextField,
  Button,
  Checkbox,
  Select,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputLabel,
  FormControl,
  FormHelperText
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

// Sample currency flags and country data
const countryFlags = {
  USD: { country: "United States", flag: "https://flagcdn.com/us.svg" },
  EUR: { country: "European Union", flag: "https://flagcdn.com/eu.svg" },
  INR: { country: "India", flag: "https://flagcdn.com/in.svg" },
  GBP: { country: "United Kingdom", flag: "https://flagcdn.com/gb.svg" },
  AUD: { country: "Australia", flag: "https://flagcdn.com/au.svg" },
  CAD: { country: "Canada", flag: "https://flagcdn.com/ca.svg" },
  JPY: { country: "Japan", flag: "https://flagcdn.com/jp.svg" },
  CNY: { country: "China", flag: "https://flagcdn.com/cn.svg" },
  NZD: { country: "New Zealand", flag: "https://flagcdn.com/nz.svg" },
  SGD: { country: "Singapore", flag: "https://flagcdn.com/sg.svg" },
  CHF: { country: "Switzerland", flag: "https://flagcdn.com/ch.svg" },
  HKD: { country: "Hong Kong", flag: "https://flagcdn.com/hk.svg" },
  SEK: { country: "Sweden", flag: "https://flagcdn.com/se.svg" },
  NOK: { country: "Norway", flag: "https://flagcdn.com/no.svg" },
  DKK: { country: "Denmark", flag: "https://flagcdn.com/dk.svg" },
  RUB: { country: "Russia", flag: "https://flagcdn.com/ru.svg" },
  ZAR: { country: "South Africa", flag: "https://flagcdn.com/za.svg" },
  BRL: { country: "Brazil", flag: "https://flagcdn.com/br.svg" },
  MXN: { country: "Mexico", flag: "https://flagcdn.com/mx.svg" },
  KRW: { country: "South Korea", flag: "https://flagcdn.com/kr.svg" },
  MYR: { country: "Malaysia", flag: "https://flagcdn.com/my.svg" },
  THB: { country: "Thailand", flag: "https://flagcdn.com/th.svg" },
  SAR: { country: "Saudi Arabia", flag: "https://flagcdn.com/sa.svg" },
};

const SetConversionRate = () => {
  const [formData, setFormData] = useState({
    code: "",
    country: "",
    flag: "",
    exchangeRate: "",
  });
  const [manualEntry, setManualEntry] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch existing currencies
    axios.get(`${server}/get-all-currencies`).then((response) => {
      setCurrencies(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      if (!manualEntry && name === "code") {
        const currencyData = countryFlags[value];
        if (currencyData) {
          updatedFormData.country = currencyData.country;
          updatedFormData.flag = currencyData.flag;
        } else {
          updatedFormData.country = "";
          updatedFormData.flag = "";
        }
      }

      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (formData._id) {
        // If the currency has an ID, we are editing it
        response = await axios.put(`${server}/edit-currency/${formData._id}`, formData);
        setMessage(`Currency updated successfully: ${response.data.code}`);
        
        // Update the currencies list with the updated currency (instead of adding a new one)
        setCurrencies(currencies.map((currency) =>
          currency._id === response.data._id ? response.data : currency
        ));
      } else {
        // Creating new currency
        response = await axios.post(`${server}/create-new-currency`, formData);
        setMessage(`Currency added successfully: ${response.data.code}`);
        
        // Add the new currency to the list
        setCurrencies([...currencies, response.data]);
      }
  
      // Reset the form data
      setFormData({
        code: "",
        country: "",
        flag: "",
        exchangeRate: "",
      });
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async (currencyCode) => {
    console.log(currencyCode,"currency code ")
    try {
      // Fetch the currency by code to get its _id
      const response = await axios.get(`${server}/get-currency-by-code/${currencyCode}`);
      const currencyId = response.data._id;
  
      // Now delete the currency using the _id
      await axios.delete(`${server}/delete-currency/${currencyId}`);
      setCurrencies(currencies.filter((currency) => currency.code !== currencyCode));
      setMessage(`Currency ${currencyCode} deleted successfully.`);
    } catch (error) {
      setMessage(`Error deleting currency: ${error.response?.data?.message || error.message}`);
    }
  };
  

  const handleEdit = (currencyCode) => {
    // Find the currency by code and populate the form to allow editing
    const currencyToEdit = currencies.find((currency) => currency.code === currencyCode);
    setFormData(currencyToEdit);
    setManualEntry(true); // Enable manual entry for editing
  };

   const location = useLocation();
  
      // Get the last segment of the URL (e.g., "dashboard" or "overview")
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const currentPage = pathSegments[pathSegments.length - 1];
    
      // You can map the path segment to a more readable name
      const breadcrumbText = currentPage.charAt(0).toUpperCase() + currentPage.slice(1); // Capitalize first letter
  
      useEffect(() => {
          window.scrollTo(0, 0)
        }, [])
  

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Paper className="p-6 rounded-lg shadow-lg">
        <h2 className='text-[22px] font-[500]'>Set Conversion Rate</h2>


        <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-4 mt-1">
                            <ol className="flex space-x-2">
                            <li>
                                <Link to={"/dashboard"} className="hover:text-blue-500">Home</Link>
                            </li>
                            <li>&gt;</li> {/* Separator */}
                            <li>
                                <span className="text-gray-400">{breadcrumbText}</span> {/* Active breadcrumb */}
                            </li>
                            </ol>
                        </nav>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="manualEntryToggle" className="flex items-center space-x-2">
              <Checkbox
                checked={manualEntry}
                onChange={() => setManualEntry(!manualEntry)}
              />
              <span className="text-sm font-medium text-gray-700">Enable Manual Entry</span>
            </label>
          </div>
          <FormControl fullWidth>
            <InputLabel>Currency Code</InputLabel>
            {manualEntry ? (
              <TextField
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                label="Currency Code"
                fullWidth
                required
                placeholder="Enter currency code" // Placeholder text for input
              />
            ) : (
              <Select
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                fullWidth
                required
              >
                <MenuItem value="" disabled>Select a currency</MenuItem>
                {Object.entries(countryFlags).map(([code, { country }]) => (
                  <MenuItem key={code} value={code}>
                    {code} - {country}
                  </MenuItem>
                ))}
              </Select>
            )}
            <FormHelperText>Enter or select a currency code</FormHelperText> {/* Help text */}
          </FormControl>
          <TextField
            id="country"
            name="country"
            value={formData.country}
            onChange={manualEntry ? handleInputChange : undefined}
            label="Country"
            fullWidth
            required
            readOnly={!manualEntry}
            placeholder="Country" // Placeholder text for country field
          />
          <TextField
            id="flag"
            name="flag"
            value={formData.flag}
            onChange={manualEntry ? handleInputChange : undefined}
            label="Flag"
            fullWidth
            required={manualEntry}
            readOnly={!manualEntry}
            placeholder="Flag URL" // Placeholder text for flag field
          />
          {formData.flag && (
            <img
              src={formData.flag}
              alt={`${formData.country} Flag`}
              className="mt-2 w-16 h-10 rounded"
            />
          )}
          <TextField
            id="exchangeRate"
            name="exchangeRate"
            type="number"
            value={formData.exchangeRate}
            onChange={handleInputChange}
            label="Exchange Rate"
            fullWidth
            required
            placeholder="Enter exchange rate" // Placeholder for exchange rate
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {formData._id ? 'Update Currency' : 'Add Currency'}
          </Button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
      </Paper>

      <TableContainer component={Paper} className="mt-10 mb-10">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Currency Code</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Flag</TableCell>
              <TableCell>Exchange Rate</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currencies.map((currency) => (
              <TableRow key={currency.code}>
                <TableCell>{currency.code}</TableCell>
                <TableCell>{currency.country}</TableCell>
                <TableCell>
                  <img src={currency.flag} alt={`${currency.country} Flag`} className="w-16 h-10 rounded" />
                </TableCell>
                <TableCell>{currency.exchangeRate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(currency.code)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(currency.code)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SetConversionRate;
