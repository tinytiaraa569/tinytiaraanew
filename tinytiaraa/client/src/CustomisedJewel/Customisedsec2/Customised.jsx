import React, { useState } from 'react'
import './Customised2.css'
import { useDispatch, useSelector } from 'react-redux';
import { server } from '@/server';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import axios from 'axios';



function Customised() {

    const { seller } = useSelector((state) => state.seller)


    const [open, setOpen] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [images, setImages] = useState([])

    

    const handleImageChange = (e) => {
        e.preventDefault()

        const files = Array.from(e.target.files);

        setImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
       
        axios
          .post(`${server}/customised/request`, { name, email, message, phonenumber,images })
          .then((res) => {
            toast.success(res.data.message);
            setName("");
            setEmail("");
            setMessage("");
            setPhonenumber("");
            setImages()
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
    }



    return (
        <div className='customisedsec2'>
            <div className="customisedsec2flex">
                <div className="customised2img">
                    <img src="https://irp.cdn-website.com/48f148a6/dms3rep/multi/TT+Banner+Customised+Page.webp" alt="" />
                </div>
                <div className="customised2content">
                    <div className="customised2card">

                        <h1>Our Customised Jewellery Experience</h1>
                        <p>Our online custom jewellery design platform puts you in the designer's seat. Choose from a stunning array of high-quality metals, including gold, white gold, platinum, and more. Then, select your preferred gemstones, from dazzling diamonds to colourful sapphires or meaningful birthstones. Your options are as endless as your creativity.</p>
                        <button onClick={() => setOpen(true)}>Get Started</button>
                    </div>
                </div>
            </div>

            <div className="customisedsec2flex reverseflex">
                <div className="customised2content">
                    <div className="customised2card or1">

                        <h1>Expert Craftsmanship, Your Vision</h1>
                        <p>Once you've sent your design, our team of skilled artisans steps in to bring your vision to life. With years of experience and a passion for perfection, they meticulously handcraft each piece with the utmost care and attention to detail. Your unique jewellery is in the hands of true masters.</p>
                        <button onClick={() => setOpen(true)}>Get Started</button>
                    </div>
                </div>
                <div className="customised2img or2">
                    <img src="https://irp.cdn-website.com/48f148a6/dms3rep/multi/TT+Customised+Page+banner+2.webp" alt="" />
                </div>
            </div>

            <div className="customisedsec2flex noborder">
                <div className="customised2img">
                    <img src="https://irp.cdn-website.com/48f148a6/dms3rep/multi/TT+Banner+customised+3.webp" alt="" />
                </div>
                <div className="customised2content">
                    <div className="customised2card">

                        <h1>Quality Assurance Guaranteed</h1>
                        <p>At Tiny Tiaraa, quality and safety is our top priority. Before your custom piece is delivered, it undergoes rigorous quality control checks to ensure it meets our high standards. We want you to treasure your jewellery for a lifetime, and that begins with uncompromising quality.</p>
                        <button onClick={() => setOpen(true)}>Get Started</button>
                    </div>
                </div>
            </div>
            {open && (
                <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-70 z-[1000] flex justify-center items-center ">
                    <div className="w-[90%] max-w-[600px] h-[80vh] bg-white rounded-[15px] shadow-lg overflow-y-auto ">
                        <div className="w-full p-4 flex justify-end">
                            <RxCross2
                                size={30}
                                className="cursor-pointer text-gray-600 hover:text-gray-800"
                                onClick={() => setOpen(false)}
                            />
                        </div>

                        <h5 className="text-[28px] font-Poppins text-center font-bold mb-2">
                            Customised Jewellery
                        </h5>
                        <h6 className="text-center text-gray-600 mb-6">
                            Receive your order in 14 business days
                        </h6>

                        {/* Form Section */}
                        <form action="" onSubmit={handleSubmit} className="px-8">
                            <div className="font-Poppins mt-4">
                                <label htmlFor="name" className="block text-gray-700 pb-2">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter Your Name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="font-Poppins mt-4">
                                <label htmlFor="email" className="block text-gray-700 pb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="font-Poppins mt-4">
                                <label htmlFor="phone" className="block text-gray-700 pb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter Your Phone Number"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                    value={phonenumber}
                                    onChange={(e) => {
                                        setPhonenumber(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="font-Poppins mt-4">
                                <label htmlFor="message" className="block text-gray-700 pb-2">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    placeholder="Enter Message"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                    value={message}
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="font-Poppins mt-4">
                                <label htmlFor="upload" className="block text-gray-700 pb-2">
                                    Upload Images <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center flex-wrap gap-2">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="upload"
                                        multiple
                                        onChange={handleImageChange}
                                        required
                                    />
                                    <label htmlFor="upload">
                                        <AiOutlinePlusCircle
                                            size={30}
                                            className="mt-3 text-blue-600 hover:text-blue-800 cursor-pointer"
                                        />
                                    </label>

                                    {images &&
                                        images.map((i) => (
                                            <img
                                                src={i}
                                                key={i}
                                                alt=""
                                                className="h-[120px] w-[120px] object-cover m-2 rounded-md shadow-md"
                                            />
                                        ))}
                                </div>
                            </div>

                            <div className="font-Poppins mt-7 mb-6">
                                <button
                                    type="submit"
                                    className="w-full px-3 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    Upload Your Design
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </div>
    )
}

export default Customised
