import React, { useState, useEffect } from 'react'
import Adminmenu from '../Adminmenu/Adminmenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Select } from 'antd'
const { Option } = Select
function CreateProduct() {
  const [categories, setcategories] = useState([])
  const [photo, setPhoto] = useState("")
  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState("")
  const [category, setcategory] = useState("")
  const [quantity, setquantity] = useState("")
  const [shipping, setshipping] = useState("")

  const navigate = useNavigate()


  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category")
      if (data?.success) {
        setcategories(data?.category)
      }

    } catch (error) {
      console.log(error)
      toast.error("something Went wrong in getting categories")


    }
  }

  useEffect(() => {
    getAllCategory()

  }, [])

//create product function

  const handleCreate = async (e) =>{
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append('name',name)
      productData.append('description',description)
      productData.append('quantity',quantity)
      productData.append('photo',photo)
      productData.append('category',category)
      productData.append('price',price)

      const {data} =  axios.post("http://localhost:8080/api/v1/product/create-product", productData)
      if(data?.success){
        toast.error(data?.message)
      }else{
        toast.success('Product Created Successfully')
        getAllCategory()
        navigate("/dashboard/admin/products")

      }
      
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong")
      
    }

  }




  return (
    <div className='admindashboard'>
      <div className='Admindashmain'>
        <div className="dashboardsectionleft">
          <Adminmenu />
        </div>
        <div className="dashboardsectionright">
          <h1>Create Product</h1>
          <div className='Selectwidthman'>
            <Select style={{ width: "100%", fontSize: "25px" }} variant={false} size='large' placeholder="Select a category" showSearch onChange={(value) => {setcategory(value) }}>
              {
                categories?.map((val) => {
                  return (
                    <Option key={val._id} value={val._id}>{val.name}</Option>
                  )

                })
              }


            </Select>
          </div>
          <div className="proimg">
            <label htmlFor="photo">
              {photo ? photo.name : "Upload photo"}
              <input multiple id='photo' type="file" accept='image/*' onChange={(e) => { setPhoto(e.target.files[0]) }} hidden />
            </label>
          </div>
          <div className="previewimg">
            {photo && (
              <div>
                <img src={URL.createObjectURL(photo)} alt="" height={200} />
              </div>
            )}
          </div>

          <div className='productdetailform'>
            <div className="productfield">
              <label htmlFor="">Name</label>
              <div>
                <input type="text" placeholder='Enter name of product' value={name} onChange={(e)=>{setname(e.target.value)}} />
              </div>
            </div>
            <div className="productfield">
              <label htmlFor="">Description</label>
              <div>
                <textarea name="" id="" placeholder='Enter name of product' value={description} onChange={(e)=>{setdescription(e.target.value)}}></textarea>
              </div>
            </div>
            <div className="productfield">
              <label htmlFor="">price</label>
              <div>
                <input type="number" placeholder='Enter Price of product' value={price} onChange={(e)=>{setprice(e.target.value)}} />
              </div>
            </div>
            <div className="productfield">
              <label htmlFor="">Quantity</label>
              <div>
                <input type="number" placeholder='Enter Quantity of product' value={quantity} onChange={(e)=>{setquantity(e.target.value)}} />
              </div>
            </div>
            <div className="productfield">
              <label htmlFor="">Shipping</label>
              <div>
                
                <Select variant='false' placeholder="Select shipping" onChange={(value)=>{setshipping(value)}}>
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>

                </Select>
              </div>
            </div>

            <div className="createbutton">
              <button type='submit' onClick={handleCreate}>Create Button</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct

