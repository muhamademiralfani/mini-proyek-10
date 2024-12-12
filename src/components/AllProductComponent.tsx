import React, { useState } from 'react';
import kursi from '../assets/kursi.png';
import lemari from '../assets/lemari.png';

type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
};

const AllProductComponent: React.FC = () => {
  const products: Product[] = [
    { id: 1, name: 'Ceiling Light', price: 75.0, oldPrice: 82.0, image: kursi },
    { id: 2, name: 'Wood Chair', price: 50.0, oldPrice: 70.0, image: lemari },
    { id: 1, name: 'Ceiling Light', price: 75.0, oldPrice: 82.0, image: kursi },
    { id: 1, name: 'Ceiling Light', price: 75.0, oldPrice: 82.0, image: kursi },
    { id: 1, name: 'Ceiling Light', price: 75.0, oldPrice: 82.0, image: kursi },
    { id: 2, name: 'Wood Chair', price: 50.0, oldPrice: 70.0, image: lemari },
    { id: 1, name: 'Ceiling Light', price: 75.0, oldPrice: 82.0, image: kursi },
    { id: 2, name: 'Wood Chair', price: 50.0, oldPrice: 70.0, image: lemari },
    { id: 1, name: 'Ceiling Light', price: 75.0, oldPrice: 82.0, image: kursi },
    { id: 2, name: 'Wood Chair', price: 50.0, oldPrice: 70.0, image: lemari },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className='container max-w-screen-xl mx-auto px-4 py-10'>
      <h1 className='text-3xl font-semibold text-center mb-4'>All Product</h1>
      <p className='text-center text-gray-500 mb-10 max-w-xl mx-auto'>The products we provide only for you as our service are selected from the best products with number 1 quality in the world.</p>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6'>
        {currentProducts.map((product) => (
          <div key={product.id} className='border rounded-lg p-2 sm:p-4 shadow-md hover:shadow-lg transition duration-300'>
            <div className='aspect-w-1 aspect-h-1 mb-2 sm:mb-4'>
              <img src={product.image} alt={product.name} className='w-full h-full object-cover rounded-md' />
            </div>
            <div className='px-1 sm:px-2'>
              <h2 className='font-semibold text-sm sm:text-lg mb-1 sm:mb-2 truncate'>{product.name}</h2>
              <div className='flex items-center gap-1 sm:gap-2'>
                <span className='text-primary font-bold text-xs sm:text-base'>${product.price.toFixed(2)}</span>
                {product.oldPrice && <span className='line-through text-gray-400 text-xs sm:text-sm'>${product.oldPrice.toFixed(2)}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center items-center mt-6 sm:mt-8 gap-2'>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-gray-300 disabled:opacity-50'>
          &larr;
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`p-1 sm:p-2 rounded-full text-xs sm:text-base ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-white border border-black hover:bg-black hover:text-white transition duration-300'}`}>
           
          </button>
        ))}

        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className='px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-gray-300 disabled:opacity-50'>
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default AllProductComponent;
