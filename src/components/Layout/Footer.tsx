import React from 'react';
import { Trophy, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-100 border-t border-neutral-200 pt-10 pb-6 mt-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Trophy size={24} className="text-primary-600 mr-2" />
              <span className="text-lg font-bold text-neutral-800">CompetitionHub</span>
            </div>
            <p className="text-neutral-600 mb-4">
              Discover and enter the best competitions, contests, and sweepstakes all in one place.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="neumorphic p-2 rounded-full hover:shadow-neumorphic-sm transition-all duration-300">
                <Instagram size={18} className="text-neutral-700" />
              </a>
              <a href="#" className="neumorphic p-2 rounded-full hover:shadow-neumorphic-sm transition-all duration-300">
                <Twitter size={18} className="text-neutral-700" />
              </a>
              <a href="#" className="neumorphic p-2 rounded-full hover:shadow-neumorphic-sm transition-all duration-300">
                <Facebook size={18} className="text-neutral-700" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-neutral-800 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-neutral-600">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Browse All</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Saved Competitions</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">How It Works</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-neutral-800 font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-neutral-600">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Sweepstakes</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Contests</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Giveaways</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Promotions</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Raffles</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-neutral-800 font-semibold mb-4">Help & Info</h3>
            <ul className="space-y-2 text-neutral-600">
              <li><a href="#" className="hover:text-primary-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-200 mt-8 pt-6 text-center text-neutral-500 text-sm">
          <p>&copy; {new Date().getFullYear()} CompetitionHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;