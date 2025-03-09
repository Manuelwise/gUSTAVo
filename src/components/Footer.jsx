import React from 'react';
import HeroImage from '../assets/image/gnpclogo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white mt-auto">
      <div className="container mx-auto px-0 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-start">
        <img
          src={HeroImage} // Or replace with actual logo path if it's different
          alt="GNPC Logo"
          className="h-16 w-auto mb-4 mx-13"
        />
        <h3 className="text-xl font-bold mb-4">GNPC Records</h3>
        <p className="text-white">
          Managing and preserving our organization&apos;s history and documentation
          with modern solutions.
        </p>
      </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li><a href="https://www.gnpcghana.com/about-us/overview" className="text-white hover:text-red-300">About Us</a></li>
              <li><a href="https://www.gnpcghana.com/our-business" className="text-white hover:text-red-300">Our Business</a></li>
              <li><a href="https://www.gnpcghana.com/news" className="text-white hover:text-red-300">News</a></li>
              <li><a href="https://www.gnpcghana.com/contact-us" className="text-white hover:text-red-300">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Official Info</h3>
            <ul className="space-y-2 text-white">
              <li><a href= "" className=" hover:text-red-300">Email: archives&records@gnpc.com</a></li>
              <li><a href= "" className=" hover:text-red-300">Email: info@gnpcghana.com</a></li>
              <li>Phone: (233) 000-0000</li>
              <li>Address: GNPC Head Office</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} GNPC Records & Archives. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

