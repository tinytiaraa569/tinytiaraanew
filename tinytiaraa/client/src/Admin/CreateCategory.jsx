import React, { useEffect, useState } from 'react'
import Adminmenu from '../Adminmenu/Adminmenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../Form/CategoryForm';
import { Button, Modal } from 'antd';

function CreateCategory() {
    const [categories,setcategories] = useState([])
    const [name,setname] = useState([])

    const[visible,setvisible] = useState(false)
    
    const[selected,setselected] = useState(null)
    const[updatedName,setupdatedName] = useState(null)



    const handleSubmit = async (e) =>{
        e.preventDefault()

        const {data} = await axios.post('http://localhost:8080/api/v1/category/create-category',{name})
        if(data?.success){
            toast.success(`${name} is Created`)
            getAllCategory()
            setname("")
        }else{
            toast.error(data.message)
        }

        try {
            
        } catch (error) {
            console.log(error)
            toast.error("Somwthing went wrong in input form")
        }

    }


    //get cateogries

    const getAllCategory = async () =>{
        try {
            const {data} = await axios.get("http://localhost:8080/api/v1/category/get-category")
            if(data?.success){
                setcategories(data?.category)
            }
            
        } catch (error) {
            console.log(error)
            toast.error("something Went wrong in getting categories")
            
            
        }
    }

    useEffect (()=>{
        getAllCategory()

    },[])

    //update category

    const handleUpdate = async (e) =>{
        e.preventDefault()
        try {
            const {data} = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`,{name:updatedName})
            if(data.success){
                toast.success(data.message)
                setselected(null)
                setupdatedName("")
                setvisible(false)
                getAllCategory()
            }else{
                toast.error(`${updatedName} is updated`)
            }
        } catch (error) {
            console.log(error)
            toast.error('somethoing went wrong')
            
        }
    }



    
    //delete category

    const handleDelete = async (pid) =>{
        
        try {
            const {data} = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${pid}`,{name:updatedName})
            if(data.success){
                toast.success(data.message)
                getAllCategory()
            }else{
                toast.error(`category is deleted`)
            }
        } catch (error) {
            console.log(error)
            toast.error('somethoing went wrong')
            
        }

    }
  return (
    <div className='admindashboard'>
            <div className='Admindashmain'>
                <div className="dashboardsectionleft">
                    <Adminmenu />
                </div>
                <div className="dashboardsectionright">
                    <h1>Manage category Sections</h1>
                    <div className="categoryform">
                        <h2>Add New Category</h2>
                        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setname}/>
                    </div>
                    <div className='categorylist'>
                        <h2>Update Category Section</h2>
                        <div className="categorlistmainsection">

                        <div className="categorylistheader">
                            <span>Name</span>
                            <span>Actions</span>
                        </div>
                        <div className="categorylistsshow">
                        {
                                        categories?.map((val)=>{
                                            return(
                                                <span key={val._id} className='categorylistflex'>
                                                <span>{val.name}</span>
                                                <span className='categorybtn'>
                                                    <button onClick={()=>{setvisible(true);setupdatedName(val.name);setselected(val)}}>Edit</button>
                                                    <button onClick={()=>{handleDelete(val._id)}}>Delete</button>

                                                    </span>

                                                </span>
                                            )
                                        })
                                    }
                            
                        </div>
                      

                    </div>
                    </div>

                    <Modal onCancel={()=>{setvisible(false)}} footer={null} open={visible}>
                        <CategoryForm value={updatedName} setValue={setupdatedName} handleSubmit={handleUpdate}/>
                    </Modal>
                </div>
            </div>
        </div>
  )
}

export default CreateCategory
