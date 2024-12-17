import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { FaTrophy } from 'react-icons/fa';
import { IoIosClose } from "react-icons/io";
import axios from 'axios';
import { server } from '@/server';
import './spinandwin.css';
import { motion } from 'framer-motion';



const data = [
  { option: '250Rs off', style: { backgroundColor: '#f0e68c', textColor: 'black' }, stop: 'max' ,couponCode:"Tinyspin250" },
  { option: '500Rs off', style: { backgroundColor: '#ffa500', textColor: 'black' }, stop: 'max' , couponCode:"Tiny500" },
  { option: '750Rs off', style: { backgroundColor: '#28a745', textColor: 'white' }, stop: '2%', couponCode:"Tinytiaraa750" },
  { option: '5% off', style: { backgroundColor: '#ff4500', textColor: 'white' }, stop: '2%' ,couponCode:"Tinyspin5" },
  { option: '10% off', style: { backgroundColor: '#8b0000', textColor: 'white' }, stop: 'never' ,couponCode:"Tiny10"},
  { option: 'Free Gifts', style: { backgroundColor: '#1e90ff', textColor: 'white' }, stop: 'max',couponCode:"FreeGifts" },
  { option: 'Try Again', style: { backgroundColor: '#dc143c', textColor: 'white' }, stop: '2%' ,couponCode:"Try Your Luck Again"}
];

