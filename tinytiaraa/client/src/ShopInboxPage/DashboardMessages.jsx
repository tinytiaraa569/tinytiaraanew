import { backend_url, server } from '@/server'
import styles from '@/Styles/styles'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineArrowRight, AiOutlineSend } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { TfiGallery } from 'react-icons/tfi'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { format } from 'timeago.js'
import socketIO from "socket.io-client";
const ENDPOINT = "https://tinychatsocket.onrender.com/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

function DashboardMessages() {
    const { seller, isLoading } = useSelector((state) => state.seller)

    const [conversations, setConversations] = useState([])
    const [open, setOpen] = useState(false)

    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [userData, setUserData] = useState(null);
    const [activeStatus, setActiveStatus] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [images, setImages] = useState();


    const scrollRef = useRef(null);
    // console.log(currentChat, "mesasge")


    useEffect(() => {
        socketId.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });

        })
    }, [])

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);






    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await axios.get(
                    `${server}/conversation/get-all-conversation-seller/${seller._id}`,
                    { withCredentials: true }
                );
                setConversations(response.data.conversations);
            } catch (error) {
                console.error("Error fetching conversations:", error);
            }
        };
        getConversations();
    }, [seller, messages]);

    useEffect(() => {
        if (seller) {
            const userId = seller?._id;
            socketId.emit("addUser", userId);
            socketId.on("getUsers", (data) => {
                setOnlineUsers(data);
            });
        }
    }, [seller]);



    const onlineCheck = (chat) => {
        const chatMembers = chat.members.find((member) => member !== seller?._id);
        const online = onlineUsers.find((user) => user.userId === chatMembers);


        return online ? true : false;
    };


    // get messages
    useEffect(() => {
        const getMessage = async () => {
            try {
                const response = await axios.get(
                    `${server}/message/get-all-messages/${currentChat?._id}`
                );
                setMessages(response.data.messages);
            } catch (error) {
                console.log(error);
            }
        };
        getMessage();
    }, [currentChat]);


    // create new message
    const sendMessageHandler = async (e) => {
        e.preventDefault();

        const message = {
            sender: seller._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(
            (member) => member.id !== seller?._id
        );

        socketId.emit("sendMessage", {
            senderId: seller?._id,
            receiverId,
            text: newMessage,
        });

        try {
            if (newMessage !== "") {
                await axios
                    .post(`${server}/message/create-new-message`, message)
                    .then((res) => {

                        setMessages([...messages, res.data.message]);
                        updateLastMessage();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(messages, "Check")

    const updateLastMessage = async () => {
        socketId.emit("updateLastMessage", {
            lastMessage: newMessage,
            lastMessageId: seller._id,
        });

        await axios
            .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
                lastMessage: newMessage,
                lastMessageId: seller._id,
            })
            .then((res) => {
                console.log(res.data.conversation);
                setNewMessage("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleImageUpload = async (e) => {

        const file = e.target.files[0];
        setImages(file)
        imageSendingHandler(file)

    }

    const imageSendingHandler = async (e) => {


        const formData = new FormData()
        formData.append("images", e)
        formData.append("sender", seller._id,)
        formData.append("text", newMessage)
        formData.append("conversationId", currentChat._id)

        const receiverId = currentChat.members.find(
            (member) => member !== seller._id
        );
        socketId.emit("sendMessage", {
            senderId: seller._id,
            receiverId,
            images: e,
        });

        try {
            await axios
                .post(
                    `${server}/message/create-new-message`,
                    formData
                )
                .then((res) => {

                    setImages();
                    setMessages([...messages, res.data.message]);
                    updateLastMessageForImage();
                });
        } catch (error) {
            console.log(error);
        }

    }
    const updateLastMessageForImage = async () => {
        await axios.put(
            `${server}/conversation/update-last-message/${currentChat._id}`,
            {
                lastMessage: "Photo",
                lastMessageId: seller._id,
            }
        );
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
    }, [messages]);

    const location = useLocation();

    // Get the last segment of the URL (e.g., "dashboard" or "overview")
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentPage = pathSegments[pathSegments.length - 1];
  
    // You can map the path segment to a more readable name
    const breadcrumbText = currentPage.charAt(0).toUpperCase() + currentPage.slice(1); // Capitalize first letter


    return (
        <div className='min-w-[82%] flex-grow px-8 pt-1 mt-5 bg-white h-[85vh] rounded shadow pb-5'>

                    <h2 className='text-[22px] font-[500]'>All Messages</h2>
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




            {/* All Messages list */}

            {
                !open && (
                    <>
                        {/* <h1 className='text-center text-[25px] font-[500] py-3'>All Messages</h1> */}
                        {
                            conversations && conversations.map((item, index) => (
                                <MessageList
                                    data={item}
                                    key={index}
                                    index={index}
                                    open={open}
                                    setOpen={setOpen}
                                    setCurrentChat={setCurrentChat}
                                    me={seller._id}
                                    online={onlineCheck(item)}
                                    setActiveStatus={setActiveStatus}
                                    userData={userData}
                                    setUserData={setUserData}
                                    isLoading={isLoading}
                                />
                            ))
                        }
                    </>
                )
            }

            {
                open && (
                    <SellerInbox
                        setOpen={setOpen}
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        sendMessageHandler={sendMessageHandler}
                        sellerId={seller._id}
                        activeStatus={activeStatus}
                        messages={messages}
                        userData={userData}
                        handleImageUpload={handleImageUpload}
                        scrollRef={scrollRef}

                    />
                )
            }
            {/* <MessageList /> */}




        </div>
    )
}


const MessageList = ({ data, setOpen, index, setCurrentChat, me, isLoading, userData, setUserData, online, setActiveStatus }) => {

    console.log(data, "see the data")

    const [active, setActive] = useState(0)
    const [user, setUser] = useState([]);
    const navigate = useNavigate()
    const handleClick = (id) => {
        navigate(`/dashboard-messages?${id}`);
        setOpen(true);
        setCurrentChat(data);
        setUserData(data.members.find((member) => member !== seller?._id));
    };

    useEffect(() => {
        setActiveStatus(online)
        const userId = data.members.find((user) => user != me);

        const getUser = async () => {
            try {
                const res = await axios.get(`${server}/user/user-info/${userId}`);
                setUser(res.data.user);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [me, data]);





    return (
        <div className={`w-full p-3 px-3  ${active === index ? ' bg-[#f5f5f5]' : 'bg-transparent'} cursor-pointer flex `}
            onClick={() =>
                setActive(index) ||
                handleClick(data._id) ||
                setUserData(user) ||
                setCurrentChat(data) ||
                setActiveStatus(online)}  >

            <div className='relative'>
                <FaUserCircle className='w-[50px] h-[50px]' fill='#0000008b' />
                {
                    online ?
                        <div className='w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[1px] right-[2px]'> </div>
                        :
                        <div className='w-[12px] h-[12px] bg-[crimson] rounded-full absolute top-[1px] right-[2px]'> </div>

                }
            </div>

            <div className="pl-3">
                <h1 className="text-[18px]">{user?.name}</h1>
                <p className="text-[16px] text-[#000c]">
                    {
                        data?.lastMessageId !== user?._id ? "You :" : user?.name.split(" ")[0] + ": "
                    }
                    {data?.lastMessage}
                </p>
            </div>

        </div>

    )
}

const SellerInbox = ({ setOpen, newMessage, scrollRef, setNewMessage, sendMessageHandler, messages, activeStatus, sellerId, userData, handleImageUpload }) => {
    return (
        <div className='w-full min-h-full flex flex-col overflow-hidden justify-between mt-4 '>

            {/* messgae header */}
            <div className='w-full items-center justify-between flex p-3 bg-slate-200'>
                <div className="flex">
                    <FaUserCircle className='w-[50px] h-[50px]' fill='#0000008b' />
                    <div className='pl-3'>
                        <h1 className='text-[18px] font-[600]'>{userData?.name}</h1>
                        <h1 className='text-[#000008b] text-[15px]'>{activeStatus ? "Active Now" : null}</h1>
                    </div>
                </div>

                <AiOutlineArrowRight size={20} onClick={() => setOpen(false)} className='cursor-pointer' />

            </div>



            {/* messages */}

            <div className="px-3 h-[65vh] overflow-y-scroll">
                {
                    messages && messages.map((item) => (
                        <div className={`${item.sender === sellerId ? 'justify-end' : 'justify-start'} w-full flex  my-3`} ref={scrollRef}>
                            {
                                item.sender !== sellerId && (

                                    <FaUserCircle className='w-[50px] h-[50px]' fill='#0000008b' />
                                )
                            }
                            {
                                item.images && (
                                    <img src={`${backend_url}${item.images}`} className='w-[300px] h-[300px] object-cover border rounded ml-3 mb-3' alt="" />
                                )
                            }

                            {
                                item.text !== "" && (
                                    <div>
                                        <div className='w-max p-2.5 rounded bg-slate-400 h-min '>
                                            <p>{item.text}</p>
                                        </div>
                                        <p className='text-[12px] text-[#0000008b] pt-1'>{format(item.createdAt)}</p>
                                    </div>

                                )
                            }

                        </div>
                        // {/* <div className="w-full flex justify-end my-3">
                        //     <div className='w-max p-2.5 rounded bg-slate-400 h-min '>
                        //         <p>Hello lorem</p>
                        //     </div>
                        // */}

                        // </div> 


                    ))
                }
            </div>







            {/* send message input */}

            <form action="" className='p-4 relative w-full flex justify-between items-center' onSubmit={sendMessageHandler}>
                <div className='w-[3%]'>
                    <input type="file" className='hidden' id='image' onChange={handleImageUpload} />
                    <label htmlFor="image">
                        <TfiGallery className='cursor-pointer' size={22} />

                    </label>
                </div>
                <div className='w-[97%]'>
                    <input type="text" required placeholder='Enter your message' className={`${styles.input}`} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                    <input type="submit" className='hidden' id='send' />
                    <label htmlFor="send">
                        <AiOutlineSend size={22} className='absolute cursor-pointer right-6 top-[25px]' />
                    </label>

                </div>

            </form>

        </div>
    )
}

export default DashboardMessages
