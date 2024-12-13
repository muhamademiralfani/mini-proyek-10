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
import { Helmet } from 'react-helmet';
import { SchemaProvider } from './context/SchemaContext';
import { useSchema } from './context/SchemaContext';

const App: React.FC = () => {
  const schema = useSchema();
  return (
    <SchemaProvider>
      <Helmet>
        <title>Home Page - Furniture Lumosh</title>
        <meta name='description' content='Discover the finest furniture designs at Furniture Lumosh. Explore our premium range of products crafted for comfort and style.' />
        <script type='application/ld+json'>{JSON.stringify(schema.homepage)}</script>
      </Helmet>
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
    </SchemaProvider>
  );
};

export default App;
