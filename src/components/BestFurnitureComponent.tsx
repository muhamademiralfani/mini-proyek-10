import React from 'react';
import best from '../assets/best-furniture.png';

const BestFurnitureComponent: React.FC = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center container max-w-screen-xl mx-auto h-screen mt-10 p-4'>
      <div className='md:col-span-1 lg:w-3/4'>
        <h1 className='text-4xl font-semibold  md:text-left'>The Best Furniture Manufacturer Of Your Choice</h1>
        <p className='mt-4  md:text-left'>
          Furnitre power is a software as services for multipurpose business management system, especially for them who are running two or more business explore the future Furnitre power is a software as services
        </p>
      </div>
      <div className='md:col-span-1 relative'>
        <img src={best} alt='best-furniture' className='w-full h-full object-cover' />
      </div>
    </div>
  );
};

export default BestFurnitureComponent;
