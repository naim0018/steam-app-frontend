import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiX, FiClock, FiTag, FiTrendingUp } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialQuery = '',
  placeholder = 'Search by name, category, or App ID...'
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [categories] = useState<string[]>([
    'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation',
    'Sports', 'Racing', 'Indie', 'Casual', 'Puzzle'
  ]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory).slice(0, 5));
      } catch (e) {
        console.error('Failed to parse search history', e);
      }
    }
  }, []);

  // Handle clicks outside the search component to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const saveToHistory = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    const newHistory = [
      searchTerm,
      ...searchHistory.filter(item => item !== searchTerm)
    ].slice(0, 5);
    
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Clear any existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Set a new debounce timer
    debounceTimerRef.current = setTimeout(() => {
      if (value.trim()) {
        onSearch(value);
        updateQueryParam(value);
      }
    }, 500); // 500ms debounce delay
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      updateQueryParam(query);
      saveToHistory(query);
      setShowSuggestions(false);
      
      // Redirect to search page if not already there
      if (!window.location.pathname.includes('/search')) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    updateQueryParam('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    updateQueryParam(suggestion);
    saveToHistory(suggestion);
    setShowSuggestions(false);
  };

  const updateQueryParam = (searchQuery: string) => {
    const params = new URLSearchParams(window.location.search);
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    
    // Update URL without refreshing the page
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full bg-gray-800 text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search"
        />
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            aria-label="Clear search"
          >
            <FiX size={18} />
          </button>
        )}
      </form>

      {showSuggestions && (
        <div className="absolute z-10 mt-2 w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {searchHistory.length > 0 && (
            <div className="p-2">
              <div className="flex items-center text-gray-400 text-sm px-3 py-2">
                <FiClock className="mr-2" />
                <span>Recent Searches</span>
              </div>
              {searchHistory.map((item, index) => (
                <button
                  key={`history-${index}`}
                  onClick={() => handleSuggestionClick(item)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white rounded"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
          
          <div className="p-2 border-t border-gray-700">
            <div className="flex items-center text-gray-400 text-sm px-3 py-2">
              <FiTag className="mr-2" />
              <span>Categories</span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {categories.map((category, index) => (
                <button
                  key={`category-${index}`}
                  onClick={() => handleSuggestionClick(category)}
                  className="text-left px-4 py-2 hover:bg-gray-700 text-white rounded"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-2 border-t border-gray-700">
            <div className="flex items-center text-gray-400 text-sm px-3 py-2">
              <FiTrendingUp className="mr-2" />
              <span>Search Tips</span>
            </div>
            <div className="px-4 py-2 text-gray-300 text-sm">
              <p>• Search by game name: "Half-Life", "Portal"</p>
              <p>• Search by category: "Action", "RPG"</p>
              <p>• Search by App ID: "220", "400"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 