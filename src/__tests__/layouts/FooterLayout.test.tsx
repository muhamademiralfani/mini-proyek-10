import { render, screen } from '@testing-library/react';
import FooterLayout from '../../layouts/FooterLayout';

jest.mock('react-share', () => ({
  FacebookShareButton: jest.fn(({ children }) => <div data-testid='facebook'>{children}</div>),
  TwitterShareButton: jest.fn(({ children }) => <div data-testid='twitter'>{children}</div>),
  WhatsappShareButton: jest.fn(({ children }) => <div data-testid='whatsapp'>{children}</div>),
  LinkedinShareButton: jest.fn(({ children }) => <div data-testid='linkedin'>{children}</div>),
  FacebookIcon: jest.fn(() => <div data-testid='facebook-icon' />),
  TwitterIcon: jest.fn(() => <div data-testid='twitter-icon' />),
  WhatsappIcon: jest.fn(() => <div data-testid='whatsapp-icon' />),
  LinkedinIcon: jest.fn(() => <div data-testid='linkedin-icon' />),
}));

describe('FooterLayout Component', () => {
  it('renders the footer title', () => {
    render(<FooterLayout />);
    expect(screen.getByText(/FurniShop/i)).toBeInTheDocument();
  });

  it('renders social media buttons', () => {
    render(<FooterLayout />);
    expect(screen.getByTestId('facebook')).toBeInTheDocument();
    expect(screen.getByTestId('twitter')).toBeInTheDocument();
    expect(screen.getByTestId('whatsapp')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin')).toBeInTheDocument();
  });

  it('renders social media icons', () => {
    render(<FooterLayout />);
    expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
    expect(screen.getByTestId('whatsapp-icon')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
  });

  it('renders all footer sections', () => {
    render(<FooterLayout />);
    const sectionTitles = ['Our Products', 'Top Features', 'Resources', 'Company', 'Favourite Things'];
    sectionTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders footer links', () => {
    render(<FooterLayout />);
    const links = [
      'The Support Suite',
      'The Sales Suite',
      'Support',
      'Guide',
      'Ticketing System',
      'Knowledge Base',
      'Community Forums',
      'Help Desk Software',
      'Product Support',
      'Request Demo',
      'Library',
      'Peoplepower Blog',
      'About Us',
      'Press',
      'Investors',
      'Events',
      'For Enterprise',
      'For Startups',
      'For Benchmark',
      'For Small Business',
    ];
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('renders copyright text', () => {
    render(<FooterLayout />);
    expect(screen.getByText(/© NameBrand 2022 - All Rights Reserved/i)).toBeInTheDocument();
  });
});
