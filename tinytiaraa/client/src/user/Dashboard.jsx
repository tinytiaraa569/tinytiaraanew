import React from 'react'
import './Dashboard.css'
import Usermenu from '../usermenu/Usermenu'
import { useAuth } from '../Context/auth'

function Dashboard() {
    const[auth] =useAuth()
  return (
    <div className='userdashboard'>
            <h1>Admin Dashboard</h1>
            <div className='userdashmain'>
                <div className="userdashboardsectionleft">
                    <Usermenu/>
                </div>
                <div className="userdashboardsectionright">
                    <h2>Dashboard section right</h2>
                    <div>
                        <h3>User Name: -{auth?.user?.name}</h3>
                        <h3>User Email: -{auth?.user?.email}</h3>
                        <h3>User phone: -{auth?.user?.phone}</h3>
                        <p>user Address:- {auth?.user?.address}</p>


                    </div>
                </div>
            </div>
        </div>
  )
}

export default Dashboard
