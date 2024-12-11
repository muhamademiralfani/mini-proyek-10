import React from 'react';
import hero_image from '../assets/hero-banner.png';
import StatsDisplay from './UI/StatsDisplay';

const HeroComponent: React.FC = () => {
  return (
    <header
      style={{
        background: `url(${hero_image}) center/cover no-repeat`,
        width: '100%',
        height: '135vh',
      }}
      className='relative'>
      <div className='container h-full max-w-screen-xl mx-auto flex flex-col items-center justify-between py-4'>
        <div className='flex flex-col justify-center items-center text-center text-white h-full mx-auto gap-y-10'>
          <h1 className='font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl px-4'>
            Creative Home Simpify your Furniture
          </h1>
          <p className='text-base sm:text-lg md:text-xl lg:w-1/2 w-3/4 whitespace-normal'>
            Do i have consent to record this meeting gain locaion, root-and-branch, review, nor game plan who’s the goto
          </p>
          <button className='px-10 sm:px-16 md:px-20 py-3 sm:py-4 mt-6 bg-white bg-opacity-35 rounded-lg text-lg sm:text-xl'>
            Shop Now
          </button>
        </div>
        <div className='w-full lg:p-2 p-6'>
          <StatsDisplay />
        </div>
      </div>
    </header>
  );
};

export default HeroComponent;