import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestimonials, setPage } from '../redux/async/testimonialSlice';
import { RootState, AppDispatch } from '../redux/store';
import aboutimage from '../assets/about.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AboutUsComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { testimonials, page, totalPages, status } = useSelector((state: RootState) => state.testimonials);

  // Fetch testimonials on page change
  useEffect(() => {
    dispatch(fetchTestimonials({ page }));
  }, [dispatch, page]);

  // Handlers for pagination
  const handlePrev = useCallback(() => {
    if (page > 1) dispatch(setPage(page - 1));
  }, [dispatch, page]);

  const handleNext = useCallback(() => {
    if (page < totalPages) dispatch(setPage(page + 1));
  }, [dispatch, page]);

  // Render based on status
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex items-center justify-center h-full" role="status">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-gray-500"></div>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">Failed to load testimonials.</p>
          </div>
        );
      case 'succeeded':
        if (testimonials.length === 0) return <p>No testimonials available.</p>;
        return (
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={testimonials[0].image}
                  alt={testimonials[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{testimonials[0].name}</h3>
                <p className="text-gray-600">{testimonials[0].title}</p>
              </div>
            </div>

            <p className="text-gray-700 text-lg mb-6">"{testimonials[0].message}"</p>

            <div className="flex gap-2">
              <button
                aria-label="previous"
                className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md border ${
                  page === 1 ? 'bg-white text-gray-400 cursor-not-allowed' : 'bg-white text-black hover:shadow-lg'
                }`}
                onClick={handlePrev}
                disabled={page === 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                aria-label="next"
                className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md ${
                  page === totalPages
                    ? 'bg-teal-300 text-white cursor-not-allowed'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
                onClick={handleNext}
                disabled={page === totalPages}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="flex lg:flex-row flex-col gap-8 items-center max-w-screen-xl mx-auto p-4 h-screen">
      {/* Testimonial Content */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-8">What People Are Saying About Us</h2>
        <div className="min-h-[200px] flex flex-col justify-center">{renderContent()}</div>
      </div>

      {/* Interior Image */}
      <div className="flex-1">
        <div className="rounded-lg overflow-hidden">
          <img src={aboutimage} alt="Modern interior design" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default AboutUsComponent;
