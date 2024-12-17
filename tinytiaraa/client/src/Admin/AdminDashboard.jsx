import React from 'react'
import Adminmenu from '../Adminmenu/Adminmenu'
import './AdminDashboard.css'
import { useAuth } from '../Context/auth'

function AdminDashboard() {
    const[auth] =useAuth()
    return (
        <div className='admindashboard'>
            <h1>Admin Dashboard</h1>
            <div className='Admindashmain'>
                <div className="dashboardsectionleft">
                    <Adminmenu />
                </div>
                <div className="dashboardsectionright">
                    <h1>Dashboard section right</h1>
                    <div>
                        <h3>Admin Name: -{auth?.user?.name}</h3>
                        <h3>Admin Email: -{auth?.user?.email}</h3>
                        <h3>Admin Contact: -{auth?.user?.phone}</h3>


                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminDashboard
