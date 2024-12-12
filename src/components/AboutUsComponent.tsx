import React from 'react';
import aboutimage from '../assets/about.png';
import aboutprofile from '../assets/aboutProfile.png'

const AboutUsComponent = () => {
  return (
    <section className='flex lg:flex-row flex-col gap-8 items-center max-w-screen-xl mx-auto p-4 h-screen'>
      {/* Testimonial Content */}
      <div className='flex-1'>
        <h2 className='text-3xl font-bold mb-8'>What People Are Saying About Us</h2>

        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='w-16 h-16 rounded-full overflow-hidden bg-gray-200'>
              <img src={aboutprofile} alt='Josh Smith' className='w-full h-full object-cover' />
            </div>
            <div>
              <h3 className='font-semibold text-lg'>Josh Smith</h3>
              <p className='text-gray-600'>Manager of The New York Times</p>
            </div>
          </div>

          <p className='text-gray-700 text-lg mb-6'>"They are have a perfect touch for make something so professional, interest and useful for a lot of people."</p>

          <div className='flex gap-2'>
            <button className='p-2 rounded-full border hover:bg-gray-100'>{/* <ChevronLeft className="w-6 h-6" /> */}</button>
            <button className='p-2 rounded-full bg-teal-600 text-white hover:bg-teal-700'>{/* <ChevronRight className="w-6 h-6" /> */}</button>
          </div>
        </div>
      </div>

      {/* Interior Image */}
      <div className='flex-1'>
        <div className='rounded-lg overflow-hidden'>
          <img src={aboutimage} alt='Modern interior design' className='w-full h-full object-cover' />
        </div>
      </div>
    </section>
  );
};

export default AboutUsComponent;
