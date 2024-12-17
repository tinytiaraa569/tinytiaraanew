import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '@/server';
import { toast } from 'react-toastify';
import { FiRefreshCcw } from 'react-icons/fi';
import { MdConnectWithoutContact } from 'react-icons/md';
import { CiBank } from "react-icons/ci";

const ReferralList = () => {
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [referralBalance, setReferralBalance] = useState(0);
    console.log(referrals,"referrrals ")

    // Function to fetch referral balance
    const fetchReferralBalance = async () => {
        try {
            const response = await axios.get(`${server}/referral/referral-balance`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (response.data && response.data.success) {
                setReferralBalance(response.data.referralBalance || 0);
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (err) {
            console.error('API Error:', err);
            toast.error('An error occurred while fetching referral balance');
        }
    };

    // Function to fetch referrals
    const fetchReferrals = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`${server}/referral/user-referrals`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (response.data && response.data.referrals) {
                setReferrals(response.data.referrals);
            } else {
                throw new Error('Unexpected response format');
            }

            toast.success("Referrals fetched successfully");
        } catch (err) {
            console.error('API Error:', err);
            setError(err.message || 'An error occurred while fetching referrals');
        } finally {
            setLoading(false);
        }
    };

    // Function to update referral balances
    const updateReferralBalances = async () => {
        try {
            const response = await axios.post(`${server}/referral/update-referral-balances`, {}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (response.data && response.data.success) {
                fetchReferralBalance(); // Refresh balance after updating
                fetchReferrals(); // Refresh referrals data
                toast.success("Referral balances updated successfully");
            } else {
                throw new Error('Failed to update referral balances');
            }
        } catch (err) {
            console.error('API Error:', err);
            toast.error('Failed to update referral balances');
        }
    };

    // Fetch referrals and referral balance on component mount
    useEffect(() => {
        fetchReferrals();
        fetchReferralBalance();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="referral-list">
            <div className='flex justify-center items-center'>
                {/* Summary Section */}
                <div className="mb-4 p-4 w-[95%] mt-6 flex justify-between bg-gray-100 border border-gray-300 rounded-md">
                    <div>
                        <h3 className="text-lg flex items-center font-semibold"><MdConnectWithoutContact className='mr-1' size={25} /> Referral Summary</h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">
                                Total Reward Amount: ₹{referralBalance}
                            </p>
                        </div>

                        {/* <div className='mt-2'>
                            <div className='w-[140px] bg-green-500 px-3 py-2 text-white rounded flex justify-center items-center'>

                        <CiBank size={26} />
                        <button className='ml-2'>Withdraw</button>
                            </div>
                        </div> */}
                        
                    </div>
                    <div className='flex items-center'>
                        <button
                            onClick={updateReferralBalances}
                            className="px-4 flex items-center py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            <FiRefreshCcw className='mr-1' />
                            Update Referral Balances
                        </button>
                    </div>
                </div>
            </div>

            {/* Referral Table */}
            <div className='w-[95%] m-[auto]'>
                <h1 className='p-3 pl-1 font-[22px] font-[500]'>User Refer list</h1>
                <table className="w-[100%] m-[auto] divide-y border divide-gray-200 mb-5">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Referred User / Guest
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Reward Amount
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {referrals.length > 0 ? (
                            referrals.flatMap((referral) => {
                                const rows = [];

                                // Add rows for referred users
                                if (referral.referredUsers.length > 0) {
                                    referral.referredUsers.forEach(user => {
                                        rows.push(
                                            <tr key={`${referral._id}-${user._id}`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ₹{referral.rewardAmount ? (referral.rewardAmount * 0.05).toFixed(2) : '0'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {referral.referralUsed ? 'Completed' : 'Pending'}
                                                </td>
                                            </tr>
                                        );
                                    });
                                }

                                // Add rows for referred guests
                                if (referral.referredGuestEmails.length > 0) {
                                    referral.referredGuestEmails.forEach((email, index) => {
                                        rows.push(
                                            <tr key={`${referral._id}-guest-${index}`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {referral.referredGuestNames[index] || 'Unknown'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ₹{referral.referredRewardAmounts[index] || '0'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {referral.referralUsed ? 'Completed' : 'Pending'}
                                                </td>
                                            </tr>
                                        );
                                    });
                                }

                                return rows;
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                    No referrals found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReferralList;
