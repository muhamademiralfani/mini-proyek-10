import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeCreateComponent from '../../components/WeCreateComponent';

jest.mock('../../assets/we-create.png', () => 'we-create-mock.png');
jest.mock('../../assets/assets/cheklist.svg', () => 'checklist-mock.svg');

describe('WeCreateComponent', () => {
  test('renders the main section', () => {
    render(<WeCreateComponent />);
    const section = screen.getByTestId('we-create-section');
    expect(section).toBeInTheDocument();
  });

  test('renders the main image with correct src and alt', () => {
    render(<WeCreateComponent />);
    const mainImage = screen.getByTestId('main-image');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('alt', 'Furniture showcase');
  });

  test('renders the heading', () => {
    render(<WeCreateComponent />);
    const heading = screen.getByTestId('we-create-heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('We Create your home more aesthetic');
  });

  test('renders the description', () => {
    render(<WeCreateComponent />);
    const description = screen.getByTestId('we-create-description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('Furniture power is a software as services for multipurpose business management system.');
  });

  test('renders all services with correct titles and descriptions', () => {
    render(<WeCreateComponent />);

    const services = [
      {
        title: 'Valuation Services',
        description: 'Sometimes features require a short description. This can be detailed description',
      },
      {
        title: 'Development of Furniture Modeless',
        description: 'Sometimes features require a short description. This can be detailed description',
      },
    ];

    services.forEach((service, index) => {
      const serviceItem = screen.getByTestId(`service-item-${index}`);
      expect(serviceItem).toBeInTheDocument();

      const serviceTitle = screen.getByTestId(`service-title-${index}`);
      expect(serviceTitle).toBeInTheDocument();
      expect(serviceTitle).toHaveTextContent(service.title);

      const serviceDescription = screen.getByTestId(`service-description-${index}`);
      expect(serviceDescription).toBeInTheDocument();
      expect(serviceDescription).toHaveTextContent(service.description);

      const serviceIcon = screen.getByTestId(`service-icon-${index}`);
      expect(serviceIcon).toBeInTheDocument();
      expect(serviceIcon).toHaveAttribute('src', 'checklist-mock.svg');
      expect(serviceIcon).toHaveAttribute('alt', `Checklist icon for ${service.title}`);
    });
  });
});
