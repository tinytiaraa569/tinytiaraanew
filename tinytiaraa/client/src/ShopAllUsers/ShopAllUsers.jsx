import React from 'react'
import DashboardHeader from '../ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '../ShopDashboardPage/DashboardSideBar'
import AllUsers from './AllUsers'

function ShopAllUsers() {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div >
            <DashboardSideBar active={15} />
        </div>
        
           <AllUsers />
        

      </div>
    </div>
  )
}

export default ShopAllUsers
