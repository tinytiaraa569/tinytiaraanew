import { imgdburl } from '@/server';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowGoBackFill } from 'react-icons/ri';

function ShopProductDetails({ product }) {
    const navigate = useNavigate()
    // Function to render stock table
    const renderStockTable = () => {
        return (
            <>
                {product?.Metalcolorstock && (
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Metal Color Stock</h3>
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2 text-left">Metal Color</th>
                                    <th className="border px-4 py-2 text-left">Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(product.Metalcolorstock).map(([key, value]) => (
                                    <tr key={key}>
                                        <td className="border px-4 py-2 capitalize">{key.replace('clrStock', '').replace(/([A-Z])/g, ' $1').trim()}</td>
                                        <td className="border px-4 py-2">{value !== null ? value : 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {product?.Enamelcolorstock && (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Enamel Color Stock</h3>
                        {Object.entries(product.Enamelcolorstock).map(([enamelKey, enamelValue]) => (
                            <div key={enamelKey} className="mb-4">
                                <h4 className="text-lg font-semibold mb-2 capitalize">{enamelKey.replace(/([A-Z])/g, ' $1').trim()}</h4>
                                <table className="w-full table-auto border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border px-4 py-2 text-left">Metal Color</th>
                                            <th className="border px-4 py-2 text-left">Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(enamelValue).map(([metalKey, metalStock]) => (
                                            <tr key={metalKey}>
                                                <td className="border px-4 py-2 capitalize">{metalKey.replace('clrStock', '').replace(/([A-Z])/g, ' $1').trim()}</td>
                                                <td className="border px-4 py-2">{metalStock !== null ? metalStock : 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )}
            </>
        );
    };

    console.log(product,"product image fetchibg")

    return (
        <div className="px-10 py-2 bg-white rounded-lg shadow-lg">

            <div className='flex justify-end my-3'>
                    <div 
                onClick={() => {
                    navigate("/dashboard-products");
                }} 
                className="w-[150px] flex justify-center items-center space-x-2 rounded-[8px] cursor-pointer p-2 bg-blue-200  shadow-md hover:bg-blue-300 transition duration-300"
                >
                {/* Back Icon */}
                <RiArrowGoBackFill className="text-xl text-gray-700" />

                {/* Button Text */}
                <span className="text-lg font-semibold text-gray-700">Go Back</span>
                </div>
            </div>

       

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-6 md:space-y-0">
        {/* Product Info Section */}
        <div className="w-full md:w-[70%] space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{product?.name}</h1>
            <p className="text-lg text-gray-700"><strong className="font-semibold">SKU:</strong> {product?.skuid}</p>
            <p className="text-lg text-gray-700"><strong className="font-semibold">Price:</strong> ₹{product?.discountPrice}</p>
            <p className="text-lg text-gray-700"><strong className="font-semibold">Description:</strong> {product?.description}</p>
            <p className="text-lg text-gray-700"><strong className="font-semibold">Category:</strong> {product?.category}</p>
            <p className="text-lg text-gray-700"><strong className="font-semibold">Subcategory:</strong> {product?.subcategory}</p>
        </div>

        {/* Product Image Section */}
        <div className="w-full md:w-[25%] flex justify-center md:justify-start">
            <img
            className="w-full max-w-[300px] h-[280px] rounded-lg border border-gray-200 object-contain shadow-lg"
            src={
                product?.images && product.images[1].url.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                ? product.images[1].url.replace(
                    /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                    `${imgdburl}/uploads/images`
                    )
                : `${imgdburl}${product.images && product.images[1].url}`
            }
            alt={product?.name || "Product Image"}
            />
        </div>
        </div>

           
           
 


            
            
            <p className="text-lg mb-4"><strong>Available Stock:</strong> {product?.stock || 'N/A'}</p>

            {renderStockTable()}
        </div>
    );
}

export default ShopProductDetails;
