import React from 'react'
import Usermenu from '../usermenu/Usermenu'

function Orders() {
  return (
    <div className='userdashboard'>
            <h1>User Orders</h1>
            <div className='userdashmain'>
                <div className="userdashboardsectionleft">
                    <Usermenu/>
                </div>
                <div className="userdashboardsectionright">
                    <h2>Dashboard section right</h2>
                    
                </div>
            </div>
        </div>
  )
}

export default Orders
