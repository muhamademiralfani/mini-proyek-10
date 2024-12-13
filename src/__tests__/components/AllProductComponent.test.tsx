import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AllProductComponent from '../../components/AllProductComponent';

// Mock Redux actions
jest.mock('../../redux/async/productSlice', () => ({
  fetchProducts: jest.fn(() => ({ type: 'products/fetchProducts/pending' })),
  setPage: jest.fn((page) => ({ type: 'products/setPage', payload: page })),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('AllProductComponent', () => {
  it('renders loading state correctly', () => {
    const store = mockStore({
      products: {
        products: [],
        page: 1,
        totalPages: 1,
        status: 'loading',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <AllProductComponent />
      </Provider>
    );

    // Verify spinner is present
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const store = mockStore({
      products: {
        products: [],
        page: 1,
        totalPages: 1,
        status: 'failed',
        error: 'Failed to fetch products',
      },
    });

    render(
      <Provider store={store}>
        <AllProductComponent />
      </Provider>
    );

    expect(screen.getByText(/error: failed to fetch products/i)).toBeInTheDocument();
  });

  it('renders products correctly when data is available', () => {
    const store = mockStore({
      products: {
        products: [
          {
            id: 1,
            title: 'Ceiling Light',
            image: 'https://example.com/ceiling-light.jpg',
            price: 75,
            price_after_discount: 70,
          },
        ],
        page: 1,
        totalPages: 1,
        status: 'succeeded',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <AllProductComponent />
      </Provider>
    );

    expect(screen.getByText(/ceiling light/i)).toBeInTheDocument();
    expect(screen.getByText('$70.00')).toBeInTheDocument();
    expect(screen.getByText('$75.00')).toBeInTheDocument();
  });

  it('renders placeholders for empty slots when products are less than 8', () => {
    const store = mockStore({
      products: {
        products: [
          {
            id: 1,
            title: 'Ceiling Light',
            image: 'https://example.com/ceiling-light.jpg',
            price: 75,
            price_after_discount: 70,
          },
        ],
        page: 1,
        totalPages: 1,
        status: 'succeeded',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <AllProductComponent />
      </Provider>
    );

    const productCards = screen.getAllByRole('article');
    expect(productCards).toHaveLength(8); // Ensure placeholders are rendered
  });

  it('dispatches setPage when pagination buttons are clicked', () => {
    const store = mockStore({
      products: {
        products: [],
        page: 1,
        totalPages: 3,
        status: 'succeeded',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <AllProductComponent />
      </Provider>
    );

    const nextPageButton = screen.getByText(/→/i);
    fireEvent.click(nextPageButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(expect.objectContaining({ type: 'products/setPage', payload: 2 }));
  });
});
