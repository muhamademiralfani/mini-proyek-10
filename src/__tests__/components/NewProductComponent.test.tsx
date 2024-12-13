import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import NewProductComponent from '../../components/NewProductComponent';

// Mock Redux Store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock fetchCategories Action
jest.mock('../../redux/async/categorySlice', () => ({
  fetchCategories: jest.fn(() => ({ type: 'category/fetchCategories/pending' })),
}));

describe('NewProductComponent', () => {
  it('renders loading state correctly', () => {
    const store = mockStore({
      category: { categories: [], status: 'loading', error: null },
    });

    render(
      <Provider store={store}>
        <NewProductComponent />
      </Provider>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const store = mockStore({
      category: { categories: [], status: 'failed', error: 'Error fetching categories' },
    });

    render(
      <Provider store={store}>
        <NewProductComponent />
      </Provider>
    );

    expect(screen.getByText(/error fetching categories/i)).toBeInTheDocument();
  });

  it('renders categories correctly when data is available', () => {
    const store = mockStore({
      category: {
        categories: [
          { title: 'Chair', image: 'https://example.com/chair.png' },
          { title: 'Table', image: 'https://example.com/table.png' },
        ],
        status: 'succeeded',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <NewProductComponent />
      </Provider>
    );

    expect(screen.getByAltText(/chair/i)).toBeInTheDocument();
    expect(screen.getByAltText(/table/i)).toBeInTheDocument();
  });

  it('dispatches fetchCategories action on mount', () => {
    const store = mockStore({
      category: { categories: [], status: 'idle', error: null },
    });

    render(
      <Provider store={store}>
        <NewProductComponent />
      </Provider>
    );

    const actions = store.getActions();
    expect(actions).toContainEqual(
      expect.objectContaining({
        type: 'category/fetchCategories/pending',
      })
    );
  });
});
