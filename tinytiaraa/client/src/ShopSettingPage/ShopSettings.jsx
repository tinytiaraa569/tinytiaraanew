import { loadSeller } from '@/redux/actions/user'
import { server } from '@/server'
import styles from '@/Styles/styles'
import axios from 'axios'
import React, { useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { MdArrowBack } from "react-icons/md";
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'

function ShopSettings() {
    const { seller } = useSelector((state) => state.seller)
    const [name, setName] = useState(seller && seller.name)
    const [email, setEmail] = useState(seller && seller.email)
    const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber)
    const dispatch = useDispatch()

    // const handleImage = 
    const updateHandler = async (e) => {
        e.preventDefault()

        await axios.put(`${server}/shop/update-seller-info`, {
            name,
            email,
            phoneNumber
        }, { withCredentials: true }).then((res) => {
            console.log(res)
            toast.success("Updated Successfully")
            dispatch(loadSeller())

        }).catch((error) => {
            toast.error(error.response.data.message)

        })



    }
    return (
        <div className='w-full min-h-screen'>
            <div className='w-full flex justify-end pt-4'>

                <Link to="/admin-manage/:id">
                    <div>
                        <div className={`${styles.button} w-[140px] rounded-[5px] h-[40px] flex items-center mr-10`}>
                            <IoMdArrowRoundBack color='white' size={22} />
                            <span className='text-[#fff] text-[18px] font-Poppins pl-2'>Go back</span>
                        </div>
                    </div>
                </Link>

            </div>
            <div className='flex w-full justify-center flex-col'>

                <div className="w-full flex items-center justify-center mt-7">

                    <FaUserCircle color='#555' size={80} className='mx-5 cursor-pointer' />

                    {/* <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                                    <input
                                        type="file"
                                        id="image"
                                        className="hidden"
                                        onChange={handleImage}
                                    />
                                    <label htmlFor="image">
                                        <AiOutlineCamera />
                                    </label>
                                </div> */}

                </div>
                <h1 className='text-center font-[600] text-[#0000009b] mt-2'>{seller?.name}</h1>
                <h1 className='text-center font-[500] text-[#0000009b] mt-1'>admin@tinytiaraa.com</h1>


                <form
                    aria-required
                    onSubmit={updateHandler}

                    className="flex flex-col items-center"
                >
                    <div className=" w-[50%] mt-5">
                        <label className="block pb-2 font-[500]">Name</label>
                        <input
                            type="text"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-[#0000008b]`}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}


                        />
                    </div>

                    <div className=" w-[50%] mt-5">
                        <label className="block pb-2 font-[500]">Email</label>
                        <input
                            type="text"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-[#0000008b]`}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                    <div className=" w-[50%] mt-5">
                        <label className="block pb-2 font-[500]">Phone Number</label>
                        <input
                            type="tel"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-[#0000008b]`}
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}

                        />
                    </div>
                    <input
                        className={`w-[25%] h-[40px] border border-[#4c92e2] text-center text-[#34bcfc] rounded-[3px] mt-8 cursor-pointer`}
                        required
                        value="Update"
                        type="submit"
                    />

                </form>

            </div>
        </div>
    )
}

export default ShopSettings
