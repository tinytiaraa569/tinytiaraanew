import React, { useState } from "react";
import "./Customisednew.css";
import uploadimg from "./uploadimg.svg";
import axios from "axios";
import { server } from "@/server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AiFillCloseCircle } from "react-icons/ai";


function Customisednew() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [budget, setBudget] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});


  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const validateForm = () => {
    const newErrors = {};

    // Phone number validation
    if (!/^\d{10}$/.test(phonenumber)) {
      newErrors.phonenumber = 'Phone number must be 10 digits long and contain only numbers.';
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Check for empty fields
    if (!name) newErrors.name = 'Name is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!phonenumber) newErrors.phonenumber = 'Phone number is required.';
    if (!budget) newErrors.budget = 'Budget is required.';
    if (!address) newErrors.address = 'Address is required.';
    if (images.length === 0) {
      newErrors.images = 'At least one image must be uploaded.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle file drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  // Handle file input change (Browse File button)
  const handleFileChange = (e) => {
    processFiles(e.target.files);
  };

  // Process the dropped or selected files and read them as DataURL
  const processFiles = (newFiles) => {
    const filesArray = Array.from(newFiles);
    filesArray.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prevImages) => [...prevImages, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(validateForm()){
      axios
      .post(`${server}/customised/request`, {
        name,
        email,
        message,
        phonenumber,
        images,
        budget,
        address,
      })
      .then((res) => {
        swal({
          title: "Thank you!",
          text: "We'll get back to you for customization",
          icon: "success",
        });
        setName("");
        setEmail("");
        setMessage("");
        setPhonenumber("");
        setImages();
        setBudget("");
        setAddress("");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    }

  
  };
  const handleBrowseClick = () => {
    document.getElementById("uploadbt").click();
  };

  return (
    <div className="Customisednew">
      <div className="customnewheading">
        <h1>Fill the form to get the personalized design</h1>
      </div>

      <div className="Customisednewcon">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-[25px] Customisednewflex">
            <div className="w-[349px] customnewdrag">
              <h5>Upload your design</h5>

              <div className="uploadyrdesign">
                <div
                  className="drag-drop-area text-center"
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <img src={uploadimg} alt="" className="block m-auto" />
                  <p className="mt-2">Drag & Drop your file here </p>
                  <p className="mt-2">Or</p>
                  <button
                    className="uploadbtnnew mt-2"
                    type="button"
                    onClick={handleBrowseClick}
                  >
                    Browse File
                  </button>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    className="hidden"
                    id="uploadbt"
                    onChange={handleFileChange}
                    multiple
                    
                  />
                </div>

                {images.length > 0 && (
      <div className="file-details">
        <h5>Uploaded Files:</h5>
        <ul className="flex flex-wrap">
          {images.map((file, index) => (
            <li key={index} className="relative cursor-pointer">
              <img
                src={file}
                alt={`Uploaded ${index}`}
                width="100"
              />
              <button
                type="button"
                className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full"
                onClick={() => handleImageRemove(index)}
              >
                <AiFillCloseCircle size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}
                 {errors.images && <p className="text-red-500">{errors.images}</p>}
              </div>
            </div>

            <div className="w-[70%] customnewmaincon">
              <div className="flex mt-10 customnewmainconadjust">
                <div className="customnewfield">
                  <label htmlFor="customname">NAME</label>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      id="customname"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                  </div>
                </div>

                <div className="customnewfield customnewfield1">
                  <label htmlFor="customcontact">CONTACT NO</label>
                  <div>
                    <input
                      type="tel"
                      placeholder="Enter your contact number "
                      id="customcontact"
                      value={phonenumber}
                      onChange={(e) => {
                        // Ensure only numeric values are entered
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setPhonenumber(value);
                      }}
                      required
                      pattern="\d{10}" // This ensures exactly 10 digits
                      maxLength="10"
                      />
                      {errors.phonenumber && <p className="text-red-500">{errors.phonenumber}</p>}
                  </div>
                </div>
              </div>
              <div className="flex mt-10 customnewmainconadjust1">
                <div className="customnewfield">
                  <label htmlFor="customemail">EMAIL ID</label>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter your email address"
                      id="customemail"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="customnewfield customnewfield1">
                  <label htmlFor="customnbudgte">BUDGET</label>
                  <div>
                    <input
                      type="tel"
                      placeholder="Enter your budget in rupees "
                      id="customnbudgte"
                      value={budget}
                      onChange={(e) => {
                        setBudget(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="customnewfield mt-4">
            <label htmlFor="">ADDRESS</label>
            <div>
              <textarea
                name=""
                id=""
                placeholder="Enter your  address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              ></textarea>
            </div>
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>

          <div className="customnewfield mt-4">
            <label htmlFor="">Message</label>
            <div>
              <textarea
                name=""
                id=""
                placeholder="Enter your message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></textarea>
            </div>
          </div>

          <div className="text-center">
            <input type="submit" className="subbtncustomjewlenew cursor-pointer" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Customisednew;
