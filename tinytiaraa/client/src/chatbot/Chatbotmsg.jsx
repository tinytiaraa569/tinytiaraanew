import React, { useEffect, useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { FaComments, FaTimes } from 'react-icons/fa'; // Import both icons
import './chatbotmsg.css'; // Assuming you're styling in a CSS file
import axios from 'axios'; // for making API calls
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfUser } from '@/redux/actions/order';
import { imgdburl } from '@/server';

const Chatbotmsg = () => {
const { orders, isLoading } = useSelector((state) => state.order)

  const [isOpen, setIsOpen] = useState(false); // State to track the open/close status
  const [ordersdata, setOrdersdata] = useState([]); // State to store fetched orders
  console.log(ordersdata,'from chatbotmsg')
  console.log(orders,'from chatbotmsg order')

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
    const dispatch = useDispatch()
    const fetchOrders = (email) => {
        console.log(email,"email getting in fetchorder is ---")
      const data = orders && orders?.filter((item) => item?.shippingAddress.email === email)
      setOrdersdata(data)

      console.log(data,"data of orders------------")
        
    };
    const OrderFetcher = ({ previousStep }) => {
      const email = previousStep.value;
    
      useEffect(() => {
        if (email) {
          fetchOrders(email);
        }
      }, [email]); // Only re-run the effect if the email changes
    
      return (
        <div>
          {ordersdata.length > 0 ? (
            ordersdata.map((order, index) => (
              <div key={index} className='bg-blue-400 rounded-[20px]'>
                <div>
            {order.cart && order.cart.length > 0 && (
                <div className="mb-4">
                <p className="font-medium text-gray-800 mb-2">Product Images:</p>
                {order.cart.map((item, index) => (
                    <div key={index} className="mb-4">
                            {/* Display the image for each product */}
               <img
                    src={
                    item.images && item.images[1] && item.images[1].url.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                        ? item.images[1].url.replace(
                            /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                            `${imgdburl}/uploads/images`
                        )
                        : `${imgdburl}${item.images && item.images[1]?.url}`
                    }
                    alt={`Product Image ${index + 1}`}
                    className="w-full h-auto rounded-lg shadow-md"
                />
                    </div>
                ))}
                </div>
            )}
                                
                </div>
                <p className='text-[14px]'>Order ID: {order._id}</p> {/* Corrected ID access */}
                <p>Status: {order.status}</p> {/* Ensure status exists */}
                <p>Total Amount: ₹{order.totalPrice}</p>
              </div>
            ))
          ) : (
            <p>No orders found for the email {email}.</p>
          )}
        </div>
      );
    };
    
    
  
  const steps = [
    {
      id: '1',
      message: 'Welcome to Tiny! What is your name?',
      trigger: 'name-input',
    },
    {
      id: 'name-input',
      user: true, // Allows user to input their name
      trigger: 'number-input',
    },
    {
      id: 'number-input',
      message: 'Thanks, {previousValue}! Could you please provide your contact number?',
      trigger: 'contact-number',
    },
    {
      id: 'contact-number',
      user: true, // Allows user to input their contact number
      trigger: 'greeting',
    },
    {
      id: 'greeting',
      message: 'Nice to meet you, ! How can I assist you today?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: '1', label: 'I need help with an order.', trigger: 'email-input' },
        { value: '2', label: 'I have a question about products.', trigger: '4' },
        { value: '3', label: 'I want to provide feedback.', trigger: '5' },
        { value: '4', label: 'Other inquiries', trigger: '6' },
      ],
    },
    {
      id: 'email-input',
      message: 'Please provide your email to look up your order.',
      trigger: 'email',
    },
    {
      id: 'email',
      user: true,
      validator: (value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          return 'Please enter a valid email address.';
        }
        return true;
      },
      trigger: 'fetch-orders',
    },
    {
      id: 'fetch-orders',
      component: <OrderFetcher />, // Component to fetch and display the orders
      trigger: 'end-message', // Optionally trigger an end message after displaying orders
    },
    {
      id: '3',
      message: 'Please provide your order ID.',
      trigger: 'end-message',
    },
    {
      id: '4',
      message: 'What product do you want to know about?',
      trigger: 'end-message',
    },
    {
      id: '5',
      message: 'Thank you for your feedback! Can you briefly describe your experience?',
      trigger: 'end-message',
    },
    {
      id: '6',
      message: 'Feel free to ask anything! What’s on your mind?',
      trigger: 'end-message',
    },
    {
      id: 'end-message',
      message: 'Thank you! I will get back to you shortly.',
      end: true,
    },
  ];

  const theme = {
    background: '#f5f8fb',
    headerBgColor: '#007bff',
    headerFontColor: '#fff',
    botBubbleColor: '#007bff',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  return (
    <div className='chatbot-container'>
      {/* ChatBot window appears when isOpen is true */}
      {isOpen && (
        <div className="chatbot-window">
          <ThemeProvider theme={theme}>
            <ChatBot steps={steps} className="chatbot" />
          </ThemeProvider>
        </div>
      )}
      
      {/* Chat icon toggle button */}
      <div className="chatbot-toggle-container">
        <button className="chatbot-toggle" onClick={toggleChatbot}>
          {isOpen ? <FaTimes size={20} color="#ffffff" /> : <FaComments size={20} color="#ffffff" />}
          <span className="tooltip text-[!14px]">Chat Here</span> {/* Tooltip */}
        </button>
      </div>
    </div>
  );
};

export default Chatbotmsg;
