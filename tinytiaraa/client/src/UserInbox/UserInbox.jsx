import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { format } from 'timeago.js'
import socketIO from "socket.io-client";
import { backend_url, server } from '@/server';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineArrowRight, AiOutlineSend } from 'react-icons/ai';
import { TfiGallery } from 'react-icons/tfi';
import styles from '@/Styles/styles';
const ENDPOINT = "https://tinychatsocket.onrender.com/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

function UserInbox() {


    const { user } = useSelector((state) => state.user)

    const [conversations, setConversations] = useState([])
    const [open, setOpen] = useState(false)

    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState();
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [userData, setUserData] = useState(null);
    const [activeStatus, setActiveStatus] = useState(false);
    const [images, setImages] = useState();





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
        const getConversation = async () => {
            try {
                const resonse = await axios.get(
                    `${server}/conversation/get-all-conversation-user/${user?._id}`,
                    {
                        withCredentials: true,
                    }
                );

                setConversations(resonse.data.conversations);
            } catch (error) {
                // console.log(error);
            }
        };
        getConversation();
    }, [user, messages]);



    useEffect(() => {
        if (user) {
            const userId = user?._id;
            socketId.emit("addUser", userId);
            socketId.on("getUsers", (data) => {
                setOnlineUsers(data);
            });
        }

    }, [user])

    const onlineCheck = (chat) => {
        const chatMembers = chat.members.find((member) => member !== user?._id);
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
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find((member) => member !== user?._id);

        socketId.emit("sendMessage", {
            senderId: user?._id,
            receiverId,
            text: newMessage,
        });

        try {
            if (newMessage !== "") {
                await axios
                    .post(`${server}/message/create-new-message`, message)
                    .then((res) => {
                        setMessages([...messages, res.data.message]);
                        updateLastMessage()

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateLastMessage = async () => {
        socketId.emit("updateLastMessage", {
            lastMessage: newMessage,
            lastMessageId: user._id,
        });

        await axios
            .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
                lastMessage: newMessage,
                lastMessageId: user._id,
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
        formData.append("sender", user._id,)
        formData.append("text", newMessage)
        formData.append("conversationId", currentChat._id)

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );
        socketId.emit("sendMessage", {
            senderId: user._id,
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
                lastMessageId: user._id,
            }
        );
    };




    const scrollRef = useRef(null);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
    }, [messages]);





    return (
        <div className='w-full'>
            {
                !open && (
                    <>
                        <h1 className='text-center text-[25px] font-[500] py-3'>All Messages</h1>
                        {
                            conversations && conversations.map((item, index) => (
                                <MessageList
                                    data={item}
                                    online={onlineCheck(item)}
                                    setActiveStatus={setActiveStatus}
                                    key={index}
                                    index={index}
                                    open={open}
                                    setOpen={setOpen}
                                    setCurrentChat={setCurrentChat}
                                    me={user?._id}
                                    userData={userData}
                                    setUserData={setUserData}
                                />
                            ))
                        }
                    </>
                )
            }

            {open && (
                <SellerInbox
                    setOpen={setOpen}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    sendMessageHandler={sendMessageHandler}
                    messages={messages}
                    sellerId={user._id}
                    userData={userData}
                    activeStatus={activeStatus}
                    scrollRef={scrollRef}
                    handleImageUpload={handleImageUpload}


                />
            )}


        </div>
    )
}

const MessageList = ({ data, setOpen, index, setCurrentChat, me, userData, setUserData, online, setActiveStatus ,handleImageUpload }) => {
    const [active, setActive] = useState(0);
    const [user, setUser] = useState([]);

    const navigate = useNavigate();
    const handleClick = (conversationId) => {
        navigate(`/inbox?${conversationId}`);
        setOpen(true);
        setCurrentChat(data);
        setUserData(data.members.find((member) => member !== user?._id));
    };
    useEffect(() => {
        setActiveStatus(online)
        const userId = data.members.find((user) => user != me)

        const getUser = async () => {
            try {
                const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);
                setUser(res.data.shop);

            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [me, data]);

    return (
        <div className={`w-full p-3 px-3 ${active === index ? ' bg-[#f5f5f5]' : 'bg-transparent'} cursor-pointer flex `}
            onClick={() => setActive(index)
                || handleClick(data._id)
                || setCurrentChat(data)
                || setUserData(user)
                || setActiveStatus(online)


            } >

            <div className='relative'>
                <FaUserCircle className='w-[50px] h-[50px]' fill='#0000008b' />
                {
                    online ?
                        <div className='w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[1px] right-[2px]'> </div>
                        :
                        <div className='w-[12px] h-[12px] bg-[crimson] rounded-full absolute top-[1px] right-[2px]'> </div>

                }
            </div>

            <div className='pl-3 '>
                <h1 className='text-[18px]'>{user?.name}</h1>
                <p className='text-[16px] text-[#000c]'>{
                    data?.lastMessage !== userData?._id ? "You :" : userData?.name.split(" ")[0] + ": "
                }
                    <span className='pl-1'> {data?.lastMessage}</span></p>
            </div>


        </div>

    )
}


const SellerInbox = ({ setOpen, newMessage, scrollRef, setNewMessage, sendMessageHandler, messages, activeStatus, sellerId, userData,handleImageUpload }) => {
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

export default UserInbox
