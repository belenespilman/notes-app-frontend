import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <section className='bg-gray-900 flex justify-center items-center py-10 w-full h-full'>
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
