import React from 'react';
import NavbarLayout from './layouts/NavbarLayout';
import HeroComponent from './components/HeroComponent';
import WeCreateComponent from './components/WeCreateComponent';
import NewProductComponent from './components/NewProductComponent';

const App = () => {
  return (
    <div className='font-saira'>
      <NavbarLayout />
      <HeroComponent />
      <WeCreateComponent />
      <NewProductComponent />
    </div>
  );
};

export default App;
