/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import GameCard from '@/components/GameCard';
import ErrorDisplay from '@/components/ui/ErrorDisplay';
import LoadingSection from '@/components/ui/LoadingSection';
import Pagination from '@/components/ui/Pagination';
import { useGetAllGamesQuery } from '@/redux/api/gamesApi';
import { getGameHeaderImage } from '@/redux/api/steamApi';

export default function Home() {
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage] = useState(24); // Number of games per page
  
  const { 
    data: games, 
    isLoading, 
    error, 
    refetch 
  } = useGetAllGamesQuery({ 
    page: currentPage,
    limit: itemsPerPage,
  });
  console.log(games)
  // Update page when URL changes
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParams, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = games?.meta?.totalPages || 1;

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Steam Games Explorer</h1>
        
        {error ? (
          <ErrorDisplay 
            message="Failed to load games" 
            details={(error as any)?.data?.message || 'Unknown error'} 
            onRetry={refetch}
          />
        ) : isLoading ? (
          <LoadingSection title="Loading games..." />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                All Games ({games?.meta?.totalGames || 0})
              </h2>
            </div>
            
            {games?.data.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium text-white mb-2">No games found</h3>
                <p className="text-gray-400">
                  Please try again later.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {games?.data.map((game) => (
                    <GameCard 
                      key={game.appid} 
                      appid={game.appid} 
                      name={game.name} 
                      imageUrl={getGameHeaderImage(game.appid)}
                    />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
