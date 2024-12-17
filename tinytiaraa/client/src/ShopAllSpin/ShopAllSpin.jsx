import React, { useEffect } from 'react'
import DashboardHeader from '../ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '../ShopDashboardPage/DashboardSideBar'
import AllSpin from './AllSpin'


function ShopContactReq() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div >
            <DashboardSideBar active={12} />
        </div>
        <div className="w-full justify-center flex">
            <AllSpin/>
        </div>

      </div>
    </div>
  )
}

export default ShopContactReq
