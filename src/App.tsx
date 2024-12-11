import React from 'react';
import NavbarLayout from './layouts/NavbarLayout';
import HeroComponent from './components/HeroComponent';
import WeCreateComponent from './components/WeCreateComponent';
import NewProductComponent from './components/NewProductComponent';
import BestFurnitureComponent from './components/BestFurnitureComponent';

const App = () => {
  return (
    <div className='font-saira'>
      <NavbarLayout />
      <HeroComponent />
      <WeCreateComponent />
      <NewProductComponent />
      <BestFurnitureComponent />
    </div>
  );
};

export default App;
