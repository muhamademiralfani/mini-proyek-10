import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavbarLayout from '../../layouts/NavbarLayout';

describe('NavbarLayout Component', () => {
  test('renders the navbar title', () => {
    render(<NavbarLayout />);
    const title = screen.getByText('FurniShop');
    expect(title).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<NavbarLayout />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4); // Home, About, Features, Contact
  });



  

  test('changes navbar background on scroll', () => {
    render(<NavbarLayout />);
    const navbar = screen.getByRole('navigation');

    // Initially transparent
    expect(navbar).toHaveClass('bg-transparent');

    // Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    // After scrolling, it should have a white background
    expect(navbar).toHaveClass('bg-white');
  });
});
