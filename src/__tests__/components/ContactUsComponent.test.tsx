import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ContactUsComponent from '../../components/ContactUsComponent';
import { postSubscription } from '../../redux/async/contactSlice';

jest.mock('../../redux/async/contactSlice', () => ({
  postSubscription: jest.fn(),
}));

const mockStore = configureStore([thunk]);

describe('ContactUsComponent', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      contact: {
        status: 'idle',
        message: null,
        error: null,
      },
    });
    jest.clearAllMocks();
  });

  const renderWithProvider = (component: React.ReactNode) =>
    render(<Provider store={store}>{component}</Provider>);

  it('should render the component correctly', () => {
    renderWithProvider(<ContactUsComponent />);

    expect(screen.getByPlaceholderText(/Your email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Get more discount/i)).toBeInTheDocument();
    expect(screen.getByText(/Join our mailing list/i)).toBeInTheDocument();
  });

  it('should handle email input correctly', () => {
    renderWithProvider(<ContactUsComponent />);
    const emailInput = screen.getByPlaceholderText(/Your email address/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect((emailInput as HTMLInputElement).value).toBe('test@example.com');
  });

  it('should dispatch postSubscription on form submission', async () => {
    const mockDispatch = jest.fn();
  

    render(
      <Provider store={{ ...store, dispatch: mockDispatch }}>
        <ContactUsComponent />
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/Your email address/i);
    const submitButton = screen.getByRole('button', { name: /Shop Now/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalled();
    expect(postSubscription).toHaveBeenCalledWith('test@example.com');
  });

  it('should show loading state during submission', () => {
    store = mockStore({
      contact: {
        status: 'loading',
        message: null,
        error: null,
      },
    });
    renderWithProvider(<ContactUsComponent />);

    expect(screen.getByText(/Submitting.../i)).toBeInTheDocument();
  });

  it('should display success message on subscription success', () => {
    store = mockStore({
      contact: {
        status: 'succeeded',
        message: 'Subscribed successfully!',
        error: null,
      },
    });
    renderWithProvider(<ContactUsComponent />);

    expect(screen.getByText(/Subscribed successfully!/i)).toBeInTheDocument();
  });

  it('should display error message on subscription failure', () => {
    store = mockStore({
      contact: {
        status: 'failed',
        message: null,
        error: 'This is not a valid email.',
      },
    });
    renderWithProvider(<ContactUsComponent />);

    expect(screen.getByText(/This is not a valid email./i)).toBeInTheDocument();
  });
});
