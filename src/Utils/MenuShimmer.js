import React from 'react';

const MenuShimmer = () => {
  return (
    <div className='container mx-auto mt-10'>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-bold mb-2'></h2>
        <div className='flex mb-4'>
          <div className='w-full lg:w-2/3 pr-4'>
            <h3 className='text-md mt-1 overflow-hidden'></h3>
            <h3 className='text-md'></h3>
          </div>
          <div className=' w-20 h-16 flex flex-col mx-auto items-center border border-slate-400 shadow-lg'>
            <div className='m-1 flex'>
              <h2 className='text-sm font-bold'></h2>
            </div>
            <div className='whitespace-nowrap'>
              <h2 className=' text-xs font-extralight w-full'></h2>
            </div>
          </div>
        </div>

        {[...Array(10)].map((_, index) => (
          <div key={index} className='mb-8 p-4 rounded-lg shadow-lg w-full lg:w-1/2'>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-2/3 pr-4'>
                <h2 className='text-2xl font-semibold'></h2>
                <p className='text-sm text-gray-600 mb-4'></p>
                <p className='text-xl font-semibold'></p>
              </div>
              <div className='w-full lg:w-1/3'>
                {/* You can add shimmer effect here or any other shimmer-related content */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuShimmer;
