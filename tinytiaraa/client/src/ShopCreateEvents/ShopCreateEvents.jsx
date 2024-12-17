import DashboardHeader from '@/ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar'
import React from 'react'
import CreateEvent from './CreateEvent'

function ShopCreateEvents() {
  return (
    <div>
    <DashboardHeader />
    <div className="w-full flex  justify-between">
      <div >
          <DashboardSideBar active={6} />
      </div>

        <div className='w-full justify-center flex'>
            <CreateEvent />

        </div>
    </div>
  </div>
  )
}

export default ShopCreateEvents
