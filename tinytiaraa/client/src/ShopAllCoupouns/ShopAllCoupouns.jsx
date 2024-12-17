import DashboardHeader from '@/ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar'
import React from 'react'
import AllCoupoun from './AllCoupoun'
import { useSelector } from 'react-redux'

function ShopAllCoupouns() {
    
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-start justify-between">
        <div>
            <DashboardSideBar active={7} />
        </div>
        
            <AllCoupoun/>
       

      </div>
    </div>
  )
}

export default ShopAllCoupouns
