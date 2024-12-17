// src/components/ReferralDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '@/server';

function ReferDetail({ referralId, onClose }) {
    const [referral, setReferral] = useState(null);
    const [loading, setLoading] = useState(true);
    const [referralBalance, setReferralBalance] = useState(0);

    useEffect(() => {
        const fetchReferralDetail = async () => {
            try {
                const response = await axios.get(`${server}/referral/referral/${referralId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                setReferral(response.data.referral);

                const balanceResponse = await axios.get(`${server}/referral/referral-balance/${response.data.referral.referrer._id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                if (balanceResponse.data && balanceResponse.data.success) {
                    setReferralBalance(balanceResponse.data.referralBalance || 0);
                } else {
                    throw new Error('Unexpected response format for balance');
                }
            } catch (error) {
                console.error('Error fetching referral details:', error);
                toast.error('Failed to fetch referral details.');
            } finally {
                setLoading(false);
            }
        };

        fetchReferralDetail();
    }, [referralId]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                    <p className="text-center text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    if (!referral) {
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                    <p className="text-center text-red-500">No referral details found.</p>
                </div>
            </div>
        );
    }

    console.log(referral, "see data")

    const totalReferredRewardsUsed = (referral.referredRewardAmounts || []).reduce((total, amount) => {
        // Convert amount to a number, or treat as 0 if it's NaN
        const numericAmount = parseFloat(amount) || 0; // or use +amount
        return total + numericAmount;
    }, 0);
// Log the total to the console
console.log('Total Referred Rewards Used:', totalReferredRewardsUsed);

// Calculate the amount actually used
        const referralUsedAmount = totalReferredRewardsUsed - referralBalance;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl relative overflow-y-scroll h-[75vh]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Referral Details</h2>
                <div className="space-y-4 ">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Referral Information</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2" style={{ gridTemplateColumns: '60% 40%' }}>
                            <div className="flex items-center">
                                <p className="font-medium text-gray-700">Referral Code:</p>
                                <p className="ml-2 text-gray-600">{referral.referralCode}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-medium text-gray-700">Referrer Name:</p>
                                <p className="ml-2 text-gray-600">{referral.referrer.name}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-medium text-gray-700">Referrer Email:</p>
                                <p className="ml-2 text-gray-600">{referral.referrer.email}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-medium text-gray-700">Created At:</p>
                                <p className="ml-2 text-gray-600">{new Date(referral.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-medium text-gray-700">Reward Amount:</p>
                                <p className="ml-2 text-gray-600">{referral.rewardAmount} INR</p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-medium text-gray-700">Referral Balance:</p>
                                <p className="ml-2 text-gray-600"><span className='text-[red] font-[500]'>{referralBalance}</span> INR</p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-medium text-gray-700">Referral Amount Used:</p>
                                <p className="ml-2 text-gray-600"> ({referralUsedAmount > 0 ? referralUsedAmount.toFixed(2) : 0} INR) </p>
                                {/* {referral.referralUsed ? 'Yes' : 'No'} */}
                            </div>
                        </div>
                    </div>
                    {/* <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Referred Users</h3>
            <p className="text-gray-600">{referral.referredUsers.length > 0 ? referral.referredUsers.map(user => user.name).join(', ') : 'None'}</p>
          </div> */}

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Referred Users</h3>
                        {referral.referredGuestEmails.length > 0 ? (
                            <div className="space-y-4">
                                {referral.referredGuestEmails.map((email, index) => (
                                    <div key={index} className="p-4 bg-white border border-gray-300 rounded-lg shadow-md flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">{referral.referredGuestNames[index]}</p>
                                            <p className="text-gray-600">{email}</p>
                                        </div>
                                        <p className="font-medium text-gray-800">₹{referral.referredRewardAmounts[index] || '0'} INR</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">None</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReferDetail;
