import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductShop } from '../redux/actions/product'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { DataGrid } from '@mui/x-data-grid'
import { deleteEvent, getAllEventsShop } from '@/redux/actions/event'
import styles from '@/Styles/styles'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios'
import { server } from '@/server'
import { toast } from 'react-toastify'


function AllCoupoun() {

    const { seller } = useSelector((state) => state.seller)
    const { products } = useSelector((state) => state.products)

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [coupons, setCoupons] = useState([])


    const [name, setName] = useState("")
    const [value, setValue] = useState(null)
    const [percentageDiscount, setPercentageDiscount] = useState(null);
    const [minAmount, setMinAmount] = useState(null)
    const [maxAmount, setMaxAmount] = useState(null)
    const [selectedProducts, setSelectedProducts] = useState(null)





    useEffect(() => {
        setIsLoading(true)
        axios.get(`${server}/coupon/get-coupon/${seller._id}`, {
            withCredentials: true
        }).then((res) => {
            console.log(res)
            setIsLoading(false)
            setCoupons(res.data.couponCodes);
        }).catch((error) => {
            setIsLoading(false)

        })
    }, [dispatch]);








    const handleDelete = async (id) => {
        axios.delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true }).then((res) => {
            toast.success("Coupon code deleted succesfully!")
        })
        window.location.reload();
    };


    useEffect(() => {
        dispatch(getAllProductShop(seller._id));
    }, [dispatch, seller._id]);

    // console.log(products)

    const columns = [
        { field: 'id', headerName: 'Coupon Id', minWidth: 150, flex: 0.7 },

        { field: 'name', headerName: 'Name', minWidth: 110, flex: 1.4 },
        { field: 'price', headerName: 'Price Off', minWidth: 80, flex: 0.6 },


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

    const rows = coupons && coupons.map((item) => ({
        id: item._id,
        name: item.name,
        price: item.value !== null && item.value !== undefined ? `Rs ${item.value}` : `${item.percentageDiscount}%`


    }));


    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`${server}/coupon/create-coupon-code`, {
            name,
            minAmount,
            maxAmount,
            selectedProducts,
            value,
            percentageDiscount,
            shop: seller,
        }, { withCredentials: true }).then((res) => {
            toast.success("CouponCode Created Successfully!")
            setOpen(false)
            window.location.reload();
        }).catch((error) => {
            toast.error(error.response.data.message)


        })
    }

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
                <div className="min-w-[82%]  flex-grow px-10 pt-1 mt-10 bg-white">
                    <div className='flex justify-between'>
                        <div className='w-full'>


                      <h2 className='text-[22px] font-[500]'>All Coupoun</h2>
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
                    

                    <div className="w-full flex justify-end mb-3">
                        <div className={`${styles.button} !w-max !h-[40px] px-3 !rounded-[5px] mr-3`} onClick={() => setOpen(true)}>
                            <span className='text-white'>Create Coupoun Code</span>

                        </div>
                    </div>
                    </div>
                     {/* Wrapper for responsive DataGrid */}
                    <div className="w-full overflow-x-auto">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            autoHeight
                        />
                    </div>
                    {
                        open && (
                            <div className="fixed top-0 left-0 w-full h-screen bg-[#0000006c] z-[1000] flex justify-center items-center">

                                <div className="w-[50%] mt-[100px]  bg-white rounded-md shadow pb-5 ">
                                    <div className="w-full p-4 flex justify-end">
                                        <RxCross2 size={30} className='cursor-pointer' onClick={() => setOpen(false)} />

                                    </div>

                                    <h5 className='text-[26px] font-Poppins text-center'>Create Coupon Code</h5>


                                    {/* create coupon code  */}


                                    <form action="" onSubmit={handleSubmit} className='px-8'>


                                        <div className='font-Poppins mt-4'>
                                            <label htmlFor="" className='pb-2'>Name <span className='text-red-500'>*</span></label>
                                            <input
                                                type="text"
                                                name='name'
                                                placeholder='Enter Your Coupon Code Name'
                                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                                value={name}
                                                onChange={(e) => { setName(e.target.value) }} />
                                        </div>

                                        <div className='font-Poppins mt-4'>
                                            <label htmlFor="" className='pb-2'>Discount Value <span className='text-red-500'>*</span></label>
                                            <input
                                                type="number"
                                                name='value'
                                                placeholder='Enter Discount Value'
                                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                            />
                                        </div>
                                        <div className='font-Poppins mt-4'>
                                            <label htmlFor="" className='pb-2'>Percentage Discount <span className='text-red-500'>*</span></label>
                                            <input
                                                type="number"
                                                name='percentageDiscount'
                                                placeholder='Enter Percentage Discount'
                                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                                value={percentageDiscount}
                                                onChange={(e) => setPercentageDiscount(e.target.value)}
                                            />
                                        </div>

                                        <div className='font-Poppins mt-4'>
                                            <label htmlFor="" className='pb-2'>Min Amount Order <span className='text-red-500'>(optional)</span></label>
                                            <input
                                                type="number"
                                                name='name'
                                                placeholder='Enter Your Coupon Code Min amount'
                                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                                value={minAmount}
                                                onChange={(e) => { setMinAmount(e.target.value) }} />
                                        </div>

                                        <div className='font-Poppins mt-4'>
                                            <label htmlFor="" className='pb-2'>Min Amount Order <span className='text-red-500'>(optional)</span></label>
                                            <input
                                                type="number"
                                                name='name'
                                                placeholder='Enter Your Coupon Code Max amount'
                                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                                value={maxAmount}
                                                onChange={(e) => { setMaxAmount(e.target.value) }} />
                                        </div>


                                        <div className='font-Poppins mt-4'>
                                            <label htmlFor='slcategory' className='pb-2'>selected Product <span className='text-red-500'>(optional)</span></label>
                                            <select
                                                id='slcategory'
                                                className='w-full mt-1 border h-[35px] rounded-[5px]'
                                                value={selectedProducts}
                                                onChange={(e) => setSelectedProducts(e.target.value)}
                                            >
                                                <option value=''>Choose a Selected product</option>
                                                {products && products.map((cat) => (
                                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className='font-Poppins mt-7'>
                                            <input
                                                type="submit"
                                                name='name'
                                                placeholder='Enter Your Coupon Code Min amount'
                                                className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                                value="Create"
                                            />
                                        </div>


                                    </form>


                                </div>

                            </div>
                        )
                    }
                </div>
            )}
        </>
    )
}

export default AllCoupoun

