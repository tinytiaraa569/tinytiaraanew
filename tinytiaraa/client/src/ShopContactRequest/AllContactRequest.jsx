import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '@/server';
import { Link, useLocation } from 'react-router-dom';

function AllContactRequest() {
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [requestsPerPage] = useState(12);
    const [loading, setLoading] = useState(true);


   

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${server}/contactus/all/contactus`, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });

                const sortedRequests = response.data.contactusRequests.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setRequests(sortedRequests);
            } catch (error) {
                console.error('Error fetching requests:', error);
                toast.error('Failed to fetch requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

    const totalPages = Math.ceil(requests.length / requestsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const location = useLocation();

    // Get the last segment of the URL (e.g., "dashboard" or "overview")
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentPages = pathSegments[pathSegments.length - 1];
  
    // You can map the path segment to a more readable name
    const breadcrumbText = currentPages.charAt(0).toUpperCase() + currentPages.slice(1); // Capitalize first letter


    return (
        <div className="px-8 pb-8 pt-6 w-full min-h-screen">
             <h2 className='text-[22px] font-[500]'>Contact Requests</h2>
                        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-gray-600 mb-4 mt-1">
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
            
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="text-xl text-gray-600">Loading...</div>
                </div>
            ) : (
                <div className="rounded-lg shadow-lg overflow-hidden bg-white border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                    Phone Number
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                    Message
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-300">
                            {currentRequests.map((request) => (
                                <tr key={request._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-b border-gray-200">
                                        {request.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-b border-gray-200">
                                        {request.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-b border-gray-200">
                                        {request.phonenumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-800 border-b border-gray-200 max-w-lg break-words">
                                        {request.message}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-b border-gray-200">
                                        {formatDate(request.CreatedAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            Showing {indexOfFirstRequest + 1} to{' '}
                            {Math.min(indexOfLastRequest, requests.length)} of {requests.length} requests
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 text-sm font-medium ${
                                    currentPage === 1
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                } rounded-l-lg`}
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 text-sm font-medium ${
                                        currentPage === index + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 text-sm font-medium ${
                                    currentPage === totalPages
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                } rounded-r-lg`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllContactRequest;
