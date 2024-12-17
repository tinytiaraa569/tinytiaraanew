import React from 'react'
import './Adminmenu.css'
import { Link } from 'react-router-dom'

function Adminmenu() {
  return (
    <div className='adminmenusection'>
        <div className="adminmenuicon">
        <img src="https://lirp.cdn-website.com/48f148a6/dms3rep/multi/opt/Tiny+Tiaraa_C5-217w.png" alt="" />
        </div>
        <div className="adminsectioncon">
            <ul>
                <li><i class="fa-solid fa-list"></i><Link to="/dashboard/admin/create-category">Create Category</Link></li>
                <li><i class="fa-solid fa-cart-plus"></i><Link to="/dashboard/admin/create-product">Create Product</Link></li>
                <li><i class="fa-solid fa-cart-plus"></i><Link to="/dashboard/admin/products"> Products</Link></li>

                <li><i class="fa-solid fa-users"></i><Link to="/dashboard/admin/users">Users</Link></li>
            </ul>
        </div>

      
    </div>
  )
}

export default Adminmenu
