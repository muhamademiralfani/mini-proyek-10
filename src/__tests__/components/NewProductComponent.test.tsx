import React from 'react';
import { render, screen } from '@testing-library/react';
import NewProductComponent from '../../components/NewProductComponent';

describe('NewProductComponent', () => {
  // Mock gambar chair
  jest.mock('../../assets/chair.png', () => 'mocked-chair-image');

  beforeEach(() => {
    render(<NewProductComponent />);
  });

  test('renders the component with correct headings', () => {
    // Periksa judul utama
    expect(screen.getByText('New In')).toBeInTheDocument();
    expect(screen.getByText('Store Now')).toBeInTheDocument();
  });

  test('renders product description', () => {
    expect(screen.getByText('Get the latest items immediately with promo prices')).toBeInTheDocument();
  });

  test('renders "Check All" link', () => {
    const checkAllLink = screen.getByText('Check All');
    expect(checkAllLink).toBeInTheDocument();
    expect(checkAllLink).toHaveAttribute('href', '#');
  });

  test('renders correct number of products', () => {
    const productNames = ['Chair', 'Bed', 'Cupboard', 'Lighting', 'Table', 'Sofa'];

    productNames.forEach((name) => {
      const productElements = screen.getAllByText(name);
      expect(productElements.length).toBeGreaterThan(0);
    });
  });

  test('renders product images', () => {
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(6); // Sesuai dengan jumlah produk
  });

  test('product images have correct attributes', () => {
    const images = screen.getAllByRole('img');

    images.forEach((img, index) => {
      const productNames = ['Chair', 'Bed', 'Cupboard', 'Lighting', 'Table', 'Sofa'];

      expect(img).toHaveAttribute('alt', productNames[index]);
      expect(img).toHaveClass('w-full');
      expect(img).toHaveClass('h-auto');
    });
  });

  test('product containers have correct classes', () => {
    const productContainers = screen.getAllByText(/Chair|Bed|Cupboard|Lighting|Table|Sofa/).map((el) => el.closest('div'));

    productContainers.forEach((container) => {
      expect(container).toHaveClass('relative');
      expect(container).toHaveClass('min-w-[200px]');
      expect(container).toHaveClass('flex-shrink-0');
    });
  });
});
