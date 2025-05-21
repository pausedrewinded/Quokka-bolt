import React from 'react';
import { motion } from 'framer-motion';
import { Search, Award, Gift, Clock } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="py-10 md:py-16 lg:py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6 leading-tight">
              Discover Winning <span className="text-primary-600">Opportunities</span> Every Day
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Find and enter the best sweepstakes, contests, and giveaways all in one place. 
              Track deadlines, prize values, and requirements with ease.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="primary" size="lg">
                Browse Competitions
              </Button>
              <Button variant="neumorphic" size="lg">
                How It Works
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center">
                <div className="neumorphic p-3 rounded-full mr-3">
                  <Award size={20} className="text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-800">$1M+</p>
                  <p className="text-sm text-neutral-600">In Prizes</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="neumorphic p-3 rounded-full mr-3">
                  <Gift size={20} className="text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-800">500+</p>
                  <p className="text-sm text-neutral-600">Active Contests</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="neumorphic p-3 rounded-full mr-3">
                  <Clock size={20} className="text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-800">Daily</p>
                  <p className="text-sm text-neutral-600">Updates</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="neumorphic p-6 md:p-8 rounded-3xl">
              <img 
                src="https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Competition winners" 
                className="rounded-2xl w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
            
            <div className="neumorphic absolute -bottom-6 -left-6 p-4 rounded-xl">
              <div className="flex items-center">
                <Search size={20} className="text-primary-600 mr-2" />
                <span className="font-medium text-neutral-800">Search from thousands of contests</span>
              </div>
            </div>
            
            <div className="neumorphic absolute -top-6 -right-6 p-4 rounded-xl hidden md:block">
              <div className="flex items-center">
                <Clock size={20} className="text-primary-600 mr-2" />
                <span className="font-medium text-neutral-800">Never miss a deadline</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;