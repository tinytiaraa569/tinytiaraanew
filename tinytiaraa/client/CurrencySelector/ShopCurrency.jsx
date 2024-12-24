import React from 'react'
import DashboardHeader from '../src/ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '../src/ShopDashboardPage/DashboardSideBar'
import SetConversionRate from './SetConversionRate'


function ShopContactReq() {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-start justify-between">
        <div >
            <DashboardSideBar active={17} />
        </div>
        
            <SetConversionRate />
        

      </div>
    </div>
  )
}

export default ShopContactReq
