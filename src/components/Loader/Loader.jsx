import React from 'react';

function Loader() {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <div className='animate-spin rounded-full border-t-4 border-indigo-800 border-t-indigo-900 h-12 w-12'></div>
    </div>
  );
}

export default Loader;
