/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/async/categorySlice'; // Pastikan path sesuai
import { RootState } from '../redux/store'; // Pastikan path sesuai

const NewProductComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state: RootState) => state.category);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories() as any);
    }
  }, [status, dispatch]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Faktor kecepatan
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    e.preventDefault();
    scrollContainerRef.current.scrollLeft += e.deltaY; // Scroll horizontal dengan roda mouse
  };

  return (
    <div className="overflow-hidden scrollbar-hide max-w-screen relative">
      <div className="bg-white py-8 lg:py-16 container w-full max-w-screen-xl mx-auto h-screen items-center flex">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0 lg:mr-8 w-full">
              <h2 className="text-2xl font-bold mb-2">New In</h2>
              <h2 className="text-2xl font-bold mb-4">Store Now</h2>
              <p className="text-gray-600 mb-6">Get the latest items immediately with promo prices</p>
              <a href="#" className="inline-block font-normal underline text-xl py-2 rounded">
                Check All
              </a>
            </div>
            <div className="lg:absolute lg:left-[40%] transform">
              <div
                className="flex gap-4 overflow-x-auto scrollbar-hide"
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onWheel={handleWheel}
              >
                {status === 'loading' && <p>Loading...</p>}
                {status === 'failed' && <p>Error fetching categories</p>}
                {categories.map((category, index) => (
                  <div
                    className="relative lg:min-w-[200px] flex-shrink-0 group"
                    key={index}
                  >
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-72 h-96 rounded-lg transform transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <span className="absolute bottom-2 left-2 text-white text-center px-2 py-4 w-full bg-transparent text-base font-medium">
                      {category.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductComponent;
