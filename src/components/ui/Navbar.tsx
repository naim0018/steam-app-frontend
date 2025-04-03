'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiHome, FiSearch, FiInfo } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-white text-xl font-bold">Steam Explorer</span>
          </Link>
          
          <div className="flex-1 mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button type="submit" className="hidden">Search</button>
            </form>
          </div>
          
          <div className="flex space-x-4">
            <Link href="/" className="flex items-center text-gray-300 hover:text-white px-3 py-2">
              <FiHome className="mr-1" />
              <span>Home</span>
            </Link>
            
            <Link href="/about" className="flex items-center text-gray-300 hover:text-white px-3 py-2">
              <FiInfo className="mr-1" />
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 