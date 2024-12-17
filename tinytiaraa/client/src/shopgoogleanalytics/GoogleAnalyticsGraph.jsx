import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { server } from '@/server';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GoogleAnalyticsGraph = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0); // New state for active users

  useEffect(() => {
    // Fetch Google Analytics data
    const fetchAnalyticsData = async () => {
      try {
        // Call the backend to fetch data
        const response = await axios.get(`${server}/analytics`); 
        const data = response.data;

        // Sort data by date in ascending order
        const sortedData = data.sort((a, b) => {
          // Convert the date string in 'YYYYMMDD' format to a Date object for comparison
          const dateA = new Date(a.date.slice(0, 4), a.date.slice(4, 6) - 1, a.date.slice(6, 8));
          const dateB = new Date(b.date.slice(0, 4), b.date.slice(4, 6) - 1, b.date.slice(6, 8));

          return dateA - dateB;
        });

        // Process sorted data to match chart.js format
        const labels = sortedData.map(item => item.date); // Example: ["2024-11-01", "2024-11-02", ...]
        
        // Ensure sessions and active users are numbers and map the data
        const sessions = sortedData.map(item => Number(item.sessions)); // Convert sessions to numbers
        const activeUsersData = sortedData.map(item => Number(item.activeUsers)); // Active users

        // Calculate total user count by summing the sessions (this could be adjusted to reflect more accurate user counts)
        const totalUserCount = sessions.reduce((total, num) => total + num, 0);
        const totalActiveUserCount = activeUsersData.reduce((total, num) => total + num, 0);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Sessions',
              data: sessions,
              borderColor: '#077f9c',
              backgroundColor: 'rgba(7, 127, 156, 0.2)',
              fill: true,
            },
            {
              label: 'Active Users',
              data: activeUsersData,
              borderColor: '#FF6347', // Use a different color for active users
              backgroundColor: 'rgba(255, 99, 71, 0.2)',
              fill: true,
            },
          ],
        });

        setTotalUsers(totalUserCount); // Set the total user count
        setActiveUsers(totalActiveUserCount); // Set the total active users
      } catch (error) {
        console.error('Error fetching analytics data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="w-[100%] px-5 pt-2 pb-4 bg-white shadow-xl rounded-[10px] ">
      
      {loading ? (
         <div className="space-y-4">
         <div className="w-1/3 h-6 bg-gray-300 animate-pulse rounded"></div>
         <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded"></div>
         <div className="w-full h-72 bg-gray-200 animate-pulse rounded"></div>
       </div>
      ) : (
        <>
        <div className="mb-1 mt-2">
            <h2 className="text-lg font-semibold text-gray-700">
              🌐 Visitors Report
            </h2>
          </div>

        {/* Report Details */}
        <div className="flex items-center space-x-6 text-gray-700 mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-blue-500">•</span>
            <h4 className="text-sm font-medium">Total Users:</h4>
            <span className="text-sm font-semibold text-blue-600">{totalUsers}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">•</span>
            <h4 className="text-sm font-medium">Active Users:</h4>
            <span className="text-sm font-semibold text-green-600">{activeUsers}</span>
          </div>
        </div>


          <div className="w-full h-[318px] mt-2 cursor-pointer">
            <Line data={chartData} options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Sessions and Active Users Over Time',
                },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                },
              },
              scales: {
                x: {
                  type: 'category',
                },
                y: {
                  min: 0,
                  ticks: {
                    beginAtZero: true,
                  },
                },
              },
            }} />
          </div>
        </>
      )}
    </div>
  );
};

export default GoogleAnalyticsGraph;
