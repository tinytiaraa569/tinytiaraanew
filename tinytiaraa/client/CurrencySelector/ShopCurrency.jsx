import React from 'react'
import DashboardHeader from '../src/ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '../src/ShopDashboardPage/DashboardSideBar'
import SetConversionRate from './SetConversionRate'


function ShopContactReq() {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div className="w-[100px] md:w-[330px] max-w-[800px] min-w-[100px]">
            <DashboardSideBar active={17} />
        </div>
        <div className="w-full justify-center flex">
            <SetConversionRate />
        </div>

      </div>
    </div>
  )
}

export default ShopContactReq
