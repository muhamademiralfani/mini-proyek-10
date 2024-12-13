import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AboutUsComponent from '../../components/AboutUsComponent';
import { fetchTestimonials, setPage } from '../../redux/async/testimonialSlice';

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid='chevron-left'>ChevronLeft</div>,
  ChevronRight: () => <div data-testid='chevron-right'>ChevronRight</div>,
}));

// Mock the image import
jest.mock('../../assets/about.png', () => 'mocked-about-image.png');

const mockStore = configureMockStore([thunk]);

describe('AboutUsComponent', () => {
  const mockTestimonial = {
    id: 1,
    name: 'John Doe',
    title: 'CEO',
    message: 'Great service!',
    image: 'profile.jpg',
  };

  // Test loading state
  test('renders loading spinner when status is loading', () => {
    const store = mockStore({
      testimonials: {
        testimonials: [],
        status: 'loading',
        page: 1,
        totalPages: 1,
      },
    });

    render(
      <Provider store={store}>
        <AboutUsComponent />
      </Provider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // Test error state
  test('renders error message when status is failed', () => {
    const store = mockStore({
      testimonials: {
        testimonials: [],
        status: 'failed',
        page: 1,
        totalPages: 1,
      },
    });

    render(
      <Provider store={store}>
        <AboutUsComponent />
      </Provider>
    );

    expect(screen.getByText('Failed to load testimonials.')).toBeInTheDocument();
  });

  // Test successful state with testimonials
  test('renders testimonial content when status is succeeded', () => {
    const store = mockStore({
      testimonials: {
        testimonials: [mockTestimonial],
        status: 'succeeded',
        page: 1,
        totalPages: 2,
      },
    });

    render(
      <Provider store={store}>
        <AboutUsComponent />
      </Provider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('CEO')).toBeInTheDocument();
    expect(screen.getByText('"Great service!"')).toBeInTheDocument();
  });

  // Test empty testimonials state
  test('renders no testimonials message when there are no testimonials', () => {
    const store = mockStore({
      testimonials: {
        testimonials: [],
        status: 'succeeded',
        page: 1,
        totalPages: 0,
      },
    });

    render(
      <Provider store={store}>
        <AboutUsComponent />
      </Provider>
    );
  });

  // Test pagination - Previous button
  test('previous button is disabled on first page', () => {
    const store = mockStore({
      testimonials: {
        testimonials: [mockTestimonial],
        status: 'succeeded',
        page: 1,
        totalPages: 2,
      },
    });

    render(
      <Provider store={store}>
        <AboutUsComponent />
      </Provider>
    );

    const prevButton = screen.getByLabelText('previous');
    expect(prevButton).toBeDisabled();
  });

  // Test pagination - Next button
  test('next button is disabled on last page', () => {
    const store = mockStore({
      testimonials: {
        testimonials: [mockTestimonial],
        status: 'succeeded',
        page: 2,
        totalPages: 2,
      },
    });

    render(
      <Provider store={store}>
        <AboutUsComponent />
      </Provider>
    );

    const nextButton = screen.getByLabelText('next');
    expect(nextButton).toBeDisabled();
  });

  // Test pagination navigation
  test('clicking next button dispatches setPage action', () => {
    const store = mockStore({
      testimonials: {
        testimonials: [mockTestimonial],
        status: 'succeeded',
        page: 1,
        totalPages: 2,
      },
    });

    render(
      <Provider store={store}>
        <AboutUsComponent />
      </Provider>
    );

    const nextButton = screen.getByLabelText('next');
    fireEvent.click(nextButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(setPage(2));
  });

  // Test useEffect hook
  test('dispatches fetchTestimonials on mount', () => {
    const store = mockStore({
      testimonials: {
        testimonials: [],
        status: 'loading',
        page: 1,
        totalPages: 1,
      },
    });

    render(
      <Provider store={store}>
        <AboutUsComponent />
      </Provider>
    );

    const actions = store.getActions();
    expect(actions).toContainEqual(
      expect.objectContaining({
        type: fetchTestimonials.pending.type,
      })
    );
  });

  // Test image rendering
  test('renders about image', () => {
    const store = mockStore({
      testimonials: {
        testimonials: [mockTestimonial],
        status: 'succeeded',
        page: 1,
        totalPages: 1,
      },
    });

    render(
      <Provider store={store}>
        <AboutUsComponent />
      </Provider>
    );

    const image = screen.getByAltText('Modern interior design');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mocked-about-image.png');
  });
});
