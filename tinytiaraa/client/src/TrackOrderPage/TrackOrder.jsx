import { getAllOrdersOfUser } from '@/redux/actions/order';
import { imgdburl, server } from '@/server';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaShippingFast, FaBoxOpen, FaTruck, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons

function TrackOrder() {
    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { id } = useParams();

    const [trackingStatus, setTrackingStatus] = useState(null);

    // Function to fetch live tracking updates
    const fetchTrackingUpdates = async (docketNumber) => {
        try {
            const response = await axios.post(`${server}/track`, { docket: docketNumber });
            setTrackingStatus(response.data);
            localStorage.setItem('trackingStatus', JSON.stringify(response.data));
        } catch (error) {
            console.error("Error fetching tracking updates:", error);
        }
    };

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user.email));

        const cachedData = localStorage.getItem('trackingStatus');
        if (cachedData) {
            setTrackingStatus(JSON.parse(cachedData));
        }

        const intervalId = setInterval(() => {
            if (data && data.docketno) {
                fetchTrackingUpdates(data.docketno); // Fetch updates only if docketNumber exists
            }
        }, 30000);

        return () => clearInterval(intervalId);
    }, [dispatch, user._id]);

    const data = orders?.find((item) => item._id === id);

    console.log(trackingStatus, "see tracking details");
    console.log(data, "data of web");

    const metalColors = {
        0: "Yellow Gold",
        1: "Rose Gold",
        2: "White Gold",
    };

    const latestTrackingUpdate = trackingStatus?.data?.tracking?.slice(-1)[0];

    return (
        <div className='w-full min-h-screen bg-gray-50 py-10'>
            <div className='container mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200'>
                <h1 className='text-3xl font-semibold mb-6 text-center text-gray-800'>Track Your Order</h1>

                {/* Display Order Info */}
                {data && (
                    <div className='mb-8'>
                        <h2 className='text-2xl font-bold text-gray-700 mb-4'>Order Summary</h2>
                        <div className='mb-4 bg-gray-100 p-4 rounded-md shadow-sm'>
                            <p className='text-lg mb-2'>
                                <strong className='text-gray-900'>Order ID:</strong> {data._id}
                            </p>
                            <p className='text-lg mb-2'>
                                <strong className='text-gray-900'>Status:</strong> <span className={`font-bold ${data.status === "Delivered" ? "text-green-600" : "text-yellow-600"}`}>{data.status}</span>
                            </p>
                            <p className='text-lg mb-2'>
                                <strong className='text-gray-900'>Total Price:</strong> ₹{data.totalPrice}
                            </p>

                            {/* Ordered Items */}
                            <div className='mt-4'>
                                <h3 className='text-xl font-semibold mb-3 text-gray-700'>Ordered Items</h3>
                                <ul className='divide-y divide-gray-200'>
                                    {data.cart.map((item, index) => (
                                        <li key={index} className='py-4 flex items-start'>
                                            <img className='w-32 h-32 rounded-md object-cover border border-gray-300 shadow-sm'
                                            //  src={item.images[0]?.url}
                                            src={
                                                item.images && item.images[0]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                                    ? item.images[0].url.replace(
                                                        /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                                        `${imgdburl}/uploads/images`
                                                    )
                                                    : `${imgdburl}${item.images[0]?.url}` // Prepend imgdburl if not a Cloudinary URL
                                            }
                                              alt={item.name} />
                                            <div className='ml-6 flex-1'>
                                                <p className='text-lg font-semibold text-gray-800'>{item.name}</p>
                                                <p className="text-gray-500 text-sm">{item.skuid}</p>
                                                <p className='text-gray-600 text-sm'>Quantity: {item.qty}</p>
                                                <p className='text-gray-500 text-sm line-through'>₹{item.chainPrice > 0 ? item.originalPrice + item.chainPrice : item.originalPrice}</p>
                                                <p className='text-gray-900 text-sm font-medium'>₹{item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice}</p>
                                                
                                                <div className='mt-2'>
                                                    {item.showWithChain && item.selectedChainSize && (
                                                        <p className='text-sm text-gray-700'>
                                                            <span className='font-semibold'>Chain:</span> With Chain ({item.selectedChainSize})
                                                        </p>
                                                    )}
                                                    {!item.showWithChain && (
                                                        <p className='text-sm text-gray-700'>
                                                            <span className='font-semibold'>Chain:</span> Without Chain
                                                        </p>
                                                    )}
                                                </div>

                                                <div className='mt-2'>
                                                    {item?.selectedColor !== null && (
                                                        <p className="text-sm text-gray-700">
                                                            <span className="font-semibold">Metal Color:</span> {metalColors[item.selectedColor]}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className='mt-2'>
                                                    {item?.selectedEnamelColor && (
                                                        <p className="text-sm text-gray-700">
                                                            <span className="font-semibold">Enamel Color:</span> {item.selectedEnamelColor}
                                                        </p>
                                                    )}
                                                </div>

                                                {data?.couponDiscount !== null && data?.couponDiscount > 0 && (
                                                    <div className="mt-4">
                                                        <p className="text-sm text-gray-700">
                                                            <span className='font-semibold'>Coupon Discount:</span> -₹{data.couponDiscount}
                                                        </p>
                                                    </div>
                                                )}

                                                <p className='mt-2 text-lg font-semibold'>Total: ₹{data?.totalPrice}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Live Tracking Status */}
                {data?.docketno ? (
                    trackingStatus?.data ? (
                        <div className='tracking-info mt-8'>
                            <h2 className='text-2xl font-bold mb-4 text-gray-700'>Tracking Details</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='flex items-center'>
                                    <FaShippingFast className='text-blue-500 mr-3' size={24} />
                                    <p className='text-lg'>
                                        <strong>Docket No:</strong> {trackingStatus.data.docket_no}
                                    </p>
                                </div>
                                <div className='flex items-center'>
                                    <FaBoxOpen className='text-green-500 mr-3' size={24} />
                                    <p className='text-lg'>
                                        <strong>Current Status:</strong>{' '}
                                        
                                        {latestTrackingUpdate?.description || 'No updates available'}
                                    </p>
                                </div>
                                <div className='flex items-center'>
                                    <FaTruck className='text-yellow-500 mr-3' size={24} />
                                    <p className='text-lg'>
                                        <strong>Estimated Delivery:</strong> {trackingStatus.data.estimated_delivery}
                                    </p>
                                </div>
                                <div className='flex items-center'>
                                    <FaMapMarkerAlt className='text-red-500 mr-3' size={24} />
                                    <p className='text-lg'>
                                        <strong>Pickup Date:</strong> {trackingStatus.data.requested_pickup_date}
                                    </p>
                                </div>
                            </div>

                            {/* Live Tracking Progress */}
                            <div className='mt-6'>
                                <h3 className='text-xl font-semibold mb-2 text-gray-700'>Shipment Progress</h3>
                                <ul className='space-y-4'>
                                    {trackingStatus.data.tracking && trackingStatus.data.tracking.length > 0 ? (
                                        trackingStatus.data.tracking.map((event, index) => (
                                            <li key={index} className='border-l-4 pl-4 border-blue-500'>
                                                <p className='text-lg'>{event.description}</p>
                                                <p className='text-sm text-gray-600'>
                                                    {event.date_time}
                                                </p>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No tracking updates available yet.</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className='text-center'>
                            <p className='text-lg text-gray-700'>Fetching live tracking updates...</p>
                        </div>
                    )
                ) : (
                    <div className='text-center'>
                        <p className='text-lg text-gray-700'>Your product is not shipped yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TrackOrder
