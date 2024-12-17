import React, { useState } from 'react'
import styles from '../Styles/styles'
import ShopInfo from './ShopInfo'
import ShopProfileData from './ShopProfileData'
import DashboardHeader from '../ShopDashboardPage/DashboardHeader'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";

function ShopHomePage() {
  const [isOwner ,setisOwner] =useState(true)
  return (
    <>
    <DashboardHeader />
    <div className='bg-[#f5f5f5]'>

    <div className={`${styles.section} `}>
      <div className='w-full flex justify-end pt-4'>
            {/* {
                isOwner && ( */}
                <Link to="/dashboard">
                    <div>
                        <div className={`${styles.button} w-[200px] rounded-[5px] h-[40px] flex items-center`}>
                          <IoMdArrowRoundBack color='white' size={22} />
                            <span className='text-[#fff] text-[18px] font-Poppins pl-2'>Go Dashboard</span>
                        </div>
                    </div>
                    </Link>
                {/* )
            } */}
      </div>
      <div className="w-full flex py-10 items-center justify-center">
        <div className="w-[55%] bg-[#fff] rounded-[4px] shadow-sm h-[60vh] sticky top-2 left-0 z-10">
          <ShopInfo isOwner={isOwner}/>
        </div>
        {/* <div className="w-[72%] rounded-[4px]">
          <ShopProfileData />

        </div> */}
      </div>
      
    </div>
    </div>
    </>


  )
}

export default ShopHomePage
