import React from 'react';
import { Linkedin, Instagram, Globe, Twitter, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">10XerClub</h3>
          <p className="text-gray-400 mb-4">Join the club now!</p>
          <button className="group bg-amber-100 text-black dark:bg-amber-200 px-6 py-3 rounded-md inline-flex items-center hover:bg-amber-200 dark:hover:bg-amber-300 transition-colors duration-300">
            Get Access
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-gray-400 font-medium mb-4">Website</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-100 dark:hover:text-amber-200">Members Area</a></li>
              <li><a href="#" className="hover:text-amber-100 dark:hover:text-amber-200">Meet your Mentors</a></li>
              <li><a href="#" className="hover:text-amber-100 dark:hover:text-amber-200">Curriculum</a></li>
              <li><a href="#" className="hover:text-amber-100 dark:hover:text-amber-200">Resources</a></li>
              <li><a href="#" className="hover:text-amber-100 dark:hover:text-amber-200">Hire from 10Xer Club</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-100 dark:hover:text-amber-200">Terms and Conditions</a></li>
              <li><a href="#" className="hover:text-amber-100 dark:hover:text-amber-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-100 dark:hover:text-amber-200">Contact us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 font-medium mb-4">Social</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-amber-100 dark:hover:text-amber-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-amber-100 dark:hover:text-amber-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-amber-100 dark:hover:text-amber-200">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-amber-100 dark:hover:text-amber-200">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            © 2024 10Xer Club | Consciously Solutions LLP<br />
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;