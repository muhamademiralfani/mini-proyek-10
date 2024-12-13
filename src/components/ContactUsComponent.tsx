import React, { useState } from 'react';
import contactimage from '../assets/contactus.png';
import { useDispatch, useSelector } from 'react-redux';
import { postSubscription } from '../redux/async/contactSlice';
import { RootState, AppDispatch } from '../redux/store';

const ContactUsComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, error, message } = useSelector((state: RootState) => state.contact);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(postSubscription(email));
    setEmail('');
  };

  return (
    <section
      id='contact'
      className='w-full h-[400px] md:h-[500px] relative overflow-hidden'
      style={{
        backgroundImage: `url(${contactimage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <div className='relative z-10 w-full h-full flex justify-end items-center px-6 md:px-12 max-w-screen-xl mx-auto text-center lg:text-start'>
        <div className='w-full md:w-5/6 max-w-md'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-2'>Get more discount</h2>
            <h3 className='text-2xl md:text-3xl font-bold text-white mb-4'>Off your order</h3>
            <p className='text-white/90 text-base mb-6'>Join our mailing list</p>

            <form onSubmit={handleSubmit} className='flex items-center gap-3 justify-center w-full mx-auto'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your email address'
                className='flex-1 px-2 py-2.5 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200'
                required
              />
              <button type='submit' className='px-6 lg:py-2.5 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors duration-200 text-xl font-medium whitespace-nowrap'>
                {status === 'loading' ? 'Submitting...' : 'Shop Now'}
              </button>
            </form>

            {status === 'succeeded' && <p className='mt-4 text-green-500'>{message || 'Subscribed successfully!'}</p>}
            {status === 'failed' && <p className='mt-4 text-red-500'>{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsComponent;
