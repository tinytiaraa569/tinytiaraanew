import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaGoogle } from 'react-icons/fa'; // Import Google Icon
import { HiMiniTrophy } from "react-icons/hi2"; // Trophy Icon
import { server } from "@/server";

const SearchConsoleData = () => {
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/search-console-data`);
        setSearchData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data || "Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get top 5 results by impressions
  const topResults = searchData.slice(0, 4);

  if (loading) {
    return <div className="border border-gray-100 bg-white shadow-xl rounded-[10px]  space-y-4 p-4">
    <div className="w-1/3 h-6 bg-gray-300 animate-pulse rounded"></div>
    <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded"></div>
    <div className="w-full h-72 bg-gray-200 animate-pulse rounded"></div>
  </div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  return (
    <div className="w-full h-[430px] p-4  bg-white shadow-lg border border-gray-200 rounded-[10px]">
      <div className="flex items-center ml-3 mb-4">
        <FaGoogle className="text-4xl mr-3 text-blue-500" />

        <div>
          <h4 className="text-lg font-semibold">Google Search</h4>
          <p className="text-sm text-gray-600">How visitors find your site on Google</p>
        </div>
      </div>

      <div className="space-y-4">
        {topResults.map((item, index) => (
          <div key={index} className="bg-white border border-gray-100 py-3 px-7 rounded-[10px] shadow-lg flex justify-between items-center cursor-pointer">
            <div className="flex flex-col">
              <div className="text-[15px] font-semibold">{item.query}</div>
              <div className="flex items-center gap-3 text-[12px] text-gray-600">
                Avg. Position: {item.avgPosition.toFixed(2)}{" "}
                {item.avgPosition < 5 && (
                  <span className="flex items-center bg-green-200 text-green-700 text-[11px] rounded-full px-2 py-1">
                    <HiMiniTrophy className="mr-2 text-[12px]" />
                    Top 5 results
                  </span>
                )}
              </div>
            </div>
            <div className="text-center text-[12px] text-gray-600">
              <div>{item.clicks} Clicks</div>
              <div>{item.impressions} Impressions</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchConsoleData;
