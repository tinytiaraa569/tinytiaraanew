import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '@/server';
import { toast } from 'react-toastify';

const RateCard = () => {
    const [goldRate, setGoldRate] = useState('');
    const [diamondRate, setDiamondRate] = useState('');
    const [labourCharge, setLabourCharge] = useState('');
    const [miscellaneous, setMiscellaneous] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${server}/product/update-rate-card`, {
                goldRate,
                diamondRate,
                labourCharge,
                miscellaneous,
            });
            toast.success('Rate card updated successfully!');
            setGoldRate("")
            setDiamondRate("")
            setLabourCharge("")
            setMiscellaneous("")

        } catch (error) {
            console.error('Error updating rate card:', error);
            toast.error('Failed to update rate card.');
        }
    };

    return (
        <div className="createproduct w-[50%] mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Rate Card</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="goldRate" className="block text-sm font-medium text-gray-700">Gold Rate (per gram) x Gold Weight</label>
                    <input
                        id="goldRate"
                        type="number"
                        value={goldRate}
                        onChange={(e) => setGoldRate(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="diamondRate" className="block text-sm font-medium text-gray-700">Diamond Rate (per carat) x Diamond Weight</label>
                    <input
                        id="diamondRate"
                        type="number"
                        value={diamondRate}
                        onChange={(e) => setDiamondRate(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="labourCharge" className="block text-sm font-medium text-gray-700">Labour Charge</label>
                    <input
                        id="labourCharge"
                        type="number"
                        value={labourCharge}
                        onChange={(e) => setLabourCharge(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="ShippingCharge" className="block text-sm font-medium text-gray-700">Shipping Charge</label>
                    <input
                        id="ShippingCharge"
                        type="text"
                        value={"Free Shipping"}
                        disabled
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    />
                </div>
               
                <div>
                    <label htmlFor="miscellaneous" className="block text-sm font-medium text-gray-700">Miscellaneous</label>
                    <input
                        id="miscellaneous"
                        type="number"
                        value={miscellaneous}
                        onChange={(e) => setMiscellaneous(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="Gst Charge" className="block text-sm font-medium text-gray-700">Gst 3%</label>
                    <input
                        id="Gst Charge"
                        type="text"
                        value={"(goldCost + diamondCost + totalLabour + miscCharge) * 0.03;"}
                        disabled
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Update Rate Card
                </button>
            </form>
        </div>
    );
};

export default RateCard;



// calculation of price updation 


// const calculatePrice = () => {
//     const goldWeight = 3.28; // Example weight; you can fetch this from your product data
//     const diamondWeight = 0.01; // Example weight

//     const goldCost = goldRate * goldWeight;
//     const diamondCost = diamondRate * diamondWeight;
//     const totalLabour = parseFloat(labourCharge);
//     const miscCharge = parseFloat(miscellaneous || 0);
//     const gst = (goldCost + diamondCost + totalLabour + miscCharge) * 0.03; // 3% GST

//     const totalPrice = goldCost + diamondCost + totalLabour + gst + miscCharge;
//     return totalPrice.toFixed(2);
// };