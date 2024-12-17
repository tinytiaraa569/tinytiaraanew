import React, { useEffect, useState } from 'react'
import Adminmenu from '../Adminmenu/Adminmenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import './products.css'
import { Link } from 'react-router-dom'

function Products() {
    const [products, setproducts] = useState([])


    //getall products 

    const getallProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product")
            setproducts(data.products)

        } catch (error) {

            console.log(error)
            toast.error("something wnet wrong")

        }
    }

    useEffect(() => {
        getallProducts()
    }, [])

    return (
        <div className='admindashboard'>
            <div className='Admindashmain'>
                <div className="dashboardsectionleft">
                    <Adminmenu />
                </div>
                <div className="dashboardsectionright">
                    <h1>All Products List</h1>
                    <div className='productgridcon'>
                        {
                            products?.map((val) => {
                                return (
                                    <Link className='textadjustcard' to={`/dashboard/admin/product/${val.slug}`} key={val._id}>
                                    <div className='procard'>
                                            <div class="product-img">
                                                <img src={`http://localhost:8080/api/v1/product/product-photo/${val._id}`} alt="img" />
                                            </div>
                                            <h1 class="product-heading">{val.name}</h1>
                                           
                                            <div class="product-price">
                                                ₹{val.price}
                                            </div>
                                            <div class="product-lower">
                                                <div class="product-short-description">
                                                    <p> {val.description}</p>
                                                    
                                                </div>
                                               
                                            </div>

                                    </div>
                                    </Link>

                                )

                            })
                        }



                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
