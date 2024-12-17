import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Button, Tooltip } from '@mui/material';
import { server } from '@/server';

// Helper function to format numbers
const formatNumber = num => (num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num);

const PageViewsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('1month'); // Default date range

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/page-views?dateRange=${dateRange}`);
        setData(
          response.data.map(item => ({
            ...item,
            views: formatNumber(item.views), // Format views
          }))
        );
      } catch (err) {
        setError('Error fetching page views data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateRange]);

  // Define table columns (removing the 'Stream Name' column)
  const columns = React.useMemo(
    () => [
      {
        Header: 'Page Title',
        accessor: 'pageTitle',
        Cell: ({ value }) => (
          <Tooltip title={value}>
            <Typography noWrap sx={{ fontSize: '14px', maxWidth: '280px' }}>{value}</Typography>
          </Tooltip>
        ),
      },
      {
        Header: 'Views',
        accessor: 'views',
        Cell: ({ value }) => (
          <Typography sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: '14px' }}>{value}</Typography>
        ),
      },
    ],
    []
  );

  // React Table setup with pagination
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 6 } },
    usePagination
  );

  return (

    <>
    {
        loading ?
        (
            <div className="border border-gray-100 bg-white shadow-lg rounded-[10px] space-y-4 p-4">
                <div className="w-1/3 h-6 bg-gray-300 animate-pulse rounded"></div>
                <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-full h-72 bg-gray-200 animate-pulse rounded"></div>
            </div>
        )
        :
        (
            <div className='bg-white px-6 pt-5 pb-6 border border-gray-100 shadow-md rounded-[10px]'>
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='text-[18px] text-[#000000a8]'>Page Views</h3>
              </div>
              <div>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="1month">Last 1 Month</option>
                  <option value="3months">Last 3 Months</option>
                </select>
              </div>
            </div>
      
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error" sx={{ textAlign: 'center', marginTop: 2 }}>
                {error}
              </Typography>
            ) : (
              <div className='my-4'>
                <TableContainer sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
                  <Table {...getTableProps()} className='cursor-pointer'>
                    <TableHead>
                      {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()} className='bg-blue-300 text-black'>
                          {headerGroup.headers.map(column => (
                            <TableCell
                              {...column.getHeaderProps()}
                              sx={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                padding: '12px', // Increased padding for spacing
                              }}
                            >
                              {column.render('Header')}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                      {page.map(row => {
                        prepareRow(row);
                        return (
                          <TableRow {...row.getRowProps()} hover>
                            {row.cells.map(cell => (
                              <TableCell
                                {...cell.getCellProps()}
                                sx={{
                                  textAlign: 'center',
                                  fontSize: '14px', // Adjusted font size for better readability
                                  padding: '12px', // Increased padding for spacing
                                }}
                              >
                                {cell.render('Cell')}
                              </TableCell>
                            ))}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
      
            {/* Pagination Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Button
                variant="outlined"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                sx={{
                  padding: '6px 12px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                {'<'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => nextPage()}
                disabled={!canNextPage}
                sx={{
                  marginLeft: 1,
                  padding: '6px 12px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                {'>'}
              </Button>
            </Box>
          </div>
        )

    }
    
    </>
   
  );
};

export default PageViewsTable;
