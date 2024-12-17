import DashboardHeader from '@/ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar'
import React from 'react'
import AllEvents from './AllEvents'

function ShopAllEvents() {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-start justify-between">
        {/* <div className="w-[100px] md:w-[330px] max-w-[800px] min-w-[100px]"> */}
        <div >

            <DashboardSideBar active={5} />
        </div>
       
            <AllEvents/>
        

      </div>
    </div>
  )
}

export default ShopAllEvents
