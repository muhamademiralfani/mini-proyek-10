import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHeader } from '../redux/async/headerSlice';
import { RootState, AppDispatch } from '../redux/store';
import StatsDisplay from './UI/StatsDisplay';

const HeroComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { title, description, banner, status } = useSelector((state: RootState) => state.header);

  // State untuk memicu animasi
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchHeader());
    const timer = setTimeout(() => setIsVisible(true), 200); // Delay animasi
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-xl">Failed to load header data</p>
      </div>
    );
  }

  return (
    <header
      id="hero-section"
      style={{
        background: `url(${banner}) center/cover no-repeat`,
        width: '100%',
        height: '135vh',
      }}
      className={`relative bg-opacity-75 ${
        isVisible ? 'animate-fade-slide-in' : 'opacity-0'
      }`}
    >
      <div className="container h-full max-w-screen-xl mx-auto flex flex-col items-center justify-between py-4">
        <div
          className={`flex flex-col justify-center items-center text-center text-white h-full mx-auto gap-y-10 ${
            isVisible ? 'animate-text-fade-slide' : 'opacity-0'
          }`}
        >
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl px-4">{title}</h1>
          <p className="text-base sm:text-lg md:text-xl lg:w-1/2 w-3/4 whitespace-normal">{description}</p>
          <button className="px-10 sm:px-16 md:px-20 py-3 sm:py-4 mt-6 bg-white bg-opacity-35 rounded-lg text-lg sm:text-xl">
            Shop Now
          </button>
        </div>
        <StatsDisplay />
      </div>
    </header>
  );
};

export default HeroComponent;
