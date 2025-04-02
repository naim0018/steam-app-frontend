import React from 'react';
import Link from 'next/link';

interface ErrorDisplayProps {
  message: string;
  details?: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  message, 
  details,
  onRetry 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-auto text-center">
      <svg 
        className="w-16 h-16 text-red-500 mx-auto mb-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <h2 className="text-xl font-bold text-white mb-2">Error</h2>
      <p className="text-gray-300 mb-2">{message}</p>
      {details && (
        <p className="text-gray-400 text-sm mb-6">{details}</p>
      )}
      <div className="flex justify-center space-x-4">
        {onRetry && (
          <button 
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Try Again
          </button>
        )}
        <Link href="/" className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorDisplay; 