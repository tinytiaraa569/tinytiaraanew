import React from 'react'
import DashboardHeader from '../ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '../ShopDashboardPage/DashboardSideBar'
import AllContactRequest from './AllContactRequest'

function ShopContactReq() {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div >
            <DashboardSideBar active={12} />
            {/* <DashboardSideBar active={13} /> */}

        </div>
        <div className="w-full justify-center flex">
            <AllContactRequest/>
        </div>

      </div>
    </div>
  )
}

export default ShopContactReq
