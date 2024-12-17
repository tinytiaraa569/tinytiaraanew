import React from 'react'
import DashboardHeader from '../ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '../ShopDashboardPage/DashboardSideBar'

function CatalogPage() {
  return (
<div>
      <DashboardHeader />
      <div className="w-full flex items-center justify-between">
        <div >
            <DashboardSideBar active={2} />
        </div>

        <div>
            
            
        </div>

      </div>
    </div>
  )
}

export default CatalogPage
