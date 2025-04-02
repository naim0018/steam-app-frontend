import React, { useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

interface SearchFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

interface FilterOptions {
  minAppId?: number;
  maxAppId?: number;
  excludeTerms?: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [minAppId, setMinAppId] = useState<string>('');
  const [maxAppId, setMaxAppId] = useState<string>('');
  const [excludeTerms, setExcludeTerms] = useState<string>('');

  const handleApplyFilters = () => {
    onFilterChange({
      minAppId: minAppId ? parseInt(minAppId) : undefined,
      maxAppId: maxAppId ? parseInt(maxAppId) : undefined,
      excludeTerms: excludeTerms || undefined
    });
  };

  const handleClearFilters = () => {
    setMinAppId('');
    setMaxAppId('');
    setExcludeTerms('');
    onFilterChange({});
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <FiFilter className="mr-2" />
        Filters
      </button>

      {showFilters && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg p-4 z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Search Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-white"
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">App ID Range</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minAppId}
                  onChange={(e) => setMinAppId(e.target.value)}
                  className="w-1/2 bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxAppId}
                  onChange={(e) => setMaxAppId(e.target.value)}
                  className="w-1/2 bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">Exclude Terms</label>
              <input
                type="text"
                placeholder="Terms to exclude (comma separated)"
                value={excludeTerms}
                onChange={(e) => setExcludeTerms(e.target.value)}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Example: demo, test, beta
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={handleClearFilters}
                className="px-3 py-1 text-sm text-gray-300 hover:text-white"
              >
                Clear
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-4 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters; 