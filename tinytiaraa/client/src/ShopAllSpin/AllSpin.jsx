import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '@/server';
import * as XLSX from 'xlsx';
import { FaFileExcel } from 'react-icons/fa'; 
import { Link, useLocation } from 'react-router-dom';

function AllSpin() {
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [requestsPerPage] = useState(14); // Number of requests to show per page
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${server}/spin/all/spin`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                console.log(response, "response");

                setRequests(response.data.spins); // Adjust the data path as needed
            } catch (error) {
                console.error('Error fetching requests:', error);
                toast.error('Failed to fetch requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    // Calculate the requests to show on the current page
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

    // Pagination logic
    const totalPages = Math.ceil(requests.length / requestsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(requests);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Spin Requests');

        // Generate Excel file and prompt download
        XLSX.writeFile(workbook, 'spin_requests.xlsx');
    };

    const location = useLocation();

    // Get the last segment of the URL (e.g., "dashboard" or "overview")
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentPagess = pathSegments[pathSegments.length - 1];
  
    // You can map the path segment to a more readable name
    const breadcrumbText = currentPagess.charAt(0).toUpperCase() + currentPagess.slice(1); // Capitalize first letter

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div className="p-4 mt-6 w-[90%]">
            <div className='flex justify-between'>
                <div>

             <h1 className="text-2xl font-bold mb-1  text-[#000000b9]">All Users</h1>
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
            </div>

            <div className='flex justify-end'>

            <button
                onClick={exportToExcel}
                className="mb-4 flex items-center px-4 py-1 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300"
                >
                <FaFileExcel className="mr-2" /> {/* Add the export icon */}
                Export to Excel
            </button>
            </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto text-[15px]">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-200">
                                <th className="py-2 px-4 border-r">Name</th>
                                <th className="py-2 px-4 border-r">Email</th>
                                <th className="py-2 px-4 border-r">Phone Number</th>
                                <th className="py-2 px-4 border-r">Coupon Code</th>
                                <th className="py-2 px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRequests.map((request) => (
                                <tr key={request._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b border-gray-200">{request.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{request.email}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{request.mobile}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{request.couponCode}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        {formatDate(request.CreatedAt || request.createdAt)} {/* Adjusted the property access */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4">
                        <nav className="inline-flex">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-l-md bg-white text-gray-500 hover:bg-gray-100"
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 border-t border-b border-gray-300 ${
                                        currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
                                    } hover:bg-gray-100`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-r-md bg-white text-gray-500 hover:bg-gray-100"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllSpin;
