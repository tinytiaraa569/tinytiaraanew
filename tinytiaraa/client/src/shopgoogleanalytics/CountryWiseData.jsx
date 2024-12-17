import { server } from '@/server';
import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Tooltip as ChartTooltip } from 'chart.js';
import { PiMapPinAreaFill } from "react-icons/pi";

const CountryWiseData = () => {
  const [countryData, setCountryData] = useState([]);  // To hold country-wise data (e.g., active users)
  const [geoData, setGeoData] = useState(null);        // To hold GeoJSON data
  const [hoveredCountry, setHoveredCountry] = useState(null);  // For tracking hovered country
  const [activeUsers, setActiveUsers] = useState(null);  // For tracking active users of hovered country
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });  // For tooltip positioning
  const [loading, setLoading] = useState(true);

  // Fetch the country data for active users (from your server or API)
  useEffect(() => {
    fetch(`${server}/analytics/countries`)  // Adjust the server URL accordingly
      .then((response) => response.json())
      .then((data) => {
        setCountryData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
      }) ;
  }, []);

  // Fetch the geo data from a remote GeoJSON file (this could be local or hosted)
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')  // Adjust the URL if needed
      .then((response) => response.json())
      .then((data) => {
        setGeoData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching GeoJSON data:', error);
      });
  }, []);

  // Get the active users for a country by matching the country name
  const getActiveUsers = (countryName) => {
    const nameMapping = {
      "United States of America": "United States", // Map GeoJSON name to data name
      // Add more mappings as needed
    };
    const normalizedCountryName = nameMapping[countryName] || countryName;
    const country = countryData.find((item) => item.country === normalizedCountryName);
    return country ? country.activeUsers : 0; // Return the active users count or 0 if not found
  };

  // Show active users when hovering over a country
  const handleMouseEnter = (countryName, event) => {
    const nameMapping = {
      "United States of America": "United States", // Add additional mappings as needed
    };
    const normalizedCountryName = nameMapping[countryName] || countryName;
    const users = getActiveUsers(normalizedCountryName);
    setHoveredCountry(normalizedCountryName);
    setActiveUsers(users);
    setTooltipPosition({
      top: event.clientY + 10, // Offset tooltip
      left: event.clientX - 40, // Center tooltip
    });
  };

  // Reset on mouse leave
  const handleMouseLeave = () => {
    setHoveredCountry(null);
    setActiveUsers(null);
  };
  const getCountryCode = (countryName) => {
    const mapping = {
      India: "in",
      "United States": "us",
      Ireland: "ie",
      Sweden: "se",
      Ukraine: "ua",
      "United Arab Emirates": "ae",
      "United Kingdom": "gb",
      China: "cn",
      Canada: "ca",
      Thailand: "th",
      France: "fr",
      Netherlands: "nl",
      Australia: "au",
      Finland: "fi",
      Germany: "de",
      "Hong Kong": "hk",
      Mexico: "mx",
      Nepal: "np",
      Poland: "pl",
      Qatar: "qa",
      "not set": null, // Handle special cases
    };
    return mapping[countryName] || null; // Return country code or null
  };
  const totalActiveUsers = countryData.reduce((acc, cur) => acc + cur.activeUsers, 0);
  const countriesWithUsers = countryData.filter((item) => item.activeUsers > 0).length;
  const topCountries = [...countryData]
    .sort((a, b) => b.activeUsers - a.activeUsers)
    .slice(0, 3); // Top 3 countries by active users
  

  return (
    <div className="w-full px-5 pt-2 pb-4 bg-white shadow-xl  rounded-[10px]">
     {
      loading ? (
        <div className="space-y-4">
         <div className="w-1/3 h-6 bg-gray-300 animate-pulse rounded"></div>
         <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded"></div>
         <div className="w-full h-72 bg-gray-200 animate-pulse rounded"></div>
        </div>
      ) :
      (
        <>
         <div className="mb-2 mt-2">
        <h2 className="text-lg font-semibold text-gray-600 flex items-center gap-2"> <PiMapPinAreaFill className='text-blue-500 w-6 h-6'/>
        Active Users by Country</h2>
      </div>

      {/* Tooltip showing active users */}
      {hoveredCountry && activeUsers !== null && (
        <div
          className="absolute flex items-center bg-white shadow-lg rounded-lg"
          style={{
            zIndex: 1000,
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform: 'translateX(-50%)',
            maxWidth: '250px',
            padding: '8px 12px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#ffffff',
            color: '#333333',
            fontWeight: '500',
            fontSize: '14px',
            border: '1px solid #e0e0e0',
          }}
        >
          {/* Country flag */}
          {getCountryCode(hoveredCountry) && (
            <img
              src={`https://flagcdn.com/w40/${getCountryCode(hoveredCountry)}.png`}
              alt={`${hoveredCountry} flag`}
              className="w-8 h-6 mr-3 rounded-lg"
              style={{
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                objectFit: 'cover',
              }}
            />
          )}

          {/* Country name and active users */}
          <div>
            <strong style={{ fontSize: '15px', color: '#1a1a1a' }}>{hoveredCountry}</strong>
            <div style={{ fontSize: '13px', color: '#4caf50', marginTop: '4px' }}>
              {activeUsers} Active Users
            </div>
          </div>
        </div>
      )}


      {/* Render the map if geoData is available */}
      <div className="w-full mx-auto mb-2 relative border border-gray-300 rounded-[10px]" style={{ maxWidth: '800px' }}> {/* Adjusted map size */}
        {geoData && (
          <ComposableMap className='rounded-[10px]' projection="geoMercator" width={800}  height={440}> {/* Set width and height */}
            <ZoomableGroup>
              <Geographies geography={geoData}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryName = geo.properties.name;  // Country name in GeoJSON
                    const activeUsers = getActiveUsers(countryName);  // Get active users based on country name

                    // Default color for countries with no active users
                    const fillColor = activeUsers > 0 ? '#5d93df' : '#f5f5f5'; // Green if users > 0, light gray if no active users

                    return (
                      <Geography
                      className='cursor-pointer'
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor} // Set fill color based on active users
                        stroke="#000"
                        strokeWidth={0.5}
                        onMouseEnter={(event) => handleMouseEnter(countryName, event)} // On hover, show active users
                        onMouseLeave={handleMouseLeave} // Reset when mouse leaves
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        )}
      </div>

      <div className="mb-1">
      <h3 className="text-md font-semibold text-gray-700 mb-1">Top  Active Countries</h3>
      <div className="flex flex-wrap gap-4">
        {countryData.slice(0, 4).map((country, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <span className="text-xs text-gray-600">•</span>
            <span className="text-sm text-gray-800 font-medium">{country.country}:</span>
            <span className="text-sm text-green-600">{country.activeUsers}</span>
          </div>
        ))}
      </div>
    </div>
        </>
      )
     }
    </div>
  );
};

export default CountryWiseData;
