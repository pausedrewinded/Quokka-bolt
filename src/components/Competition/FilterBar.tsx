import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FilterOptions, CompetitionCategory, EntryDifficulty } from '../../types/types';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../ui/Button';

interface FilterBarProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = ['All', ...Object.values(CompetitionCategory)];
  const difficulties = ['All', ...Object.values(EntryDifficulty)];

  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      category: 'All',
      prizeRange: null,
      endDate: null,
      difficulty: 'All',
      search: '',
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="neumorphic mb-8">
      <div className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <Filter size={20} className="text-primary-600 mr-2" />
          <h2 className="text-lg font-semibold text-neutral-800">Filters</h2>
        </div>

        <div className="flex items-center space-x-3">
          <div className="neumorphic-inset flex items-center px-3 py-2 rounded-lg">
            <input
              type="text"
              placeholder="Search competitions..."
              className="bg-transparent text-sm focus:outline-none placeholder-neutral-500 w-48 md:w-64"
              value={localFilters.search}
              onChange={(e) => {
                setLocalFilters({ ...localFilters, search: e.target.value });
                setFilters({ ...filters, search: e.target.value });
              }}
            />
          </div>
          <Button 
            variant="neumorphic" 
            size="sm"
            onClick={toggleExpand}
            className="md:hidden"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <Button
            variant="neumorphic"
            size="sm"
            onClick={handleResetFilters}
          >
            <X size={16} className="mr-1" />
            Reset
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isExpanded || window.innerWidth >= 768 ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0 border-t border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Category
              </label>
              <select
                className="neumorphic-input rounded-lg text-sm"
                value={localFilters.category}
                onChange={(e) => setLocalFilters({
                  ...localFilters,
                  category: e.target.value as CompetitionCategory | 'All'
                })}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Prize Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="neumorphic-input rounded-lg text-sm w-full"
                  value={localFilters.prizeRange ? localFilters.prizeRange[0] : ''}
                  onChange={(e) => {
                    const min = parseInt(e.target.value) || 0;
                    const max = localFilters.prizeRange ? localFilters.prizeRange[1] : 100000;
                    setLocalFilters({
                      ...localFilters,
                      prizeRange: [min, max]
                    });
                  }}
                />
                <span className="text-neutral-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="neumorphic-input rounded-lg text-sm w-full"
                  value={localFilters.prizeRange ? localFilters.prizeRange[1] : ''}
                  onChange={(e) => {
                    const max = parseInt(e.target.value) || 100000;
                    const min = localFilters.prizeRange ? localFilters.prizeRange[0] : 0;
                    setLocalFilters({
                      ...localFilters,
                      prizeRange: [min, max]
                    });
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                End Date Before
              </label>
              <input
                type="date"
                className="neumorphic-input rounded-lg text-sm"
                value={localFilters.endDate || ''}
                onChange={(e) => setLocalFilters({
                  ...localFilters,
                  endDate: e.target.value || null
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Entry Difficulty
              </label>
              <select
                className="neumorphic-input rounded-lg text-sm"
                value={localFilters.difficulty}
                onChange={(e) => setLocalFilters({
                  ...localFilters,
                  difficulty: e.target.value as EntryDifficulty | 'All'
                })}
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3 md:hidden">
            <Button
              variant="neumorphic"
              size="sm"
              onClick={handleResetFilters}
            >
              <X size={16} className="mr-1" />
              Reset
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FilterBar;