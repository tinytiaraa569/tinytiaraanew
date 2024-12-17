import DashboardHeader from '@/ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar'
import React from 'react'
import Shopdatacomp from './Shopdatacomp'

function Shopalldataanalytics() {
  return (
    <div>
    <DashboardHeader />
    <div className="w-full flex ">
      <div >
          <DashboardSideBar active={18} />
      </div>
      
        <Shopdatacomp />
      

    </div>
  </div>
  )
}

export default Shopalldataanalytics