import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '@/server';
import { toast } from 'react-toastify';
import { RiCloseFill } from 'react-icons/ri';

function RequestDetail({ requestId, onClose }) {
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequestDetail = async () => {
            try {
                const response = await axios.get(`${server}/customised/request/${requestId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                setRequest(response.data.customisationRequest);
            } catch (error) {
                console.error('Error fetching request details:', error);
                toast.error('Failed to fetch request details.');
                setError(error.response?.data?.message || 'Failed to fetch request details.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequestDetail();
    }, [requestId]);

    if (loading) return <p>Loading details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-3xl shadow-lg">
                <button onClick={onClose} className="float-right text-gray-600 hover:text-gray-800">
                <RiCloseFill size={25} />
                </button>
                <h1 className='text-center text-[26px] font-[600] mb-4'>Request Details</h1>
                <h2 className="mb-2"><strong className='mr-1'>Name:</strong>{request.name}</h2>
                <p className="mb-2"><strong className='mr-1'>Email:</strong> {request.email}</p>
                <p className="mb-2"><strong className='mr-1'>Phone Number:</strong> {request.phonenumber}</p>
                <p className="mb-2"><strong className='mr-1'>Message:</strong> {request.message}</p>
                {request.images.length > 0 && (
                    <div className="images mb-4">
                        <h3 className="text-lg font-semibold mb-2">Images</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {request.images.map((img, idx) => (
                                <img key={idx} src={img} alt="Custom design" className="w-full h-auto rounded-md shadow" />
                            ))}
                        </div>
                    </div>
                )}
                <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Close
                </button>
            </div>
        </div>
    );
}

export default RequestDetail;
