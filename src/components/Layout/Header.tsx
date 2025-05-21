import React, { useState, useEffect } from 'react';
import { Menu, Search, Trophy, X } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center">
          <Trophy 
            size={30} 
            className="text-primary-600 mr-2"
          />
          <span className="text-xl font-bold text-neutral-800 tracking-tight">CompetitionHub</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-neutral-700 hover:text-primary-600 transition-colors">Home</a>
          <a href="#" className="text-neutral-700 hover:text-primary-600 transition-colors">Browse</a>
          <a href="#" className="text-neutral-700 hover:text-primary-600 transition-colors">Trending</a>
          <a href="#" className="text-neutral-700 hover:text-primary-600 transition-colors">Saved</a>
          <div className="neumorphic-inset flex items-center px-3 py-2 rounded-lg">
            <Search size={16} className="text-neutral-500 mr-2" />
            <input
              type="text"
              placeholder="Search competitions..."
              className="bg-transparent text-sm focus:outline-none placeholder-neutral-500 w-40"
            />
          </div>
          <Button variant="neumorphic">Sign In</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden neumorphic p-2 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-neutral-700" />
          ) : (
            <Menu size={24} className="text-neutral-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <a href="#" className="text-neutral-700 hover:text-primary-600 transition-colors py-2">Home</a>
            <a href="#" className="text-neutral-700 hover:text-primary-600 transition-colors py-2">Browse</a>
            <a href="#" className="text-neutral-700 hover:text-primary-600 transition-colors py-2">Trending</a>
            <a href="#" className="text-neutral-700 hover:text-primary-600 transition-colors py-2">Saved</a>
            <div className="neumorphic-inset flex items-center px-3 py-2 rounded-lg">
              <Search size={16} className="text-neutral-500 mr-2" />
              <input
                type="text"
                placeholder="Search competitions..."
                className="bg-transparent text-sm focus:outline-none placeholder-neutral-500 w-full"
              />
            </div>
            <Button variant="neumorphic" className="w-full mt-2">Sign In</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;