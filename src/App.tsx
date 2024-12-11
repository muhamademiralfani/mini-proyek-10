import React from 'react';
import NavbarLayout from './layouts/NavbarLayout';
import HeroComponent from './components/HeroComponent';
import WeCreateComponent from './components/WeCreateComponent';

const App = () => {
  return (
    <div className='font-saira'>
      <NavbarLayout />
      <HeroComponent />
      <WeCreateComponent />
    </div>
  );
};

export default App;
