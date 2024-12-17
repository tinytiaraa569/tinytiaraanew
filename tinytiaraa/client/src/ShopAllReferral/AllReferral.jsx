import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '@/server';
import ReferDetail from './ReferDetail';
import { Link, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx'; 
import { AiOutlineFileExcel } from 'react-icons/ai'; // Import the Excel icon
function AllReferral() {
    const [referrals, setReferrals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [referralsPerPage] = useState(12); // Number of referrals to show per page
    const [loading, setLoading] = useState(true);
    const [selectedReferral, setSelectedReferral] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // Search query state

    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                const response = await axios.get(`${server}/referral/all-referrals`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                setReferrals(response.data.referrals);
            } catch (error) {
                console.error('Error fetching referrals:', error);
                toast.error('Failed to fetch referrals.');
            } finally {
                setLoading(false);
            }
        };

        fetchReferrals();
    }, []);

    // Filter referrals based on the search query (code, name, or email)
    const filteredReferrals = referrals.filter(
        (referral) =>
            referral.referralCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            referral.referrer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            referral.referrer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    // Calculate the referrals to show on the current page after filtering
    const indexOfLastReferral = currentPage * referralsPerPage;
    const indexOfFirstReferral = indexOfLastReferral - referralsPerPage;
    const currentReferrals = filteredReferrals.slice(indexOfFirstReferral, indexOfLastReferral);

    // Pagination logic
    const totalPages = Math.ceil(filteredReferrals.length / referralsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const openDetails = (referralId) => {
        setSelectedReferral(referralId);
    };

    const closeDetails = () => {
        setSelectedReferral(null);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page when the search query changes
    };
    const location = useLocation();

    // Get the last segment of the URL (e.g., "dashboard" or "overview")
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentPagess = pathSegments[pathSegments.length - 1];
  
    // You can map the path segment to a more readable name
    const breadcrumbText = currentPagess.charAt(0).toUpperCase() + currentPagess.slice(1); // Capitalize first letter


    const exportToExcel = () => {
        const formattedData = referrals.map((ref) => ({
            "Referral Code": ref.referralCode,
            "Referrer Name": ref.referrer.name,
            "Referrer Email": ref.referrer.email,
            "Created At": new Date(ref.createdAt).toLocaleDateString(),
            "Referral Used": ref.referralUsed ? "Yes" : "No",
            "Referral Balance": ref.referralBalance,
            "Referred Guests (Emails and Amounts)": ref.referredGuestEmails
                .map((email, index) => `• ${email}: ₹${ref.referredRewardAmounts[index] || "0.00"}`)
                .join("\r\n"), // Using \r\n for line breaks inside the same cell
            "Reward Amount": ref.rewardAmount,
            "Total Reward Amount": ref.totalRewardAmount,
        }));
    
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
    
        // Adjust column widths for better visibility
        const columnWidths = [
            { wch: 20 }, // Referral Code
            { wch: 25 }, // Referrer Name
            { wch: 30 }, // Referrer Email
            { wch: 15 }, // Created At
            { wch: 15 }, // Referral Used
            { wch: 20 }, // Referral Balance
            { wch: 50 }, // Referred Guests (Emails and Amounts)
            { wch: 15 }, // Reward Amount
            { wch: 20 }, // Total Reward Amount
        ];
        worksheet["!cols"] = columnWidths;
    
        // Create and export workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Referrals");
        XLSX.writeFile(workbook, "Referrals.xlsx");
    };
    
    return (
        <div className="p-6 px-10 bg-[#f0f8ff] rounded-lg shadow-lg w-full mx-auto">
            <div className='flex justify-between'>
                <div>

                <h2 className='text-[22px] font-[600]'>All Referral</h2>

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

                <div>
                <button
                    onClick={exportToExcel}
                    className="ml-4 px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 flex items-center space-x-2"
                >
                    <AiOutlineFileExcel className="h-5 w-5" /> {/* Add the icon */}
                    <span>Export to Excel</span>
                </button>
                </div>

            </div>
            
           

            {/* Search bar */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by Referral Code, Referrer Name, or Email"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />
            </div>

            {loading ? (
                <p className="text-center text-lg text-gray-500">Loading...</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-300">
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Referral Code</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Referrer Name</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Referrer Email</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Created At</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentReferrals.map((referral) => (
                                <tr key={referral._id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 text-sm text-gray-700">{referral.referralCode}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{referral.referrer.name}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{referral.referrer.email}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{new Date(referral.createdAt).toLocaleDateString()}</td>
                                    <td className="py-4 px-6 text-sm">
                                        <button
                                            onClick={() => openDetails(referral._id)}
                                            className="text-blue-600 hover:underline font-medium"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination controls */}
                    <div className="flex justify-between items-center mt-6">
                        <div className="text-sm text-gray-700">
                            Showing {indexOfFirstReferral + 1} to {Math.min(indexOfLastReferral, filteredReferrals.length)} of {filteredReferrals.length} referrals
                        </div>
                        <div>
                            <nav className="inline-flex space-x-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-l-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-4 py-2 border text-sm ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'} hover:bg-gray-100 rounded-md`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-r-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {selectedReferral && (
                <ReferDetail
                    referralId={selectedReferral}
                    onClose={closeDetails}
                />
            )}
        </div>
    );
}

export default AllReferral;
