import DashboardHeader from '@/ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar'
import React from 'react'
import DashboardMessages from './DashboardMessages'

function ShopInboxPage() {
  return (
    <div>
    <DashboardHeader />
    <div className="w-full flex  justify-between">
      <div>
          <DashboardSideBar active={9} />
      </div>
    
          <DashboardMessages />
     

    </div>
  </div>
  )
}

export default ShopInboxPage
