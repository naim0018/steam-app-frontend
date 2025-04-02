'use client';

import React, { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useGetGamesDetailsByIdQuery } from '@/redux/api/gamesApi';
import ErrorDisplay from '@/components/ui/ErrorDisplay';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';

interface Genre {
  id: string;
  description: string;
}

interface Screenshot {
  id: number;
  path_thumbnail: string;
  path_full: string;
}

interface Movie {
  id: number;
  name: string;
  thumbnail: string;
  highlight?: boolean;
  mp4: {
    [key: string]: string;
  };
  webm: {
    [key: string]: string;
  };
}

interface PCRequirements {
  minimum: string;
  recommended?: string;
}

interface GameDetails {
  data: {
    name: string;
    about_the_game: string;
    background_raw: string;
    header_image: string;
    capsule_image: string;
    developers: string[];
    genres: Genre[];
    is_free: boolean;
    price_overview?: {
      currency: string;
      final: number;
      discount_percent: number;
    };
    publishers: string[];
    release_date?: {
      date: string;
    };
    steam_appid: number;
    support_info?: {
      url?: string;
      email?: string;
    };
    supported_languages?: string;
    screenshots: Screenshot[];
    short_description: string;
    pc_requirements?: PCRequirements;
    movies: Movie[];
  };
}

