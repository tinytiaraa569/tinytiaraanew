import React, { useEffect } from 'react'
import DashboardHeader from '../ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '../ShopDashboardPage/DashboardSideBar'
import AllProducts from './AllProducts'

function ShopAllProducts() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-start justify-between">
        <div >
            <DashboardSideBar active={3} />
        </div>
       
            <AllProducts/>

      </div>
    </div>
  )
}

export default ShopAllProducts
