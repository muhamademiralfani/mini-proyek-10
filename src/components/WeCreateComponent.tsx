import React, { useEffect, useState } from 'react';
import we_create from '../assets/we-create.png';
import checklist from '../assets/cheklist.svg';

interface ServiceType {
  title: string;
  description: string;
}

const WeCreateComponent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const services: ServiceType[] = [
    {
      title: 'Valuation Services',
      description: 'Sometimes features require a short description. This can be detailed description',
    },
    {
      title: 'Development of Furniture Models',
      description: 'Sometimes features require a short description. This can be detailed description',
    },
  ];

  useEffect(() => {
    // Set visible to true after component mounts to trigger animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id='about'
      className={`flex lg:flex-row flex-col-reverse container max-w-screen-xl mx-auto min-h-screen items-center gap-12 px-4 py-16 transition-opacity duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
      }`}
      data-testid='we-create-section'>
      <div className={`lg:w-1/2 w-full transition-transform duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`} data-testid='we-create-image-container'>
        <img src={we_create} className='w-full h-auto object-cover rounded-lg shadow-lg' alt='Furniture showcase' data-testid='main-image' />
      </div>
      <div className={`lg:w-1/2 w-full flex flex-col gap-6 transition-transform duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`} data-testid='we-create-content'>
        <div className='space-y-4'>
          <h2 className='text-4xl font-semibold text-gray-900 leading-tight' data-testid='we-create-heading'>
            We Create your home more aesthetic
          </h2>
          <p className='text-gray-600 text-lg leading-relaxed max-w-xl' data-testid='we-create-description'>
            Furniture power is a software as services for multipurpose business management system.
          </p>
        </div>

        <div className='space-y-8 mt-4'>
          {services.map((service, index) => (
            <div key={index} className={`flex gap-4 transition-all duration-1000 ease-out delay-${index * 200} ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`} data-testid={`service-item-${index}`}>
              <div className='flex-shrink-0'>
                <img src={checklist} alt={`Checklist icon for ${service.title}`} data-testid={`service-icon-${index}`} />
              </div>
              <div>
                <h3 className='font-semibold text-xl text-gray-900 mb-2' data-testid={`service-title-${index}`}>
                  {service.title}
                </h3>
                <p className='text-gray-600 leading-relaxed' data-testid={`service-description-${index}`}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeCreateComponent;