const probabilityMap = {
  max: 6,
  '2%': 1,
  never: 0
};
// Dummy data for winners
const initialWinners = [
  { name: 'John Doe', option: '250Rs off' },
  { name: 'Jane Smith', option: 'Free Gifts' },
  { name: 'Sam Wilson', option: '10% off' }
];
// Winner Balloon component
const WinnerBalloon = ({ name, option, floatDirection, onAnimationEnd, index, isVisible }) => {
  const delay = index * 0.7; // Adjust delay based on the index
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Check if the view is mobile (below 1080px) and also below 700px
  const isMobileView = screenWidth < 1080;
  const isHiddenView = screenWidth < 850;
  return (
    isVisible && !isHiddenView && ( // Render the balloon only if isVisible is true
      <motion.div
        className={`balloon ${floatDirection === 'left' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-green-400 to-yellow-500'}`}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: -300 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: 'easeOut', delay: delay }} // Apply the delay
        onAnimationComplete={onAnimationEnd}
        style={{
          left: floatDirection === 'left' ? '5%' : '70%',
          bottom: '0',
          position: 'absolute',
        }}
      >
        
       {/** Conditional rendering based on screen width */}
       {!isMobileView ? (
          <div>
            🎈 {name} won {option} 🎉
          </div>
        ) : (
          <div>
            <span className="block">{name}</span> {/* First line: Name */}
            <span className="block !text-[18px]">{option}</span> {/* Second line: Option */}
          </div>
        )}
      </motion.div>
    )
  );
};
function SpinandWin() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', mobile: '' });
  const [showCongrats, setShowCongrats] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [winners, setWinners] = useState([]);
  const [visibleWinners, setVisibleWinners] = useState([]); // Initialize visibility state


  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${server}/spin/all/spin`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        console.log(response, "response");

        const spins = response.data.spins || []; // Adjust according to your actual data structure

        // Assuming 'data' is available in the scope where it contains option and couponCode
        const matchedWinners = spins.map(spin => {
          const matchedOption = data.find(item => item.couponCode === spin.couponCode);
          return {
            name: spin.name,
            option: matchedOption ? matchedOption.option : null, // Set option if matched, else null
          };
        }).filter(winner => winner.option); // Filter out any entries that don't have a matched option
  
        setWinners(matchedWinners); // Update winners with matched values
  
        // Initialize visibility state based on fetched winners
        setVisibleWinners(Array(matchedWinners.length).fill(true));
      } catch (error) {
        console.error('Error fetching requests:', error);
        toast.error('Failed to fetch requests.');
      } finally {
        // setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getWeightedPrizeNumber = () => {
    const weightedOptions = [];
    data.forEach((item, index) => {
      const stopCondition = item.stop;
      const weight = probabilityMap[stopCondition] || 1;

      if (weight > 0) {
        for (let i = 0; i < weight; i++) {
          weightedOptions.push(index);
        }
      }
    });
    const randomIndex = Math.floor(Math.random() * weightedOptions.length);
    return weightedOptions[randomIndex];
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSpinClick = () => {
    const newPrizeNumber = getWeightedPrizeNumber();
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setShowCongrats(true); // Open the congratulations overlay
    setCouponCode(data[prizeNumber].couponCode); // Set the correct coupon code

     // Add new winner
     const newWinner = {
      name: userInfo.name || 'Anonymous',
      option: data[prizeNumber].option
    };
    setWinners((prevWinners) => [...prevWinners, newWinner]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Include the coupon code in the submission data
    const submissionData = {
      name: userInfo.name,
      email: userInfo.email,
      mobile: userInfo.mobile,
      couponCode, // Include the coupon code from the state
    };

    try {
      const response = await axios.post(`${server}/spin/spin`, submissionData);
    
      // console.log("Submission successful:", response.data);
      alert(`Submitted! Coupon Code: ${couponCode}`); // Example alert

    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("There was an error submitting your request. Please try again later.");
    }

    console.log(submissionData, "User submitted details");
    setUserInfo({ name: '', email: '', mobile: '' }); // Reset user info
    setShowCongrats(false); // Close the overlay after submission
  };
  const handleRemoveBalloon = (index) => {
    setVisibleWinners((prevVisible) => {
      const updated = [...prevVisible];
      updated[index] = false; // Hide the balloon
      return updated;
    });
  };
  
  return (
    <div className="flex flex-col justify-center items-center h-auto">
         <div className="balloon  absolute flex flex-col items-center w-full h-80 space-y-4 ">
        {winners.map((winner, index) => (
        <WinnerBalloon
        key={index}
        name={winner.name}
        option={winner.option}
        floatDirection={index % 2 === 0 ? 'left' : 'right'}
        onAnimationEnd={() => handleRemoveBalloon(index)}
        index={index} // Pass the index to the WinnerBalloon
        isVisible={visibleWinners[index]} // Pass the visibility state
    />
        ))}
      </div>
      <div className="p-1 rounded-lg">
        <h1 className="spinandwinheading text-[30px] font-bold text-center text-gray-800 mb-2">🎉 Spin and Win! 🎉</h1>
        <p className="spinandwinpara text-[18px] text-center text-gray-600 mb-2">🎊 Give it a whirl and unlock amazing prizes! 🎊</p>
        <div className="relative flex justify-center">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['#ffffff']}
          onStopSpinning={handleStopSpinning}
          outerBorderWidth={5}
          radiusLineWidth={3}
          radiusLineColor='black'
          outerBorderColor='black'
          innerBorderWidth={45}     
          // innerBorderColor='white'
               
          />
           <img 
            src="https://backend.tinytiaraa.com:8000/uploads/images/logowebsite/pgqpod1dbwdxo4kudbjl.webp" 
            alt="Center Image" 
            className="adjustspnimg absolute inset-0 mx-auto my-auto w-16 h-16" // Adjust width and height as needed
            style={{ top: '15%', left: '14%', transform: 'translate(-50%, -50%)' ,zIndex:"49"}} // Center the image
            
        />
            <style jsx>{`
               
               
                 
            }
        `}</style>
        </div>
        
        
        <div className="flex justify-center mt-4 mb-3">
          <button
            className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-full hover:from-orange-500 hover:to-yellow-400 transition duration-300"
            onClick={handleSpinClick}
          >
            Spin & Win!
          </button>
        </div>

        {/* Congratulations overlay */}
        {showCongrats && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white px-6 pb-6 pt-2 rounded-lg shadow-lg w-11/12 max-w-md">
              <div className='flex justify-end' onClick={() => { setShowCongrats(false) }}>
                <IoIosClose size={40} className='text-red-500 cursor-pointer' />
              </div>
              <h2 className="text-xl text-center">
                <FaTrophy className="inline-block mr-2" />
                Congratulations!
              </h2>
              <p className="text-lg mt-2 text-center">You've won: <strong>{data[prizeNumber].option}</strong></p>

              <p className="text-md mt-2 text-center text-[#0000008e]">Coupon Code: <span >{couponCode}</span></p>
              <form onSubmit={handleSubmit} className="mt-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  className="block border rounded-lg px-4 py-2 mb-2 w-full"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  className="block border rounded-lg px-4 py-2 mb-2 w-full"
                  required
                />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={userInfo.mobile}
                  onChange={handleInputChange}
                  className="block border rounded-lg px-4 py-2 mb-2 w-full"
                  required
                />
                <div className='flex justify-center'>
                  <button
                    type="submit"
                    className="mt-4 px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full hover:from-blue-500 hover:to-green-400 transition duration-300"
                  >
                    Claim Your Reward!
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpinandWin;
