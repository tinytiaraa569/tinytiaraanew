
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductShop } from '../redux/actions/product'
import { AiOutlineArrowRight, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { DataGrid } from '@mui/x-data-grid'
import { getAllEventsShop } from '@/redux/actions/event'
import { getAllOrdersOfShop } from '@/redux/actions/order'

function AllRefundOrders() {
    const { seller } = useSelector((state) => state.seller)
    
    const { orders, isLoading } = useSelector((state) => state.order)

    
    const dispatch = useDispatch()



    // const handleDelete = (id) =>{
    //     // console.log(id)
    //     dispatch(deleteProduct(id))
    //     window.location.reload()
    // }

    const refundOrders = orders && orders.filter((item)=> item.status === "Processing Refund" ||  item.status === "refund Success" )

    

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id));
    }, [dispatch]);


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
                        <span className='font-Poppins'>Order Details</span>
                        <AiOutlineArrowRight size={20} />
                    </div>
                </Link>
            ),
        },
    ];
    const row = [];

    refundOrders && refundOrders.forEach((item) => {
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
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="min-w-[82%]  flex-grow px-8 pt-1 mt-10 bg-white">
                     <h2 className='text-[22px] font-[500]'>All Refunds</h2>
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
                    <DataGrid
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
            )}
        </>
    )
}

export default AllRefundOrders

