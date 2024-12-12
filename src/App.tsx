import React from 'react';
import NavbarLayout from './layouts/NavbarLayout';
import HeroComponent from './components/HeroComponent';
import WeCreateComponent from './components/WeCreateComponent';
import NewProductComponent from './components/NewProductComponent';
import BestFurnitureComponent from './components/BestFurnitureComponent';
import AllProductComponent from './components/AllProductComponent';
import AboutUsComponent from './components/AboutUsComponent';
import ContactUsComponent from './components/ContactUsComponent';
import FooterLayout from './layouts/FooterLayout';

const App = () => {
  return (
    <div className='font-saira'>
      <NavbarLayout />
      <HeroComponent />
      <WeCreateComponent />
      <NewProductComponent />
      <BestFurnitureComponent />
      <AllProductComponent />
      <AboutUsComponent />
      <ContactUsComponent />
      <FooterLayout />
    </div>
  );
};

export default App;
