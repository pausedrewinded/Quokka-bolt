import React, { useState } from 'react';
import { Plus, Filter, ArrowUpDown } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Competition } from '../../types/types';
import CompetitionForm from '../../components/Admin/CompetitionForm';
import CompetitionTable from '../../components/Admin/CompetitionTable';

const CompetitionModule: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

  const handleEdit = (competition: Competition) => {
    setSelectedCompetition(competition);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Competition Management</h1>
          <p className="text-gray-600 mt-1">Manage all your competitions in one place</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedCompetition(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Competition
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="neumorphic">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="neumorphic">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <select className="neumorphic-input rounded-lg text-sm">
                <option value="active">Active</option>
                <option value="archived">Archived</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
          </div>
        </div>

        <CompetitionTable onEdit={handleEdit} />
      </div>

      {isFormOpen && (
        <CompetitionForm
          competition={selectedCompetition}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default CompetitionModule;