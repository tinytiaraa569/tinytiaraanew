import DashboardHeader from '@/ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar'
import React from 'react'
import Allpopup from './Allpopup'

function Shopallpopup() {
  return (
    <div>
    <DashboardHeader />
    <div className="w-full flex ">
      <div >
          <DashboardSideBar active={19} />
      </div>
      
        <Allpopup />
      

    </div>
  </div>
  )
}

export default Shopallpopup