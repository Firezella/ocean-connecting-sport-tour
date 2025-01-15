'use client'
import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
// import DetailActivity from './DetailActivity';
import DetailActivity from './detailActivity';

function Activity(props: any) {
  const { title, descr, image } = props;
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    console.log('Opening modal...');
    setIsModalOpen(true); // Devrait ouvrir la modale
  };

  const handleCloseModal = () => {
    console.log('Closing modal...');
    setIsModalOpen(false);// Devrait fermer la modale
  };

  return (
    <>
      {/* Activity Card */}
      <div
        className="flex flex-col bg-white w-80 shadow-xl rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={() => {
          handleOpenModal()
        }} // Open modal on click
      >
        {/* Image Section */}
        <div className="relative w-80 h-80">
          <Image
            className="hover:scale-110 transition-transform duration-500 ease-in-out"
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-5 bg-gray-50">
          <h1 className="text-gray-800 font-bold text-xl mb-3">{title}</h1>
          <p className="text-gray-600 leading-relaxed">{descr}</p>
        </div>
      </div>

     {/* Modal */}
{isModalOpen && (
 <DetailActivity title={title} descr={descr} image={image} />

)}
    </>
  );
}

export default Activity;

