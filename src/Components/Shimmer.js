import React from 'react';

const Shimmer = () => {
  return (
    <div className='flex flex-wrap justify-center items-center gap-6'>
      {[1, 2, 3,4,5,6].map((index) => (
        <div
          key={index}
          className='w-80 p-4 transform hover:scale-95 origin-center transition-all duration-100 ease-in cursor-pointer shadow-lg shadow-slate-300 rounded-2xl'
        >
          <div
            className='h-60 w-full bg-gray-300 animate-pulse rounded-2xl'
          />
          <div className='h-6 w-20 bg-gray-300 my-2 animate-pulse rounded-md' />
          <div className='h-4 w-16 bg-gray-300 my-1 animate-pulse rounded-md' />
          <div className='h-4 w-32 bg-gray-300 my-1 animate-pulse rounded-md' />
          <div className='h-4 w-24 bg-gray-300 my-1 animate-pulse rounded-md' />
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
