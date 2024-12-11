import React from 'react';

interface Stat {
  number: string;
  label: string;
}

const StatsDisplay: React.FC = () => {
  const stats: Stat[] = [
    { number: '7', label: 'Year Experience' },
    { number: '2', label: 'Opened in the country' },
    { number: '10k+', label: 'Furniture sold' },
    { number: '260+', label: 'Variant Furniture' },
  ];

  return (
    <div className='bg-teal-600 rounded-lg p-6 w-full mx-auto'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {stats.map((stat, index) => (
          <div key={index} className='relative flex flex-col items-center justify-center text-center p-4'>
            <span className='text-4xl font-bold text-white mb-2'>{stat.number}</span>
            <span className='text-white text-sm md:text-base whitespace-pre-wrap max-w-[120px]'>{stat.label}</span>
            {index < stats.length - 1 && <div className='hidden md:block absolute top-1/2 right-0 h-3/4 w-px bg-white/20 transform -translate-y-1/2' />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsDisplay;
