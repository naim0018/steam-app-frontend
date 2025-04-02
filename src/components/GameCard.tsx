import React from 'react';
import Link from 'next/link';
import GameImage from '@/components/ui/GameImage';
import { getGameHeaderImage, getAlternativeGameImage } from '@/redux/api/steamApi';

interface GameCardProps {
  appid: number;
  name: string;
  imageUrl?: string;
}

const GameCard: React.FC<GameCardProps> = ({ appid, name, imageUrl }) => {
  const imgSrc = imageUrl || getGameHeaderImage(appid);
  const fallbackSrc = getAlternativeGameImage(appid);
  
  return (
    <Link href={`/game/${appid}`} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
        <div className="relative h-48 w-full">
          <GameImage 
            src={imgSrc}
            fallbackSrc={fallbackSrc}
            appId={appid}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white truncate" title={name}>
            {name}
          </h3>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-gray-400">App ID: {appid}</span>
            <span className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;