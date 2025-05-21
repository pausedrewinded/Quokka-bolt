import React from 'react';
import { X } from 'lucide-react';
import { Competition, CompetitionCategory, EntryDifficulty } from '../../types/types';
import Button from '../ui/Button';

interface CompetitionFormProps {
  competition?: Competition | null;
  onClose: () => void;
}

const CompetitionForm: React.FC<CompetitionFormProps> = ({ competition, onClose }) => {
  const isEditing = !!competition;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Edit Competition' : 'Add New Competition'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                className="neumorphic-input rounded-lg w-full"
                defaultValue={competition?.title}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                className="neumorphic-input rounded-lg w-full"
                defaultValue={competition?.category}
              >
                {Object.values(CompetitionCategory).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                className="neumorphic-input rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                className="neumorphic-input rounded-lg w-full"
                defaultValue={competition?.deadline}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prize Value
              </label>
              <input
                type="number"
                className="neumorphic-input rounded-lg w-full"
                defaultValue={competition?.prizeValue}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entry Difficulty
              </label>
              <select
                className="neumorphic-input rounded-lg w-full"
                defaultValue={competition?.entryDifficulty}
              >
                {Object.values(EntryDifficulty).map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="neumorphic-input rounded-lg w-full h-32"
              defaultValue={competition?.description}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              className="neumorphic-input rounded-lg w-full"
              defaultValue={competition?.imageUrl}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Entry Requirements (one per line)
            </label>
            <textarea
              className="neumorphic-input rounded-lg w-full h-32"
              defaultValue={competition?.requirements.join('\n')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eligibility Criteria (one per line)
            </label>
            <textarea
              className="neumorphic-input rounded-lg w-full h-32"
              defaultValue={competition?.eligibility.join('\n')}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="neumorphic" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update Competition' : 'Create Competition'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompetitionForm;