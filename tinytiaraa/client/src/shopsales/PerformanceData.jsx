import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  Select,
  MenuItem,
  Pagination,
  TableSortLabel,
} from '@mui/material';
import { GoQuestion } from "react-icons/go";
import { Link } from 'react-router-dom';
import { server } from '@/server';

const PerformanceDashboard = () => {
  const [performanceData, setPerformanceData] = useState(null);
  const [filter, setFilter] = useState('1_month'); // Default filter
  const [page, setPage] = useState(1); // Pagination state
  const [sortConfig, setSortConfig] = useState({ key: 'impressions', direction: 'desc' }); // Sorting state
  const itemsPerPage = 5; // Number of links per page

  useEffect(() => {
    fetch(`${server}/performance-data?filter=${filter}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const uniqueData = deduplicateData(data.data);
          setPerformanceData({ ...data, data: uniqueData });
        } else {
          console.error('No data found:', data.message);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [filter]);

  const deduplicateData = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const url = item.page;
      if (!groupedData[url]) {
        groupedData[url] = { ...item, impressions: 0, clicks: 0 };
      }
      groupedData[url].impressions += item.impressions;
      groupedData[url].clicks += item.clicks;
    });
    return Object.values(groupedData).sort((a, b) => a.page.localeCompare(b.page));
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc';
    setSortConfig({ key, direction });
  };

  const sortedData = performanceData
    ? [...performanceData.data].sort((a, b) => {
        const multiplier = sortConfig.direction === 'asc' ? 1 : -1;
        return a[sortConfig.key] > b[sortConfig.key] ? multiplier : -multiplier;
      })
    : [];

  if (!performanceData) {
    return (
      <div className="border border-gray-100 bg-white shadow-lg rounded-[10px] space-y-4 p-4">
        <div className="w-1/3 h-6 bg-gray-300 animate-pulse rounded"></div>
        <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-full h-72 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  const { metrics } = performanceData;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="px-6 pt-3 pb-6 border bg-white border-gray-100 shadow-lg rounded-[10px]">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-[20px] font-[00] text-gray-600">Performance Dashboard</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="1_month">Last 1 Month</option>
          <option value="3_months">Last 3 Months</option>
        </select>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Total Clicks */}
          <div className="text-center bg-white border border-gray-100 rounded-[4px] shadow-md p-4">
                <h3 className="text-lg font-medium text-gray-800">Total Clicks</h3>
                <h1 className="text-3xl text-gray-500 mt-2">{metrics.totalClicks}</h1>
                <div className="flex justify-end mt-2">
                <div className="relative group">
                    <GoQuestion className="text-gray-400 cursor-pointer hover:text-gray-600" />
                    <div className="w-[280px] z-20 absolute right-0 top-[90%] transform border border-gray-100 rounded-[4px] translate-y-[4px] hidden group-hover:block bg-white text-gray-800 text-[12px]  py-2 px-3 shadow-lg">
                    Total clicks is how many times a user clicked through to your site. How this is counted depends on the search result type.
                    </div>
                </div>
                </div>
            </div>

            {/* Total Impressions */}
            <div className="text-center bg-white border border-gray-100 rounded-[4px] shadow-md p-4">
                <h3 className="text-lg font-medium text-gray-800">Total Impressions</h3>
                <h1 className="text-3xl text-gray-500 mt-2">{metrics.totalImpressions}</h1>
                <div className="flex justify-end mt-2">
                <div className="relative group">
                    <GoQuestion className="text-gray-400 cursor-pointer hover:text-gray-600" />
                    <div className="w-[280px] absolute right-0 z-20 top-[90%] transform border border-gray-100 rounded-[4px] translate-y-[4px] hidden group-hover:block bg-white text-gray-800 text-[12px]  py-2 px-3 shadow-lg">
                    Total impressions is how many times a user saw a link to your site in search results. This is calculated differently for images and other search result types, depending on whether or not the result was scrolled into view.
                    </div>
                </div>
                </div>
            </div>

            {/* Avg CTR */}
            <div className="text-center bg-white border border-gray-100 rounded-[4px] shadow-md p-4">
                <h3 className="text-lg font-medium text-gray-800">Avg CTR</h3>
                <h1 className="text-3xl text-gray-500 mt-2">{metrics.avgCTR}</h1>
                <div className="flex justify-end mt-2">
                <div className="relative group">
                    <GoQuestion className="text-gray-400 cursor-pointer hover:text-gray-600" />
                    <div className="w-[280px] absolute right-0 z-20 top-[90%] transform border border-gray-100 rounded-[4px] translate-y-[4px] hidden group-hover:block bg-white text-gray-800 text-[12px]  py-2 px-3 shadow-lg">
                    Average click-through rate (CTR) is the percentage of impressions that resulted in a click
                    </div>
                </div>
                </div>
            </div>

            {/* Avg Position */}
            <div className="text-center bg-white border border-gray-200 rounded-lg shadow-md p-4">
                <h3 className="text-lg font-medium text-gray-800">Avg Position</h3>
                <h1 className="text-3xl text-gray-500 mt-2">{metrics.avgPosition}</h1>
                <div className="flex justify-end mt-2">
                <div className="relative group cursor-pointer">
                    <GoQuestion className="text-gray-400 cursor-pointer hover:text-gray-600" />
                    <div className="w-[280px] absolute right-0 top-[90%] z-20 transform border border-gray-100 rounded-[4px] translate-y-[4px] hidden group-hover:block bg-white text-gray-800 text-[12px]  py-2 px-3 shadow-lg">
                        Average position is the average position of your site in search results, based on its highest position whenever it appeared in a search. Individual page position is available in the table below the chart. Position determination can be complicated by features such as carousels or Knowledge Panels.
                    </div>
                </div>
                </div>
            </div>
      
      </div>

      {/* Table Section */}
      <TableContainer component={Paper} className="my-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'impressions'}
                  direction={sortConfig.key === 'impressions' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('impressions')}
                >
                  Impressions
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'clicks'}
                  direction={sortConfig.key === 'clicks' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('clicks')}
                >
                  Clicks
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link to={row.page} target="_blank">
                    {row.page}
                  </Link>
                </TableCell>
                <TableCell>{row.impressions}</TableCell>
                <TableCell>{row.clicks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Grid container justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(sortedData.length / itemsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Grid>
    </div>
  );
};

export default PerformanceDashboard;
