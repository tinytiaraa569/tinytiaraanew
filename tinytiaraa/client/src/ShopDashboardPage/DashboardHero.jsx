// import styles from '@/Styles/styles'
// import React, { useEffect, useState } from 'react'
// import { AiOutlineArrowRight, AiOutlineMoneyCollect } from 'react-icons/ai'
// import { Link } from 'react-router-dom'
// import { LuListOrdered } from "react-icons/lu";
// import { AiFillProduct } from "react-icons/ai";
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllOrdersOfShop } from '@/redux/actions/order';
// import { getAllProductShop } from '@/redux/actions/product';
// import { DataGrid } from '@mui/x-data-grid'


// function DashboardHero() {
//     const dispatch = useDispatch()
//     const { orders } = useSelector((state) => state.order)
//     const { seller } = useSelector((state) => state.seller)

//     const { products } = useSelector((state) => state.products)
//     const [deliveredOrder, setDeliveredOrder] = useState(null)
//     const [totalEarning, setTotalEarning] = useState(0)

//     useEffect(() => {
//         dispatch(getAllOrdersOfShop(seller._id))
//         dispatch(getAllProductShop(seller._id))

//         const orderData = orders && orders.filter((item) => item.status === "Delivered")
//         setDeliveredOrder(orderData)

//     }, [dispatch])

//     useEffect(() => {
//         if (orders) {
//             const orderData = orders.filter((item) => item.status === "Delivered")
//             setDeliveredOrder(orderData)
//         }
//     }, [orders])

//     useEffect(() => {
//         if (deliveredOrder) {
//             const total = deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0)
//             setTotalEarning(total)
//         }
//     }, [deliveredOrder])

//     const columns = [
//         { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
//         {
//             field: "status",
//             headerName: "Status",
//             minWidth: 130,
//             flex: 0.7,
//             cellClassName: (params) => {
//                 return params.value === "Delivered" ? "greenColor" : "redColor";
//             },
//         },
//         {
//             field: "itemsQty",
//             headerName: "Items Qty",
//             type: "number",
//             minWidth: 130,
//             flex: 0.7,
//         },
//         {
//             field: "total",
//             headerName: "Total",
//             type: "number",
//             minWidth: 130,
//             flex: 0.8,
//         },
//         {
//             field: "action",
//             flex: 1,
//             minWidth: 150,
//             headerName: "",
//             sortable: false,
//             renderCell: (params) => (
//                 <Link to={`/order/${params.id}`}>
//                     <div className='flex justify-end items-center'>
//                         <span className='font-Poppins mr-2'>Order Details</span>
//                         <AiOutlineArrowRight size={20} />
//                     </div>
//                 </Link>
//             ),
//         },
//     ];
//     const row = [];

//     orders && orders.forEach((item) => {
//         row.push({
//             id: item._id,
//             itemsQty: item.cart.length,
//             total: "Inr ₹" + item.totalPrice,
//             status: item.status
//         })

//     })



//     return (
//         <div className='w-full p-8 '>
//             <h3 className='text-[22px] pb-2'>Overview</h3>

//             <div className="w-full flex justify-between items-center">
//                 <div className="mb-4 w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-7">
//                     <div className="flex items-center">
//                         <AiOutlineMoneyCollect size={30} className='mr-2' fill='#00000085' />

//                         <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-[#00000085]`}>
//                             Total Earning
//                         </h3>

//                     </div>
//                     <h5 className='pt-2 pl-[36px] text-[22px] font-[500]'>
//                         ₹ {totalEarning}
//                     </h5>
//                     <Link to="">
//                         <h5 className='pt-4 pl-2 text-[#077f9c]'>View Transactions</h5>
//                     </Link>

//                 </div>

//                 <div className="mb-4 w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-7">
//                     <div className="flex items-center">
//                         <LuListOrdered size={30} className='mr-2' fill='#00000085' />

