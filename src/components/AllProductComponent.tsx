import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPage } from '../redux/async/productSlice';
import { RootState, AppDispatch } from '../redux/store';

const AllProductComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, page, totalPages, status, error } = useSelector((state: RootState) => state.products);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({ page }));
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [page, dispatch]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setIsVisible(false);
      setTimeout(() => {
        dispatch(setPage(newPage));
        setIsVisible(true);
      }, 300);
    }
  };

  const fillEmptyProducts = (products: any[], total: number) => {
    const emptySlots = total - products.length;
    return [
      ...products,
      ...Array(emptySlots).fill({ id: null, title: '', image: '', price: 0, price_after_discount: null }),
    ];
  };

  const productsWithPlaceholders = fillEmptyProducts(products, 8);

  return (
    <section id="features" className="container max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-center mb-4">All Product</h1>
      <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
        The products we provide only for you as our service are selected from the best products with number 1 quality
        in the world.
      </p>

      {status === 'loading' && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-500" role="status"></div>
        </div>
      )}

      {status === 'failed' && <p className="text-center text-red-500">Error: {error}</p>}

      {status === 'succeeded' && (
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
          }`}
        >
          {productsWithPlaceholders.map((product, index) => (
            <div
              key={index}
              role="article"
              className={`border rounded-lg p-2 sm:p-4 shadow-md hover:shadow-lg transition duration-300 ${
                !product.id && 'invisible'
              }`}
            >
              <div className="h-52 w-full mb-2 sm:mb-4">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
              {product.id && (
                <div className="px-1 sm:px-2">
                  <h2 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2 truncate">{product.title}</h2>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-primary font-bold text-xs sm:text-base">
                      ${product.price_after_discount?.toFixed(2) || product.price.toFixed(2)}
                    </span>
                    {product.price_after_discount && (
                      <span className="line-through text-gray-400 text-xs sm:text-sm">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {status === 'succeeded' && products.length === 0 && <p className="text-center text-gray-500">No products available.</p>}

      {/* Custom Pagination */}
      <div
        className={`flex justify-center items-center mt-8 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}
      >
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg ${
            page === 1 ? 'text-gray-300' : 'text-black hover:bg-gray-200'
          }`}
        >
          &larr;
        </button>

        <div className="flex gap-3 mx-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`w-4 h-4 rounded-full ${
                page === index + 1 ? 'bg-black' : 'bg-white border border-black hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg ${
            page === totalPages ? 'text-gray-300 bg-white' : 'text-black hover:bg-gray-200'
          }`}
        >
          &rarr;
        </button>
      </div>
    </section>
  );
};

export default AllProductComponent;
