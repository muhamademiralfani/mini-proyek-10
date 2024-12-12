import React from 'react';
import chair from '../assets/chair.png';

const NewProductComponent: React.FC = () => {
  const products = [
    { name: 'Chair', img: chair },
    { name: 'Bed', img: chair },
    { name: 'Cupboard', img: chair },
    { name: 'Lighting', img: chair },
    { name: 'Table', img: chair }, // Contoh produk tambahan
    { name: 'Sofa', img: chair }, // Contoh produk tambahan
  ];

  return (
    <div className='overflow-hidden scrollbar-hide  max-w-screen relative'>
      <div className='bg-white py-8 lg:py-16 container w-full max-w-screen-xl mx-auto h-screen items-center flex'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col lg:flex-row items-center justify-between'>
            <div className='mb-8 lg:mb-0 lg:mr-8 w-full'>
              <h2 className='text-2xl font-bold mb-2'>New In</h2>
              <h2 className='text-2xl font-bold mb-4'>Store Now</h2>
              <p className='text-gray-600 mb-6'>Get the latest items immediately with promo prices</p>
              <a href='#' className='inline-block font-normal underline text-xl py-2   rounded'>
                Check All
              </a>
            </div>
            <div className='flex gap-4 overflow-x-auto scrollbar lg:absolute scrollbar-hide left-[40%] z-0 snap-x p-4 w-full'>
              {products.map((product, index) => (
                <div className='relative min-w-[200px] flex-shrink-0' key={index}>
                  <img src={product.img} alt={product.name} className='w-full h-auto' />
                  <span className='absolute bottom-2 left-2 text-white text-center px-2 py-4 w-full bg-transparent  text-base font-medium'>{product.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductComponent;
