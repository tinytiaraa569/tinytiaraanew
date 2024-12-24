import DashboardHeader from '@/ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar'
import React from 'react'
import AllRefundOrders from './AllRefundOrders'

function ShopAllRefunds() {
  return (
    <div>
    <DashboardHeader />
    <div className="w-full flex  justify-between">
      <div >
          <DashboardSideBar active={10} />
      </div>
      
          <AllRefundOrders/>
      

    </div>
  </div>
  )
}

export default ShopAllRefunds
