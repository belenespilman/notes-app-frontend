import React, { useState } from 'react';
import { signInUser } from '../../api/api';

const SigninForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUser(username, password)
      .then((token) => {
        localStorage.setItem('accesstoken', token);
        window.location.href = '/';
      })
      .catch((err) => console.log(err));
  };

  const navigateToSignup = () => {};

  return (
    <div className='flex flex-col items-center'>
      <p className='mt-4 text-gray-600'>
        Welcome back! Please enter your account details to sign in.
      </p>
      <h2 className='text-2xl font-bold mt-4'>Sign In</h2>
      <form onSubmit={handleSubmit} className='mt-4 w-full max-w-sm'>
        <div className='mb-4'>
          <label htmlFor='text' className='block text-gray-700'>
            Username
          </label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='form-input mt-1 block w-full h-9 border-solid border-1 border-gray-400 bg-slate-300 rounded-sm'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='form-input mt-1 block w-full h-9 border-solid border-3 border-gray-400 bg-slate-300 rounded-sm'
          />
        </div>
        <div className='flex flex-col items-center'>
          <button
            className='flex bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded mt-4'
            type='submit'
          >
            Sign In
          </button>
        </div>
        <div className='mt-4 flex justify-center'>
          <p>
            Don't have an account?{' '}
            <a
              href='/sign-up'
              className='underline text-indigo-600 hover:text-indigo-900'
            >
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
