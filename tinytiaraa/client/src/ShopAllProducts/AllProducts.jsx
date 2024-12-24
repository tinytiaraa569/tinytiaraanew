import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProductShop } from '../redux/actions/product';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineWarning } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx'; // Import XLSX library
import { FaFileExcel } from 'react-icons/fa';


function AllProducts() {
    const { seller } = useSelector((state) => state.seller);
    const { products = [], isLoading } = useSelector((state) => state.products);
    console.log(products,"al products data ")

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
        window.location.reload();
    };

    const handleEdit = (id) => {
        navigate(`/editproduct/${id}`);
    };

    useEffect(() => {
        dispatch(getAllProductShop(seller._id));
    }, [dispatch]);

    useEffect(() => {
        setFilteredProducts(
            products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.skuid.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [products, searchQuery]);

    const checkLowStock = (item) => {
        let isLowStock = false;

        // Check Metalcolorstock
        if (item.Metalcolorstock) {
            for (let key in item.Metalcolorstock) {
                if (item.Metalcolorstock[key] !== null && item.Metalcolorstock[key] <= 1) {
                    isLowStock = true;
                    break;
                }
            }
        }

        // Check Enamelcolorstock if Metalcolorstock didn't trigger low stock
        if (!isLowStock && item.Enamelcolorstock) {
            for (let enamelKey in item.Enamelcolorstock) {
                const enamelStock = item.Enamelcolorstock[enamelKey];
                for (let key in enamelStock) {
                    if (enamelStock[key] !== null && enamelStock[key] <= 1) {
                        isLowStock = true;
                        break;
                    }
                }
                if (isLowStock) break;
            }
        }

        // Check the general stock if neither Metalcolorstock nor Enamelcolorstock triggered low stock
        if (!isLowStock && item.stock !== null && item.stock <= 1) {
            isLowStock = true;
        }

        return isLowStock;
    };

    const rows = filteredProducts?.map((item) => {
        return {
            id: item._id,
            skuid: item.skuid,
            name: item.name,
            price: `₹ ${item.discountPrice}`,
            Stock: item.stock !== null ? item.stock : 'M/E',
            sold: item?.sold_out, // Replace with actual sold count if available
            isLowStock: checkLowStock(item),
        };
    });

    const columns = [
        { field: 'id', headerName: 'Product Id', minWidth: 150, flex: 0.7 },
        { field: 'skuid', headerName: 'Sku Id', minWidth: 150, flex: 0.7 },
        { field: 'name', headerName: 'Name', minWidth: 180, flex: 1.4 },
        { field: 'sold', headerName: 'Sold out', type: 'number', minWidth: 130, flex: 0.6 },
        { field: 'price', headerName: 'Price', minWidth: 100, flex: 0.6 },
        { field: 'Stock', headerName: 'Stock', type: 'number', minWidth: 80, flex: 0.5 },

        {
            field: 'LowStock',
            headerName: 'Low Stock',
            flex: 0.8,
            minWidth: 120,
            sortable: false,
            renderCell: (params) => (
                params.row.isLowStock ? <AiOutlineWarning size={20} color="red" /> : null
            ),
        },
        {
            field: 'Preview',
            headerName: 'Preview',
            flex: 0.8,
            minWidth: 100,
            sortable: false,
            renderCell: (params) => (
                <Link to={`/shopproduct/${params.row.id}`}>
                    <button>
                        <AiOutlineEye size={20} />
                    </button>
                </Link>
            ),
        },
        {
            field: 'Edit',
            headerName: 'Edit',
            flex: 0.8,
            minWidth: 100,
            sortable: false,
            renderCell: (params) => (
                <button onClick={() => handleEdit(params.id)}>
                    <AiOutlineEdit size={20} />
                </button>
            ),
        },
        {
            field: 'Delete',
            headerName: 'Delete',
            flex: 0.8,
            minWidth: 120,
            sortable: false,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.id)}>
                    <AiOutlineDelete size={20} />
                </button>
            ),
        },
    ];

  

