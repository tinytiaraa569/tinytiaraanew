import React from 'react'
import DashboardHeader from '../ShopDashboardPage/DashboardHeader'
import DashboardSideBar from '../ShopDashboardPage/DashboardSideBar'
import CreateProduct from './CreateProduct'

function ShopCreateProductPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div >
            <DashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
            <CreateProduct />
        </div>

      </div>
    </div>
  )
}

export default ShopCreateProductPage
