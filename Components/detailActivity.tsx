
import Image from 'next/image';
import { useState } from 'react';

const DetailActivity = ({ title, descr, image }: { title: string; descr: string; image: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseModal = () => {
        console.log('Closing modal...');
        setIsModalOpen(false);// Devrait fermer la modale
      };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-[90%] max-w-lg rounded-lg shadow-lg overflow-hidden">
          <div className="relative p-5">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 mb-4">{descr}</p>
            <Image
              src={image}
              alt={title}
              width={600}
              height={400}
              className="rounded-lg"
            />
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DetailActivity;
  