//                         <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-[#00000085]`}>
//                             All orders
//                         </h3>

//                     </div>
//                     <h5 className='pt-2 pl-[36px] text-[22px] font-[500]'>
//                         {orders && orders.length}
//                     </h5>
//                     <Link to="/dashboard-orders">
//                         <h5 className='pt-4 pl-2 text-[#077f9c]'>View Orders</h5>
//                     </Link>

//                 </div>

//                 <div className="mb-4 w-[30%] min-h-[20vh] bg-whSite shadow rounded px-2 py-7">
//                     <div className="flex items-center">
//                         <AiFillProduct size={30} className='mr-2' fill='#00000085' />

//                         <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-[#00000085]`}>
//                             All Products
//                         </h3>

//                     </div>
//                     <h5 className='pt-2 pl-[36px] text-[22px] font-[500]'>
//                         {products && products.length}
//                     </h5>
//                     <Link to="/dashboard-products">
//                         <h5 className='pt-4 pl-2 text-[#077f9c]'>View Products</h5>
//                     </Link>

//                 </div>

//             </div>

//             <h3 className='text-[22px] pb-2'>Latest Orders</h3>
//             <div className='w-full min-h-[45vh] bg-white shadow rounded'>
//                 <DataGrid
//                     rows={row}
//                     columns={columns}
//                     pageSize={10}
//                     disableSelectionOnClick
//                     autoHeight
//                 />

//             </div>

//         </div>
//     )
// }

// export default DashboardHero


import styles from '@/Styles/styles'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import { LuListOrdered } from "react-icons/lu";
import { AiFillProduct } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfShop } from '@/redux/actions/order';
import { getAllProductShop } from '@/redux/actions/product';
import { DataGrid } from '@mui/x-data-grid'
import GoogleAnalyticsGraph from '@/shopgoogleanalytics/GoogleAnalyticsGraph';
import CountryWiseData from '@/shopgoogleanalytics/CountryWiseData';
import SalesChart from '@/shopsales/Shopsalegraph';
import SearchConsoleData from '@/shopsales/SearchConsoleData';
import PerformanceDashboard from '@/shopsales/PerformanceData';
import PageViewsTable from '@/shopsales/PageViewsTable';
import LiveActiveUsers from '@/shopsales/RealTimeActiveUsers';


