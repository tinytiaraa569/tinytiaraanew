import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const EnamelColorsList = ({ enamelColorsList, handleRemoveEnamelColor, handleAddImage }) => {
    return (
        <div className='mt-2'>
            {enamelColorsList.length > 0 && (
                <ul className='list-disc list-inside'>
                    {enamelColorsList.map((color, index) => (
                        <li key={index} className='flex justify-between mt-2'>
                            <div className='flex items-center gap-2'>
                                <span>{color}</span>
                                <input
                                    type="file"
                                    className='hidden'
                                    multiple
                                    onChange={(e) => handleAddImage(e, index)}
                                />
                                <label
                                    htmlFor={`uploadImages_${index}`}
                                    className='bg-slate-500 px-4 py-1 text-white rounded-[5px] cursor-pointer'
                                >
                                    Upload Images
                                </label>
                            </div>
                            <IoMdClose
                                className='ml-2 text-red-600 cursor-pointer'
                                onClick={() => handleRemoveEnamelColor(index)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EnamelColorsList;