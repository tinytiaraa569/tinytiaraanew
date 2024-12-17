import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReferralList from './ReferralList';

const ReferralComponent = () => {
    const [referralCode, setReferralCode] = useState('');
    const [referralLink, setReferralLink] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Retrieve the referral code and link from localStorage if they exist
        const storedReferralCode = localStorage.getItem('referralCode');
        const storedReferralLink = localStorage.getItem('referralLink');

        if (storedReferralCode && storedReferralLink) {
            console.log("validating")
        } else {
            fetchUserReferralCode();
        }
    }, []);

    const fetchUserReferralCode = async () => {
        try {
            const response = await axios.get(
                'https://backend.tinytiaraa.com:8000/api/v2/referral/user-referral-code',
                { withCredentials: true }
            );
            const { referralCode } = response.data;

            if (referralCode) {
                const newReferralLink = `https://www.tinytiaraa.com/?referral=${referralCode}`;

                // Save to localStorage
                localStorage.setItem('referralCode', referralCode);
                localStorage.setItem('referralLink', newReferralLink);

                // Update the state
                setReferralCode(referralCode);
                setReferralLink(newReferralLink);
            }
        } catch (error) {
            console.error('Error fetching user referral code:', error);
        }
    };

    

    useEffect(() => {
        // Retrieve the referral code and link from localStorage if they exist
        const storedReferralCode = localStorage.getItem('referralCode');
        const storedReferralLink = localStorage.getItem('referralLink');

        if (storedReferralCode && storedReferralLink) {
            // Validate the referral code
            const validateReferralCode = async () => {
                try {
                    const response = await axios.post('https://backend.tinytiaraa.com:8000/api/v2/referral/validate-referral-code', { referralCode: storedReferralCode });
                    console.log('Validation Response:', response.data);
                    if (response.data.success) {
                        setReferralCode(storedReferralCode);
                        setReferralLink(storedReferralLink);
                    } else {
                        // Remove invalid referral code from localStorage
                        localStorage.removeItem('referralCode');
                        localStorage.removeItem('referralLink');
                    }
                } catch (error) {
                    console.error('Error validating referral code:', error);
                    localStorage.removeItem('referralCode');
                    localStorage.removeItem('referralLink');
                }
            };

            validateReferralCode();
        }
    }, []);

    const generateReferralCode = async () => {
        setIsGenerating(true);
        setError('');
        try {
            const response = await axios.post('https://backend.tinytiaraa.com:8000/api/v2/referral/generate-referral-code', {}, { withCredentials: true });
            const { referralCode } = response.data;

            // Generate the referral link
            const newReferralLink = `https://www.tinytiaraa.com/?referral=${referralCode}`;

            // Save to localStorage
            localStorage.setItem('referralCode', referralCode);
            localStorage.setItem('referralLink', newReferralLink);

            // Update the state
            setReferralCode(referralCode);
            setReferralLink(newReferralLink);
        } catch (error) {
            setError('Your Refer Code is Already Generated');
            console.error('Error generating referral code:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }, (err) => {
            console.error('Failed to copy:', err);
        });
    };

    return (
        <>

            <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-4 space-y-4 mb-5">
                <h2 className="text-2xl font-bold text-center">Referral Program</h2>
                <button
                    onClick={generateReferralCode}
                    disabled={isGenerating}
                    className={`w-full py-2 px-4 text-white rounded-md ${isGenerating ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    {isGenerating ? 'Generating...' : 'Generate Referral Code'}
                </button>
                {error && (
                    <div className="text-red-500 text-center">
                        {error}
                    </div>
                )}
                {referralCode && (
                    <div className="space-y-4">
                        <div className="bg-gray-100 p-4 rounded-md">
                            <h3 className="text-lg font-semibold">Your Referral Code:</h3>
                            <p className="text-xl font-bold text-blue-600">{referralCode}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-md">
                            <p className="text-lg font-semibold">Share this link with your friends:</p>
                            <input
                                type="text"
                                value={referralLink}
                                readOnly
                                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                            />
                            <button
                                onClick={() => copyToClipboard(referralLink)}
                                className="mt-2 w-full py-2 px-4 text-white bg-green-500 rounded-md hover:bg-green-600"
                            >
                                Copy Link
                            </button>
                        </div>
                    </div>
                )}
            </div>


            <ReferralList />


        </>
    );
};

export default ReferralComponent;
