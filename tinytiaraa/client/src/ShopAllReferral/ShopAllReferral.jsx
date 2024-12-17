import React from 'react'
import DashboardHeader from '../ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '../ShopDashboardPage/DashboardSideBar'
import AllReferral from './AllReferral'

function ShopAllProducts() {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div className="max-w-full">
            <DashboardSideBar active={11} />
        </div>
        <div className="w-full justify-center flex">
            <AllReferral/>
        </div>

      </div>
    </div>
  )
}

export default ShopAllProducts