function DashboardHero() {
    const dispatch = useDispatch()
    const { orders } = useSelector((state) => state.order)
    const { seller } = useSelector((state) => state.seller)

    const { products } = useSelector((state) => state.products)
    const [deliveredOrder, setDeliveredOrder] = useState(null)
    const [totalEarning, setTotalEarning] = useState(0)

    useEffect(() => {
        if (seller?._id) {
            dispatch(getAllOrdersOfShop(seller._id))
            dispatch(getAllProductShop(seller._id))
        }
    }, [dispatch, seller])

    useEffect(() => {
        if (orders) {
            // Sort orders by createdAt (newest first)
            const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const orderData = sortedOrders.filter((item) => item.status === "Delivered");
            setDeliveredOrder(orderData);
        }
    }, [orders])

    useEffect(() => {
        if (deliveredOrder) {
            const total = deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0)
            setTotalEarning(total)
        }
    }, [deliveredOrder])

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.value === "Delivered" ? "greenColor" : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: "action",
            flex: 1,
            minWidth: 150,
            headerName: "",
            sortable: false,
            renderCell: (params) => (
                <Link to={`/order/${params.id}`}>
                    <div className='flex justify-end items-center'>
                        <span className='font-Poppins mr-2'>Order Details</span>
                        <AiOutlineArrowRight size={20} />
                    </div>
                </Link>
            ),
        },
    ];

    const row = [];

    // Map the sorted orders to rows
    orders && orders.slice(0, 12).forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.cart.length,
            total: "Inr ₹" + item.totalPrice,
            status: item.status
        })
    })
    const location = useLocation();

    // Get the last segment of the URL (e.g., "dashboard" or "overview")
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentPage = pathSegments[pathSegments.length - 1];

    // You can map the path segment to a more readable name
    const breadcrumbText = currentPage.charAt(0).toUpperCase() + currentPage.slice(1); // Capitalize first letter

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div className=" min-w-[82%] flex-grow px-8 py-5  bg-[#f0f8ff]"> {/* Light blue background */}
        <h2 className='text-[22px] font-[500]'>Dashboard Overview</h2>
        <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-4 mt-1">
        
            <ol className="flex space-x-2">
            <li>
                <Link href="/dashboard" className="hover:text-blue-500">Home</Link>
            </li>
            <li>&gt;</li> {/* Separator */}
            <li>
                <span className="text-gray-400">{breadcrumbText}</span> {/* Active breadcrumb */}
            </li>
            </ol>
        </nav>

    <div className="w-full flex justify-between items-center">
        {/* Total Earning Panel */}
        <div className="cursor-pointer mb-4 w-[30%] min-h-[20vh] bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 shadow-lg rounded-[10px] px-2 py-7 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center">
                <AiOutlineMoneyCollect size={30} className="mr-2 text-white" />
                <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-white`}>
                    Total Earning
                </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500] text-white">
                ₹ {totalEarning}
            </h5>
            <Link to="">
                <h5 className="pt-4 ml-2 text-[#f0f8ff] inline-block border-b border-[#f0f8ff92]">View Transactions</h5>
            </Link>
        </div>

        {/* All Orders Panel */}
        <div className="cursor-pointer mb-4 w-[30%] min-h-[20vh] bg-gradient-to-r from-green-500 via-green-400 to-green-300 shadow-lg rounded-[10px] px-2 py-7 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center">
                <LuListOrdered size={30} className="mr-2 text-white" />
                <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-white`}>
                    All Orders
                </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500] text-white">
                {orders && orders.length}
            </h5>
            <Link to="/dashboard-orders">
                <h5 className="pt-4 ml-2 text-[#f0f8ff] inline-block border-b border-[#f0f8ff92]">View Orders</h5>
            </Link>
        </div>

        {/* All Products Panel */}
        <div className="cursor-pointer mb-4 w-[30%] min-h-[20vh] bg-gradient-to-r from-violet-500 via-violet-400 to-violet-300 shadow-lg rounded-[10px] px-2 py-7 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center">
                <AiFillProduct size={30} className="mr-2 text-white" />
                <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-white`}>
                    All Products
                </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500] text-white">
                {products && products.length}
            </h5>
            <Link to="/dashboard-products">
                <h5 className="pt-4 ml-2 text-[#f0f8ff] inline-block border-b border-[#f0f8ff92]">View Products</h5>
            </Link>
        </div>
    </div>

    {/* The rest of the content remains unchanged */}
    <div className="py-2 flex justify-between ">
        <div className="w-[48%]">
            <GoogleAnalyticsGraph />
        </div>
        <div className="w-[48%]">
            <CountryWiseData />
        </div>
    </div>


     <div className='my-2'>
    <h3 className="text-[22px] pb-2">Latest Orders</h3>
    <div className="w-full min-h-[45vh] bg-white shadow !rounded-[10px]">
        <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            className='!shadow-xl !rounded-[10px]'
        />
    </div>
    </div>


    <div className="flex gap-3 space-x-4 my-5">
        <div className="w-[49%]">
            <SalesChart />
        </div>
        <div className="w-[49%] ">
            <SearchConsoleData />
        </div>
    </div>

    <div className="my-4">
        <PerformanceDashboard />
    </div>

    <div className="flex justify-between gap-5 my-5">
        <div className="w-[48%]">
            <PageViewsTable />
        </div>
        <div className="w-[48%]">
            <LiveActiveUsers />
        </div>
    </div>
</div>

    )
}

export default DashboardHero
