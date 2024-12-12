import React, { useState } from 'react';
import contactimage from '../assets/contactus.png';

interface ContactUsProps {
  onSubmit?: (email: string) => void;
}

const ContactUsComponent: React.FC<ContactUsProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email);
    }
    setEmail('');
  };

  return (
    <div
      className="relative  max-w-screen-2xl lg:bg-contain  bg-center bg-no-repeat before:content-[''] before:absolute "
      style={{
        backgroundImage: `url('${contactimage}')`, // Replace with your actual image path
      }}>
      <div className='relative z-10 container max-w-screen-xl mx-auto px-4 min-h-screen flex items-center justify-center'>
        <div className='w-full md:w-1/2 max-w-md ml-auto'>
          <div className='text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-2'>Get More Discount</h2>
            <h3 className='text-3xl md:text-4xl font-bold text-white mb-4'>Off Your Order</h3>
            <p className='text-white/90 text-lg mb-8'>Join our mailing list</p>

            <form onSubmit={handleSubmit} className='flex justify-center items-center  w-full  gap-2'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your email address'
                className='flex-1 px-3 py-3 rounded-lg bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200'
                required
              />
              <button type='submit' className='px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 whitespace-nowrap font-medium'>
                Shop Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsComponent;
