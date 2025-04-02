import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface GameImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string;
  fallbackSrc?: string;
  appId?: number;
}

const GameImage: React.FC<GameImageProps> = ({ 
  src, 
  fallbackSrc = '/images/game-placeholder.jpg',
  appId,
  alt,
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setError(true);
    }
  };

  if (error) {
    return (
      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
        <div className="text-center p-4">
          <span className="text-gray-400 text-sm">{alt}</span>
          {appId && <span className="block text-gray-500 text-xs mt-1">App ID: {appId}</span>}
        </div>
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      unoptimized
    />
  );
};

export default GameImage; 