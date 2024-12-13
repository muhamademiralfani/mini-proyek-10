import { render, screen } from '@testing-library/react';
import BestFurnitureComponent from '../../components/BestFurnitureComponent';

describe('BestFurnitureComponent', () => {
  it('renders the Best Furniture heading correctly', () => {
    render(<BestFurnitureComponent />);
    const headingElement = screen.getByText('The Best Furniture Manufacturer Of Your Choice');
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the paragraph text correctly', () => {
    render(<BestFurnitureComponent />);
    const paragraphElement = screen.getByText(
      'Furnitre power is a software as services for multipurpose business management system, especially for them who are running two or more business explore the future Furnitre power is a software as services'
    );
    expect(paragraphElement).toBeInTheDocument();
  });

  it('renders the image correctly', () => {
    render(<BestFurnitureComponent />);
    const imageElement = screen.getByRole('img', { name: 'best-furniture' });
    expect(imageElement).toBeInTheDocument();
  });
});
