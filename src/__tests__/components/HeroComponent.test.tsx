import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import HeroComponent from '../../components/HeroComponent';

// Mock Redux Store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock fetchHeader Action
jest.mock('../../redux/async/headerSlice', () => ({
  fetchHeader: jest.fn(() => ({ type: 'header/fetchHeader/pending' })),
}));

describe('HeroComponent', () => {
  it('renders loading state correctly', () => {
    const store = mockStore({
      header: { title: '', description: '', banner: '', status: 'loading' },
      data: { experience: '', country: '', sold: '', variant: '', status: 'idle' },
    });

    render(
      <Provider store={store}>
        <HeroComponent />
      </Provider>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const store = mockStore({
      header: { title: '', description: '', banner: '', status: 'failed' },
      data: { experience: '', country: '', sold: '', variant: '', status: 'idle' },
    });

    render(
      <Provider store={store}>
        <HeroComponent />
      </Provider>
    );

    expect(screen.getByText(/failed to load header data/i)).toBeInTheDocument();
  });

  it('renders success state correctly', () => {
    const store = mockStore({
      header: {
        title: 'Welcome to Our Store',
        description: 'Find the best furniture for your home.',
        banner: 'test-banner-url.jpg',
        status: 'succeeded',
      },
      data: {
        experience: '7',
        country: '2',
        sold: '10k+',
        variant: '250+',
        status: 'succeeded',
      },
    });

    render(
      <Provider store={store}>
        <HeroComponent />
      </Provider>
    );

    expect(screen.getByText(/welcome to our store/i)).toBeInTheDocument();
    expect(screen.getByText(/find the best furniture for your home/i)).toBeInTheDocument();
    expect(screen.getByText(/7/i)).toBeInTheDocument(); // Verifying StatsDisplay renders correctly
    expect(screen.getByText(/year experience/i)).toBeInTheDocument();
  });
});
