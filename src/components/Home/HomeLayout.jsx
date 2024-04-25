import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <section className='bg-violet-300 flex justify-center items-center py-10 w-full h-full overflow-auto'>
      <Outlet />
    </section>
  );
};

export default HomeLayout;
