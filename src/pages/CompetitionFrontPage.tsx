import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Hero from '../components/Hero/Hero';
import CompetitionCard from '../components/Competition/CompetitionCard';
import FilterBar from '../components/Competition/FilterBar';
import Button from '../components/ui/Button';
import { useCompetitions } from '../hooks/useCompetitions';

const CompetitionFrontPage: React.FC = () => {
  const { competitions, loading, error, filters, setFilters, toggleSaved } = useCompetitions();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="neumorphic p-8 rounded-lg">
          <p className="text-lg text-neutral-700">Loading competitions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="neumorphic p-8 rounded-lg">
          <p className="text-lg text-error-600">{error}</p>
          <Button 
            variant="primary" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <section className="py-10">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">
                Featured Competitions
              </h2>
              <Button variant="neumorphic">
                View All
              </Button>
            </div>

            <FilterBar 
              filters={filters}
              setFilters={setFilters}
            />
            
            {competitions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="neumorphic p-12 text-center"
              >
                <h3 className="text-xl font-semibold text-neutral-700 mb-2">No competitions found</h3>
                <p className="text-neutral-600 mb-6">Try adjusting your filters to see more results.</p>
                <Button 
                  variant="primary" 
                  onClick={() => setFilters({
                    category: 'All',
                    prizeRange: null,
                    endDate: null,
                    difficulty: 'All',
                    search: '',
                  })}
                >
                  Reset Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {competitions.map((competition) => (
                  <CompetitionCard 
                    key={competition.id}
                    competition={competition}
                    onToggleSave={toggleSaved}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompetitionFrontPage