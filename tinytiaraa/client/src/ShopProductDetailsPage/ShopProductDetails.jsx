import React from 'react';

function ShopProductDetails({ product }) {
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

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            
            <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
            <p className="text-lg mb-2"><strong>SKU:</strong> {product?.skuid}</p>
            <p className="text-lg mb-2"><strong>Price:</strong> ₹{product?.discountPrice}</p>
            <p className="text-lg mb-2"><strong>Description:</strong> {product?.description}</p>
            <p className="text-lg mb-4"><strong>Category:</strong> {product?.category}</p>
            <p className="text-lg mb-4"><strong>Available Stock:</strong> {product?.stock || 'N/A'}</p>

            {renderStockTable()}
        </div>
    );
}

export default ShopProductDetails;
