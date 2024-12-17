import DashboardHeader from '@/ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar'
import React from 'react'
import AllOrders from './AllOrders'

function ShopAllOrders() {
  return (
    <div>
    <DashboardHeader />
    <div className="w-full flex  justify-between">
      <div >
          <DashboardSideBar active={10} />
      </div>
      
          <AllOrders/>
      

    </div>
  </div>
  )
}

export default ShopAllOrders
