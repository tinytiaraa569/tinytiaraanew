import React, { useState } from 'react';
import sample1 from './sample1.jpg';
import Bangle from './Bangle.png';
import sample2 from './sample2.png';
import sample3 from './sample3.png';
import sample4 from './sample4.jpg';
import sample5 from './sample5.png';
import sample6 from './sample6.png';
import sample7 from './sample7.png';
import sample8 from './sample8.png';
import sample9 from './sample9.png';
import sample10 from './sample10.png';
import sample11 from './sample11.png';
import sample12 from './sample12.png';







import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { IoClose, IoSearch } from 'react-icons/io5';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ensure this matches your app's root element ID

function Customsample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const images = [sample1, sample10,sample5,sample6,sample9,sample11,sample12];

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null); // Reset the current image when closing
  };

  return (
    <div className="py-7 px-8">
      <div className="text-center mb-8">
        <h1 className="text-[26px] font-extrabold text-gray-600 mb-1 tracking-wide">Crafted On Request</h1>
        <p className="text-[14px] text-gray-500 max-w-3xl mx-auto leading-relaxed">
          Discover a curated selection of custom-made designs, each crafted with precision and elegance to bring you unmatched quality and sophistication.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Sample ${index + 1}`}
            className="h-[300px] w-[300px] object-cover shadow-xl rounded-2xl border transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => handleImageClick(image)} // Handle image click
          />
        ))}
      </div>

      {/* Modal for InnerImageZoom */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="flex justify-center items-center outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-50"
        style={{
          overlay: { zIndex: 1000 },
          content: { border: 'none', background: 'transparent', padding: 0 },
        }}
      >
        <div className="bg-white relative flex justify-center items-center h-[100vh] w-[100%] border">
          <button className="absolute top-4 right-4 text-black text-2xl" onClick={closeModal}>
            <IoClose size={30}/>
          </button>
          <div className="flex justify-center items-center h-[65vh] w-[80%] relative">
            <InnerImageZoom
              src={currentImage}
              zoomSrc={currentImage} // Optional: provide a higher resolution image for zooming
              fadeDuration={150}
              hasSpacer={true} // Maintain space for zooming
             
              className="!max-w-[50vw] !max-h-[80vh]  object-contain shadow-md border rounded-[10px]" // Ensure it scales correctly
            />
          
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Customsample;