export default function GameDetailsPage() {
  const { appId } = useParams();
  const { data: gameDetails, isLoading, error } = useGetGamesDetailsByIdQuery(Number(appId));
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedScreenshot, setSelectedScreenshot] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0C10] text-white flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !gameDetails) {
    return <ErrorDisplay message="Failed to load game details" />;
  }

  const {
    name,
    about_the_game,
    background_raw,
    capsule_image,
    developers,
    genres,
    header_image,
    is_free,
    price_overview,
    publishers,
    release_date,
    steam_appid,
    support_info,
    supported_languages,
    screenshots,
    short_description,
    pc_requirements,
    movies
  } = (gameDetails as GameDetails).data;
  
  const languagesArray: string[] = supported_languages
    ? supported_languages
        .replace(/<[^>]*>/g, '')
        .split(',')
        .map((lang: string) => lang.trim())
    : ['English'];
  
  const currency = price_overview?.currency;
  const final = price_overview?.final ?? 0;
  const discount_percent = price_overview?.discount_percent ?? 0;
  const date = release_date?.date;
  const url = support_info?.url;
  const email = support_info?.email;

  const formattedPrice = price_overview ? 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: currency || 'USD',
      minimumFractionDigits: 2
    }).format(final / 100) : null;

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };
  
  return (
    <div className="min-h-screen text-white bg-[#0A0C10]">
      <div 
        className="h-[90vh] relative"
      >
        <AnimatePresence mode="wait">
          {selectedMovie !== null && movies && movies.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-full"
            >
              <video 
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                controls={showControls}
                className="w-full h-full object-contain"
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
              >
                <source src={movies[selectedMovie].mp4.max} type="video/mp4" />
                <source src={movies[selectedMovie].webm.max} type="video/webm" />
              </video>
              <div className="absolute bottom-8 right-8 flex space-x-4 z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRewind}
                  className="p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-all duration-300"
                >
                  <span className="text-2xl">⏪</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayPause}
                  className="p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-all duration-300"
                >
                  <span className="text-2xl">{isPlaying ? "⏸" : "▶"}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleForward}
                  className="p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-all duration-300"
                >
                  <span className="text-2xl">⏩</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-all duration-300"
                >
                  {isMuted ? (
                    <span className="text-2xl">🔇</span>
                  ) : (
                    <span className="text-2xl">🔊</span>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowControls(!showControls)}
                  className="p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-all duration-300"
                >
                  <span className="text-2xl">⚙️</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-full"
            >
              <Image
                src={screenshots?.[selectedScreenshot]?.path_full || background_raw || header_image}
                alt={name}
                fill
                className="object-cover object-center"
                priority
                quality={100}
                sizes="100vw"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 ">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-8 left-8"
            style={{pointerEvents: 'auto'}}
          >
            <Link 
              href="/" 
              className="group inline-flex items-center space-x-3 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl backdrop-blur-md transition-all duration-300"
            >
              <span className="text-lg group-hover:transform group-hover:-translate-x-1 transition-transform">←</span>
              <span className="font-medium">Back to Library</span>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 -mt-18 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2 mb-12  p-4">
          {movies && movies.map((movie: Movie, index: number) => (
            <motion.button
              key={movie.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMovie(index)}
              className={`relative w-full aspect-video rounded-lg overflow-hidden ${
                selectedMovie === index ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-[#0A0C10]' : ''
              }`}
            >
              <Image
                src={movie.thumbnail}
                alt={movie.name}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
          {screenshots && screenshots.map((screenshot: Screenshot, index: number) => (
            <motion.button
              key={screenshot.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedMovie(null);
                setSelectedScreenshot(index);
              }}
              className={`relative w-full aspect-video rounded-lg overflow-hidden ${
                selectedMovie === null && selectedScreenshot === index ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-[#0A0C10]' : ''
              }`}
            >
              <Image
                src={screenshot.path_thumbnail}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">{name}</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl leading-relaxed">{short_description}</p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {genres && genres.map((genre: Genre) => (
              <span 
                key={genre.id} 
                className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors duration-300"
              >
                {genre.description}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {about_the_game && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-10"
              >
                <h2 className="text-3xl font-bold mb-6">About This Game</h2>
                <div 
                  className="prose prose-invert prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: about_the_game }}
                />
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-10"
            >
              <h2 className="text-3xl font-bold mb-6">Game Details</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {developers && developers.length > 0 && (
                  <div>
                    <h3 className="text-gray-400 text-lg mb-3">Developers</h3>
                    <p className="text-xl">{developers.join(', ')}</p>
                  </div>
                )}
                {publishers && publishers.length > 0 && (
                  <div>
                    <h3 className="text-gray-400 text-lg mb-3">Publishers</h3>
                    <p className="text-xl">{publishers.join(', ')}</p>
                  </div>
                )}
                {date && (
                  <div>
                    <h3 className="text-gray-400 text-lg mb-3">Release Date</h3>
                    <p className="text-xl">{date}</p>
                  </div>
                )}
                {supported_languages && (
                  <div>
                    <h3 className="text-gray-400 text-lg mb-3">Languages</h3>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full bg-white/10 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    >
                      {languagesArray.map((lang: string, index: number) => (
                        <option key={index} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </motion.div>

            {pc_requirements && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-10"
              >
                <h2 className="text-3xl font-bold mb-6">System Requirements</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Minimum</h3>
                    <div className="prose prose-invert prose-lg" dangerouslySetInnerHTML={{ __html: pc_requirements.minimum }} />
                  </div>
                  {pc_requirements.recommended && (
                    <div>
                      <h3 className="text-2xl font-semibold mb-6">Recommended</h3>
                      <div className="prose prose-invert prose-lg" dangerouslySetInnerHTML={{ __html: pc_requirements.recommended }} />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-8"
              >
                {capsule_image && (
                  <div className="relative h-64 mb-8">
                    <Image 
                      src={capsule_image}
                      alt={`${name} capsule`}
                      fill
                      className="object-contain"
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}

                <div className="mb-8">
                  {is_free ? (
                    <div className="text-3xl font-bold text-green-400">Free to Play</div>
                  ) : price_overview ? (
                    <div className="flex items-baseline space-x-4">
                      {discount_percent > 0 && (
                        <span className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-medium">
                          -{discount_percent}%
                        </span>
                      )}
                      <span className="text-3xl font-bold">{formattedPrice}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xl">Price not available</span>
                  )}
                </div>

                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://store.steampowered.com/app/${steam_appid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-500 hover:bg-blue-600 text-center py-4 rounded-xl text-lg font-medium transition-colors duration-300"
                >
                  View on Steam
                </motion.a>

                {(url || email) && (
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h3 className="text-xl font-medium mb-6">Support</h3>
                    {url && (
                      <a 
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-400 hover:text-blue-300 mb-4 text-lg break-all transition-colors duration-300"
                      >
                        Official Website
                      </a>
                    )}
                    {email && (
                      <a 
                        href={`mailto:${email}`}
                        className="block text-blue-400 hover:text-blue-300 text-lg transition-colors duration-300"
                      >
                        Support Email
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}