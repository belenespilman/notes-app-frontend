import React from 'react';

const SignoutButton = () => {
  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('accesstoken');
    window.location.href = '/sign-in';
  };

  return (
    <div>
      <button
        className='bg-indigo-600 font-bold hover:bg-indigo-800 py-2 px-4 rounded-md  text-white '
        onClick={(e) => handleSignOut(e)}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignoutButton;
