import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../Styles/styles'
import { MdChevronRight } from "react-icons/md";

function DropDown({ categoriesData, setDropDown }) {
    const navigate = useNavigate()
    const submitHandle = (i) => {
        navigate(`/products?category=${i.title}`)
        setDropDown(false)
        // window.location.reload()

    }
    return (
        <div className='pb-4 w-[250px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm '>
            {
                categoriesData && categoriesData.map((i, index) => {
                    // console.log(i.subcategories)
                    return (
                        <>
                            <div key={index} className={`subcatmain ${styles.noramlFlex} relative`} onClick={() => { submitHandle(i) }}>
                                <img src={i.image_Url} alt="" style={{ width: "35px", height: "45px", objectFit: "contain", marginLeft: "10px", userSelect: "none" }} />
                                <h3 className='m-3 cursor-pointer select-none font-Poppins hover:text-[#1BB8E5]'>{i.title}</h3>
                                <span className='absolute right-0'>
                                <MdChevronRight />
                                </span>



                                <div  className={`subcatchild top-3 left-[100%]  pb-4 w-[250px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm`}>
                                    {
                                        i.subcategories.map((val) => {
                                            return (
                                                <div>
                                                    <h3 className='m-3 cursor-pointer select-none font-Poppins hover:text-[#1BB8E5]'>{val.name}</h3>
                                                </div>
                                            )

                                        })
                                    }
                                </div>
                            </div>


                        </>
                    )

                })
            }


        </div>
    )
}

export default DropDown
