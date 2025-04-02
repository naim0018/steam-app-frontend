import React from 'react';

interface LoadingSectionProps {
  title?: string;
  count?: number;
}

const LoadingSection: React.FC<LoadingSectionProps> = ({ 
  title = "Loading...", 
  count = 3 
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(count).fill(0).map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="h-48 bg-gray-700 animate-pulse"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="flex justify-between items-center mt-2">
                <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSection; 