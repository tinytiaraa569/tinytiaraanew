import React from 'react'
import './usermenu.css'
import { Link } from 'react-router-dom'

function Usermenu() {
  return (
    <div className='usermenusection'>
        <h3>User Panel</h3>
        <div className="usersectioncon">
            <ul>
                <li><i class="fa-solid fa-user"></i><Link to="/dashboard/user/profile">Profile</Link></li>
                <li><i class="fa-solid fa-cart-plus"></i><Link to="/dashboard/user/orders">Orders</Link></li>
            </ul>
        </div>

      
    </div>
  )
}

export default Usermenu
