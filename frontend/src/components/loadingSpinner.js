import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`${sizeClasses[size]} border-title-color border-t-transparent rounded-full animate-spin`}
      ></div>
      {text && (
        <span className="text-title-color text-lg transition-colors duration-150 ease">
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;
