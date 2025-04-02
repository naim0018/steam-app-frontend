import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Game } from '@/redux/api/steamApi';
import { getGameHeaderImage } from '@/redux/api/steamApi';

interface FeaturedGamesProps {
  games: Game[];
  isLoading?: boolean;
}

const FeaturedGames: React.FC<FeaturedGamesProps> = ({ games, isLoading = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-rotate featured games
  useEffect(() => {
    if (!games || games.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [games]);
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (games?.length || 1)) % (games?.length || 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (games?.length || 1));
  };
  
  if (isLoading) {
    return (
      <div className="relative w-full h-96 bg-gray-800 rounded-xl overflow-hidden mb-12 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <div className="h-8 w-64 bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-700 rounded mb-6"></div>
          <div className="h-10 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!games || games.length === 0) {
    return null;
  }
  
  const currentGame = games[currentIndex];
  
  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden mb-12 group">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
      
      <Image
        src={getGameHeaderImage(currentGame.appid)}
        alt={currentGame.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority
        unoptimized
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <h2 className="text-3xl font-bold text-white mb-2">{currentGame.name}</h2>
        <p className="text-gray-300 mb-6">Featured Game</p>
        <Link 
          href={`/game/${currentGame.appid}`}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
      
      <button 
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous game"
      >
        <FiChevronLeft size={24} />
      </button>
      
      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next game"
      >
        <FiChevronRight size={24} />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {games.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedGames;