import React, { useState } from 'react';
import { format } from 'date-fns';
import { Bookmark, Calendar, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Competition, EntryDifficulty } from '../../types/types';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface CompetitionCardProps {
  competition: Competition;
  onToggleSave: (id: string) => void;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition, onToggleSave }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const difficultyColor = {
    [EntryDifficulty.EASY]: 'success',
    [EntryDifficulty.MEDIUM]: 'warning',
    [EntryDifficulty.HARD]: 'error',
  } as const;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const formatPrizeValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div 
      className="neumorphic p-0 overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img 
          src={competition.imageUrl} 
          alt={competition.title} 
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => onToggleSave(competition.id)}
          className="absolute top-4 right-4 neumorphic p-2 rounded-full transition-all duration-300 hover:shadow-neumorphic-sm active:shadow-neumorphic-sm-inset"
        >
          <Bookmark 
            size={18} 
            fill={competition.isSaved ? '#6366f1' : 'none'} 
            className={competition.isSaved ? 'text-primary-600' : 'text-neutral-600'}
          />
        </button>
        <div className="absolute bottom-4 left-4">
          <Badge variant='primary' className="text-xs">
            {competition.category}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-xl text-neutral-800 mb-2 line-clamp-2">
          {competition.title}
        </h3>
        <p className="text-neutral-600 mb-4 line-clamp-2">
          {competition.description}
        </p>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center text-neutral-600">
            <Calendar size={16} className="mr-1 text-primary-500" />
            <span className="text-sm">Ends: {formatDate(competition.deadline)}</span>
          </div>
          <div className="flex items-center text-neutral-600">
            <Award size={16} className="mr-1 text-primary-500" />
            <span className="text-sm">Prize: {formatPrizeValue(competition.prizeValue)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <Badge 
            variant={difficultyColor[competition.entryDifficulty]} 
            className="text-xs"
          >
            {competition.entryDifficulty} to Enter
          </Badge>
          <span className="text-sm text-neutral-600">Sponsor: {competition.sponsor}</span>
        </div>

        <div className="flex mt-5 space-x-3">
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => window.open(competition.entryUrl, '_blank')}
          >
            Enter Now
          </Button>
          <Button
            variant="neumorphic"
            className="flex-none px-3"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-neutral-200 mt-4">
                <h4 className="font-medium text-neutral-800 mb-2">Entry Requirements:</h4>
                <ul className="text-sm text-neutral-600 space-y-1 mb-4">
                  {competition.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-500 mr-2">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="font-medium text-neutral-800 mb-2">Eligibility:</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  {competition.eligibility.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CompetitionCard;