import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { imgdburl, server } from '../server'; // Ensure your server URL is correct
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../Loader/Loader';
import { Link, useLocation } from 'react-router-dom';
import * as XLSX from "xlsx";
import { FaFileExcel } from "react-icons/fa";

function AllUsers() {
    const [users, setUsers] = useState([]); // State to hold the users
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${server}/user/get-all-users`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Include credentials
                });
                console.log('Fetched data:', response.data); // Log full response data
                setUsers(response.data.users); // Set users from the response
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching users'); // Handle errors
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchUsers();
    }, []);

    // Render loading state
    if (loading) return <Loader />;

    // Render error state
    if (error) return <div>{error}</div>;

    // Define columns for DataGrid
    const columns = [
        { field: 'id', headerName: 'User ID', minWidth: 150, flex: 1 },
        { field: 'name', headerName: 'Name', minWidth: 150, flex: 1 },
        { field: 'email', headerName: 'Email', minWidth: 200, flex: 1 },
        { 
            field: 'createdAt', 
            headerName: 'Created At', 
            minWidth: 150, 
            flex: 1,
        },
        {
            field: 'avatar',
            headerName: 'Avatar',
            minWidth: 100,
            flex: 1,
            renderCell: (params) => {
               
                if (params.value?.url) {
                    // Transform the URL to replace 'avatars' with 'products'
                    const imageUrl = params.value.url.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                        ? params.value.url.replace(
                            /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                            `${imgdburl}/uploads/images`
                        ).replace('/avatars/', '/products/') // Replace 'avatars' with 'products'
                        : `${imgdburl}${params.value.url.replace('/avatars/', '/products/')}`; // Prepend imgdburl and replace 'avatars'
            
                    return <img src={imageUrl} alt="User Product" width={50} height={50} />;
                }
                return 'No Image';
            }
        },
    ];

    // Prepare rows for DataGrid
    const rows = users.map(user => ({
        id: user._id || 'N/A', // Fallback for missing id
        name: user.name || 'Unknown', // Fallback for missing name
        email: user.email || 'No Email', // Fallback for missing email
        createdAt: user?.createdAt ? user.createdAt.slice(0, 10) : 'N/A', // Fallback for missing createdAt
        avatar: user.avatar || {}, // Fallback for missing avatar
    }));
    const location = useLocation();

    // Get the last segment of the URL (e.g., "dashboard" or "overview")
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentPage = pathSegments[pathSegments.length - 1];
  
    // You can map the path segment to a more readable name
    const breadcrumbText = currentPage.charAt(0).toUpperCase() + currentPage.slice(1); // Capitalize first letter

    const handleExportToExcel = () => {
        const userData = users.map((user) => ({
          Name: user.name,
          Email: user.email,
          ReferralBalance: user.referralBalance,
          Role: user.role,
         
          Address: user.addresses
            .map(
              (address) =>
                `${address.address1 || ""}, ${address.address2 || ""}, ${address.city || ""}, ${address.country || ""}, ${address.zipCode || ""}`
            )
            .join("; ") || "N/A",
          AvatarURL:
            user.avatar?.url &&
            user.avatar.url.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
              ? user.avatar.url
                  .replace(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/, `${imgdburl}/uploads/images`)
                  .replace("/avatars/", "/products/")
              : user.avatar?.url
              ? `${imgdburl}${user.avatar.url}`.replace("/avatars/", "/products/")
              : "Not Uploaded.", // Placeholder image if no avatar
         CreatedAt: new Date(user.createdAt).toLocaleString(),
        }));
    
        // Create a new workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(userData);
    
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    
        // Generate Excel file and download
        XLSX.writeFile(workbook, "Users.xlsx");
      };
    

    return (
        <div className="min-w-[82%] flex-grow px-10 pt-1 mt-7 bg-white">
            <div className='flex justify-between'>
                <div>
                <h1 className="text-2xl font-bold mb-1  text-[#000000b9]">All Users</h1>
                <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-4 mt-1">
                                <ol className="flex space-x-2">
                                <li>
                                    <Link to={"/dashboard"} className="hover:text-blue-500">Home</Link>
                                </li>
                                <li>&gt;</li> {/* Separator */}
                                <li>
                                    <span className="text-gray-400">{breadcrumbText}</span> {/* Active breadcrumb */}
                                </li>
                                </ol>
                </nav>

                </div>
                <div>
                <button
                    onClick={handleExportToExcel}
                    className="flex items-center px-5 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:ring-2 focus:ring-offset-1 focus:ring-green-400"
                >
                    <FaFileExcel className="mr-2 text-xl" />
                    Export to Excel
                </button>
                </div>
                
            </div>

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    );
}

export default AllUsers;
