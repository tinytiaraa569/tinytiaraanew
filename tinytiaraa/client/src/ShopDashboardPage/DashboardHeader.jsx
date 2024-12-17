// import React from 'react'
// import { AiOutlineGift } from 'react-icons/ai'
// import { MdOutlineLocalOffer } from 'react-icons/md'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { FiShoppingBag } from "react-icons/fi";
// import { TfiBag } from "react-icons/tfi";
// import { BiMessageSquareDetail } from "react-icons/bi";
// import { FaUserCircle } from "react-icons/fa";

// function DashboardHeader() {
//     const {seller} = useSelector((state)=> state.seller)
    

//   return (
//     <div className='w-full h-[90px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4'>
//         <div className='ml-10'>
//             {/* <Link to="/dashboard">
//             <img src="https://backend.tinytiaraa.com:8000/uploads/images/logowebsite/pgqpod1dbwdxo4kudbjl.webp" className='w-[100px] h-[90px]' alt="" />
//             </Link> */}
//             <div  className="ml-[51px]">
//             <Link to="/dashboard">
//               <img
//                 src="https://backend.tinytiaraa.com:8000/uploads/images/logowebsite/duvdwbtbmyr8ipqrevot.png"
//                 className="shadowpngadmin w-[100px] h-[75px] object-contain"
//                 alt=""
//               />
//             </Link>
//           </div>
//         </div>
//         <div className='flex items-center'>
//             <div className='flex items-center mr-2'>
//                 <Link to="/dashboard-gifts">
//                     <AiOutlineGift color='#555' size={30} className='mx-5 cursor-pointer'/>
//                 </Link>
//                 {/* <Link to="/dashboard-events">
//                     <MdOutlineLocalOffer color='#555' size={30} className='mx-5 cursor-pointer'/>
//                 </Link>
//                 <Link to="/dashboard-products">
//                     <FiShoppingBag  color='#555' size={30} className='mx-5 cursor-pointer'/>
//                 </Link>
//                 <Link to="/dashboard-orders">
//                     <TfiBag  color='#555' size={30} className='mx-5 cursor-pointer'/>
//                 </Link>
//                 <Link to="/dashboard-message">
//                     <BiMessageSquareDetail  color='#555' size={30} className='mx-5 cursor-pointer'/>
//                 </Link> */}
//                 <Link to={`/admin-manage/${seller?._id}`}>
//                 <FaUserCircle  color='#555' size={30} className='mx-5 cursor-pointer'/>
//                 </Link>

                
//             </div>

//         </div>
      
//     </div>
//   )
// }

// export default DashboardHeader


import React from 'react';
import { AiOutlineGift } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { AppBar, Toolbar, IconButton, Badge, Typography, Avatar, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

function DashboardHeader() {
  const { seller } = useSelector((state) => state.seller);

  return (
    <AppBar position="sticky"  sx={{ backgroundColor: '#fff', color: '#555' }} className='w-full h-[90px] border-b border-b-gray-200 bg-white !shadow-none sticky top-0 left-0 z-30 px-4'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
        {/* Logo */}
        <div className='ml-10'>
        <div  className="ml-[51px] mt-2">
             <Link to="/dashboard">
               <img
                 src="https://backend.tinytiaraa.com:8000/uploads/images/logowebsite/duvdwbtbmyr8ipqrevot.png"
                 className="shadowpngadmin w-[100px] h-[75px] object-contain"
                 alt=""
               />
            </Link>
           </div>
           </div>

        {/* Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Gifts">
            <IconButton component={Link} to="/dashboard-gifts">
              <AiOutlineGift size={28} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile">
            <IconButton component={Link} to={`/admin-manage/${seller?._id}`}>
              <FaUserCircle size={28} />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default DashboardHeader;
