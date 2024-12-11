import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroComponent from '../../components/HeroComponent';

jest.mock('../../components/UI/StatsDisplay', () => jest.fn(() => <div data-testid='stats-display'>Mock StatsDisplay</div>));

describe('HeroComponent', () => {
  test('renders HeroComponent with background image', () => {
    render(<HeroComponent />);

    const header = screen.getByRole('banner');
    expect(header).toHaveStyle({
      background: expect.stringContaining('hero-banner.png'), // Check if the background contains the image path
    });
    expect(header).toHaveStyle('height: 135vh');
  });

  test('renders main title', () => {
    render(<HeroComponent />);
    const title = screen.getByText('Creative Home Simpify your Furniture');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('font-bold');
  });

  test('renders paragraph text', () => {
    render(<HeroComponent />);
    const paragraph = screen.getByText(/Do i have consent to record this meeting gain locaion, root-and-branch, review, nor game plan who’s the goto/i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('text-base');
  });

  test('renders "Shop Now" button', () => {
    render(<HeroComponent />);
    const button = screen.getByRole('button', { name: /shop now/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('px-10');
  });

  test('renders StatsDisplay component', () => {
    render(<HeroComponent />);
    const statsDisplay = screen.getByTestId('stats-display');
    expect(statsDisplay).toBeInTheDocument();
  });
});
