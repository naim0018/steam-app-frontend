'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import GameCard from '@/components/GameCard';
import ErrorDisplay from '@/components/ui/ErrorDisplay';
import LoadingSection from '@/components/ui/LoadingSection';
import SearchBar from '@/components/ui/SearchBar';
import { useSearchGamesQuery } from '@/redux/api/gamesApi';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  
  const { 
    data: searchResults, 
    isLoading, 
    error 
  } = useSearchGamesQuery(searchQuery, {
    skip: !searchQuery
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search Steam Games</h1>
        
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch}
            initialQuery={searchQuery}
            placeholder="Search for games..."
          />
        </div>
        
        {error ? (
          <ErrorDisplay 
            message="Failed to search games" 
            details={(error as any)?.data?.message || 'Unknown error'} 
          />
        ) : isLoading ? (
          <LoadingSection title="Searching..." />
        ) : (
          <>
            {!searchQuery ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium text-white mb-2">Enter a search term</h3>
                <p className="text-gray-400">
                  Search for games by name, category, or App ID
                </p>
              </div>
            ) : searchResults?.data.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
                <p className="text-gray-400">
                  Try a different search term
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Search results for "{searchQuery}" ({searchResults?.meta?.totalGames || 0} games)
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {searchResults?.data.map((game) => (
                    <GameCard 
                      key={game.id} 
                      appid={game.id} 
                      name={game.name} 
                      imageUrl={game.tiny_image}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
} 