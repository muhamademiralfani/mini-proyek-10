import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from 'react-share';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const FooterLayout: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: 'Our Products',
      links: [
        { label: 'The Support Suite', href: '#' },
        { label: 'The Sales Suite', href: '#' },
        { label: 'Support', href: '#' },
        { label: 'Guide', href: '#' },
      ],
    },
    {
      title: 'Top Features',
      links: [
        { label: 'Ticketing System', href: '#' },
        { label: 'Knowledge Base', href: '#' },
        { label: 'Community Forums', href: '#' },
        { label: 'Help Desk Software', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Product Support', href: '#' },
        { label: 'Request Demo', href: '#' },
        { label: 'Library', href: '#' },
        { label: 'Peoplepower Blog', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Investors', href: '#' },
        { label: 'Events', href: '#' },
      ],
    },
    {
      title: 'Favourite Things',
      links: [
        { label: 'For Enterprise', href: '#' },
        { label: 'For Startups', href: '#' },
        { label: 'For Benchmark', href: '#' },
        { label: 'For Small Business', href: '#' },
      ],
    },
  ];

  const shareUrl = 'https://yourwebsite.com'; // Replace with your URL

  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='px-4 container max-w-screen-xl mx-auto'>
        {/* Header with Logo and Social Links */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-8'>
          <h2 className='text-2xl font-bold mb-4 md:mb-0'>FurniShop</h2>
          <div className='flex gap-4'>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={48} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={48} round />
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={48} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={48} round />
            </LinkedinShareButton>
          </div>
        </div>

        <hr className='border-gray-500 my-8' />

        {/* Footer Links */}
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8'>
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className='font-semibold text-lg mb-4'>{section.title}</h3>
              <ul className='space-y-3'>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className='text-gray-400 hover:text-white transition-colors'>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className='text-center text-gray-400 text-sm'>
          <p>© NameBrand 2022 - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
