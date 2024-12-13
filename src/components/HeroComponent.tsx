import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHeader } from '../redux/async/headerSlice';
import { RootState, AppDispatch } from '../redux/store';
import StatsDisplay from './UI/StatsDisplay';

const HeroComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { title, description, banner, status } = useSelector((state: RootState) => state.header);

  useEffect(() => {
    dispatch(fetchHeader());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Failed to load header data</div>;
  }

  return (
    <header
      id='home'
      style={{
        background: `url(${banner}) center/cover no-repeat`,
        width: '100%',
        height: '135vh',
      }}
      className='relative'>
      <div className='container h-full max-w-screen-xl mx-auto flex flex-col items-center justify-between py-4'>
        <div className='flex flex-col justify-center items-center text-center text-white h-full mx-auto gap-y-10'>
          <h1 className='font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl px-4'>{title}</h1>
          <p className='text-base sm:text-lg md:text-xl lg:w-1/2 w-3/4 whitespace-normal'>{description}</p>
          <button className='px-10 sm:px-16 md:px-20 py-3 sm:py-4 mt-6 bg-white bg-opacity-35 rounded-lg text-lg sm:text-xl'>Shop Now</button>
        </div>
        <StatsDisplay />
      </div>
    </header>
  );
};

export default HeroComponent;
