  import React, { useState, useEffect } from 'react';

  const NavbarLayout: React.FC = () => {
    const navlist: string[] = ['Home', 'About', 'Features', 'Contact'];
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
      const handleScroll = (): void => {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > window.innerHeight);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const toggleMenu = (): void => {
      setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = (): void => {
      setIsMenuOpen(false);
    };

    return (
      <>
        <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
          <div className='container max-w-screen-xl mx-auto flex items-center justify-between py-4 px-4'>
            <h1 className={`font-bold text-4xl ${isScrolled ? 'text-black' : 'text-white'}`}>FurniShop</h1>
            <ul className='hidden md:flex items-center space-x-6 md:space-x-8 lg:space-x-10'>
              {navlist.map((item, index) => (
                <li key={index}>
                  <a className={`text-base ${isScrolled ? 'text-black' : 'text-white'}`} href='#' onClick={closeMenu}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className='md:hidden'>
              <button className='focus:outline-none' onClick={toggleMenu}>
                <svg className={`w-6 h-6 ${isScrolled ? 'text-black' : 'text-white'}`} fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {isMenuOpen && (
          <div className='fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center'>
            <ul className='flex flex-col items-center justify-center space-y-6 text-2xl font-medium'>
              {navlist.map((item, index) => (
                <li key={index}>
                  <a className='text-black hover:underline' href='#' onClick={closeMenu}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <button className='absolute bottom-4 focus:outline-none' onClick={closeMenu}>
              <svg className='w-6 h-6 text-black' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        )}
      </>
    );
  };

  export default NavbarLayout;