const handleExportToExcel = (productsdata) => {

   
    // Transform the product data into an array of objects for the Excel sheet
    const excelData = productsdata.map((product) => ({
        ID: product._id || "-",
        SKU: product.skuid || "-",
        Name: product.name || "-",
        OriginalPrice: product.originalPrice || "-",
        Price: product.discountPrice || "-",
        Stock: product.stock || "-",
        Sold_Out: product.sold_out || "-",
        Category: product.category || "-",
        Subcategory: product.subcategory || "-",
        Description: product.description || "-",

        // Metl colr 
        YellowGold_MetalColor: 
        (product.MetalColor?.YellowGoldclr?.length > 0 ? "✓" : "-"),
    
        RoseGold_MetalColor: 
        (product.MetalColor?.RoseGoldclr?.length > 0 ? "✓" : "-"),
            
        WhiteGold_MetalColor: 
        (product.MetalColor?.WhiteGoldclr?.length > 0 ? "✓" : "-"),

        // Nested MetalColorStock
        Stock_YellowGoldStock_MetalColor: product.Metalcolorstock?.YellowGoldclrStock || "-",
        Stock_RoseGoldStock_MetalColor: product.Metalcolorstock?.RoseGoldclrStock || "-",
        Stock_WhiteGoldStock_MetalColor: product.Metalcolorstock?.WhiteGoldclrStock || "-",

        // ENamel color 
        Black_EnamelColor: 
        (product.enamelColors?.Black?.blackYellowGoldclr?.length > 0 ? "YG" : "") +
        (product.enamelColors?.Black?.blackYellowGoldclr?.length > 0 && product.enamelColors?.Black?.blackRoseGoldclr?.length > 0 ? "+" : "") +
        (product.enamelColors?.Black?.blackRoseGoldclr?.length > 0 ? "RG" : "") +
        (product.enamelColors?.Black?.blackRoseGoldclr?.length > 0 && product.enamelColors?.Black?.blackWhiteGoldclr?.length > 0 ? "+" : "") +
        (product.enamelColors?.Black?.blackWhiteGoldclr?.length > 0 ? "WG" : "") ||
        "-",
    
        DeepBlue_EnamelColor: 
        (product.enamelColors?.Deep_Blue?.deepblueYellowGoldclr?.length > 0 ? "YG" : "") +
        (product.enamelColors?.Deep_Blue?.deepblueYellowGoldclr?.length > 0 && product.enamelColors?.Deep_Blue?.deepblueRoseGoldclr?.length > 0 ? "+" : "") +
        (product.enamelColors?.Deep_Blue?.deepblueRoseGoldclr?.length > 0 ? "RG" : "") +
        (product.enamelColors?.Deep_Blue?.deepblueRoseGoldclr?.length > 0 && product.enamelColors?.Deep_Blue?.deepblueWhiteGoldclr?.length > 0 ? "+" : "") +
        (product.enamelColors?.Deep_Blue?.deepblueWhiteGoldclr?.length > 0 ? "WG" : "") || 
        "-",
    
        DeepGreen_EnamelColor: 
        (product.enamelColors?.Deep_Green?.deepgreenYellowGoldclr?.length > 0 ? "YG" : "") +
        (product.enamelColors?.Deep_Green?.deepgreenYellowGoldclr?.length > 0 && product.enamelColors?.Deep_Green?.deepgreenRoseGoldclr?.length > 0 ? "+" : "") +
        (product.enamelColors?.Deep_Green?.deepgreenRoseGoldclr?.length > 0 ? "RG" : "") +
        (product.enamelColors?.Deep_Green?.deepgreenRoseGoldclr?.length > 0 && product.enamelColors?.Deep_Green?.deepgreenWhiteGoldclr?.length > 0 ? "+" : "") +
        (product.enamelColors?.Deep_Green?.deepgreenWhiteGoldclr?.length > 0 ? "WG" : "") || 
        "-",
    
        LotusGreen_EnamelColor: 
        (product.enamelColors?.Lotus_Green?.lotusgreenYellowGoldclr?.length > 0 ? "YG" : "") +
        (product.enamelColors?.Lotus_Green?.lotusgreenYellowGoldclr?.length > 0 && product.enamelColors?.Lotus_Green?.lotusgreenRoseGoldclr?.length > 0 ? "+" : "") +
        (product.enamelColors?.Lotus_Green?.lotusgreenRoseGoldclr?.length > 0 ? "RG" : "") +
        (product.enamelColors?.Lotus_Green?.lotusgreenRoseGoldclr?.length > 0 && product.enamelColors?.Lotus_Green?.lotusgreenWhiteGoldclr?.length > 0 ? "+" : "") +
        (product.enamelColors?.Lotus_Green?.lotusgreenWhiteGoldclr?.length > 0 ? "WG" : "") || 
        "-",
    
        Pink_EnamelColor: 
        (product.enamelColors?.Pink?.pinkYellowGoldclr?.length > 0 ? "YG" : "") +
        (product.enamelColors?.Pink?.pinkYellowGoldclr?.length > 0 && product.enamelColors?.Pink?.pinkRoseGoldclr?.length > 0 ? "+" : "") +
        (product.enamelColors?.Pink?.pinkRoseGoldclr?.length > 0 ? "RG" : "") +
        (product.enamelColors?.Pink?.pinkRoseGoldclr?.length > 0 && product.enamelColors?.Pink?.pinkWhiteGoldclr?.length > 0 ? "+" : "") +
        (product.enamelColors?.Pink?.pinkWhiteGoldclr?.length > 0 ? "WG" : "") || 
        "-",
    
        Red_EnamelColor: 
        (product.enamelColors?.Red?.redYellowGoldclr?.length > 0 ? "YG" : "") +
        (product.enamelColors?.Red?.redYellowGoldclr?.length > 0 && product.enamelColors?.Red?.redRoseGoldclr?.length > 0 ? "+" : "") +
        (product.enamelColors?.Red?.redRoseGoldclr?.length > 0 ? "RG" : "") +
        (product.enamelColors?.Red?.redRoseGoldclr?.length > 0 && product.enamelColors?.Red?.redWhiteGoldclr?.length > 0 ? "+" : "") +
        (product.enamelColors?.Red?.redWhiteGoldclr?.length > 0 ? "WG" : "") || 
        "-",
    
        Turquoise_EnamelColor: 
        (product.enamelColors?.Turquoise?.turquoiseYellowGoldclr?.length > 0 ? "YG" : "") +
        (product.enamelColors?.Turquoise?.turquoiseYellowGoldclr?.length > 0 && product.enamelColors?.Turquoise?.turquoiseRoseGoldclr?.length > 0 ? "+" : "") +
        (product.enamelColors?.Turquoise?.turquoiseRoseGoldclr?.length > 0 ? "RG" : "") +
        (product.enamelColors?.Turquoise?.turquoiseRoseGoldclr?.length > 0 && product.enamelColors?.Turquoise?.turquoiseWhiteGoldclr?.length > 0 ? "+" : "") +
        (product.enamelColors?.Turquoise?.turquoiseWhiteGoldclr?.length > 0 ? "WG" : "") || 
        "-",

        // Nested EnamelColorStock
        Stock_Black_YellowGold_EnamelColor: product.Enamelcolorstock?.black?.blackYellowGoldclrStock || "-",
        Stock_Black_RoseGold_EnamelColor: product.Enamelcolorstock?.black?.blackRoseGoldclrStock || "-",
        Stock_Black_WhiteGold_EnamelColor: product.Enamelcolorstock?.black?.blackWhiteGoldclrStock || "-",
        Stock_DeepBlue_YellowGold_EnamelColor: product.Enamelcolorstock?.deepblue?.deepblueYellowGoldclrStock || "-",
        Stock_DeepBlue_RoseGold_EnamelColor: product.Enamelcolorstock?.deepblue?.deepblueRoseGoldclrStock || "-",
        Stock_DeepBlue_WhiteGold_EnamelColor: product.Enamelcolorstock?.deepblue?.deepblueWhiteGoldclrStock || "-",
        Stock_DeepGreen_YellowGold_EnamelColor: product.Enamelcolorstock?.deepgreen?.deepgreenYellowGoldclrStock || "-",
        Stock_DeepGreen_RoseGold_EnamelColor: product.Enamelcolorstock?.deepgreen?.deepgreenRoseGoldclrStock || "-",
        Stock_DeepGreen_WhiteGold_EnamelColor: product.Enamelcolorstock?.deepgreen?.deepgreenWhiteGoldclrStock || "-",
        Stock_LotusGreen_YellowGold_EnamelColor: product.Enamelcolorstock?.lotusgreen?.lotusgreenYellowGoldclrStock || "-",
        Stock_LotusGreen_RoseGold_EnamelColor: product.Enamelcolorstock?.lotusgreen?.lotusgreenRoseGoldclrStock || "-",
        Stock_LotusGreen_WhiteGold_EnamelColor: product.Enamelcolorstock?.lotusgreen?.lotusgreenWhiteGoldclrStock || "-",
        Stock_Pink_YellowGold_EnamelColor: product.Enamelcolorstock?.pink?.pinkYellowGoldclrStock || "-",
        Stock_Pink_RoseGold_EnamelColor: product.Enamelcolorstock?.pink?.pinkRoseGoldclrStock || "-",
        Stock_Pink_WhiteGold_EnamelColor: product.Enamelcolorstock?.pink?.pinkWhiteGoldclrStock || "-",
        Stock_Red_YellowGold_EnamelColor: product.Enamelcolorstock?.red?.redYellowGoldclrStock || "-",
        Stock_Red_RoseGold_EnamelColor: product.Enamelcolorstock?.red?.redRoseGoldclrStock || "-",
        Stock_Red_WhiteGold_EnamelColor: product.Enamelcolorstock?.red?.redWhiteGoldclrStock || "-",
        Stock_Turquoise_YellowGold_EnamelColor: product.Enamelcolorstock?.turquoise?.turquoiseYellowGoldclrStock || "-",
        Stock_Turquoise_RoseGold_EnamelColor: product.Enamelcolorstock?.turquoise?.turquoiseRoseGoldclrStock || "-",
        Stock_Turquoise_WhiteGold_EnamelColor: product.Enamelcolorstock?.turquoise?.turquoiseWhiteGoldclrStock || "-",
        // Additional Data
        AgeGroup_Infants: product.ageGroup?.infants ? "Yes" : "No",
        AgeGroup_Kids: product.ageGroup?.kids ? "Yes" : "No",
        AgeGroup_Mom: product.ageGroup?.mom ? "Yes" : "No",
        AgeGroup_Teens: product.ageGroup?.teens ? "Yes" : "No",
        Gender_Girl: product.gender?.girl ? "Yes" : "No",
        Gender_Boy: product.gender?.boy ? "Yes" : "No",
        Gender_Unisex: product.gender?.unisex ? "Yes" : "No",
        DiamondWeight: product.diamondWeight?.weight || "-",
        DiamondQuality: product.diamondWeight?.quality || "-",
        GoldWeight: product.goldWeight?.weight || "-",
        GoldPurity: product.goldWeight?.purity || "-",
        Dimension_Height: product.dimension?.height || "-",
        Dimension_Width: product.dimension?.width || "-",
        Tags: product.tags || "-",
        Designno:product.designno || "-",



        CreatedAt: product.CreatedAt || "-",
       

    }));

    // Create a worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Define frozen pane by freezing the first row (header row)
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Generate the Excel file and trigger download
    XLSX.writeFile(workbook, "Products.xlsx");
};

    const location = useLocation();

    // Get the last segment of the URL (e.g., "dashboard" or "overview")
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentPage = pathSegments[pathSegments.length - 1];

    // You can map the path segment to a more readable name
    const breadcrumbText = currentPage.charAt(0).toUpperCase() + currentPage.slice(1); // Capitalize first letter


    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="min-w-[82%]  flex-grow px-8 pt-1 mt-6 bg-white">

                    <div className='mb-4'>
                        <h2 className='text-[22px] font-[500]'>All Products</h2>
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
                    <div className="w-full flex items-center justify-between">
                        <div className="mb-4 w-[25%]">
                            <input
                                type="text"
                                placeholder="Search by SKU ID or Name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="p-2 w-[100%] border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                        <button
                            onClick={() => { handleExportToExcel(products) }}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            <FaFileExcel className="h-5 w-5 mr-2" />
                            Export to Excel
                        </button>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700">
                            <h3 className="text-lg font-semibold">Total Products:</h3>
                            <span className="text-sm font-bold text-blue-600">{products?.length}</span>
                            <span className="text-sm text-gray-600 !ml-1">products</span>
                        </div>
                    </div>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
            )}
        </>
    );
}

export default AllProducts;
