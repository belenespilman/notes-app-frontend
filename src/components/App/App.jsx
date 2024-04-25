import { Routes, Route } from 'react-router-dom';
import SigninForm from '../../Auth/Forms/SigninForm';
import SignupForm from '../../Auth/Forms/SignupForm';
import AuthLayout from '../../Auth/AuthLayout';
import Home from '../Home/Home';
import HomeLayout from '../Home/HomeLayout';
import { UserDataProvider } from '../../context';
import { Toaster } from 'react-hot-toast';

const AppRoute = () => {
  return (
    <UserDataProvider>
      <main className='flex h-screen'>
        <Routes>
          {/*public routes */}
          <Route element={<AuthLayout />}>
            <Route path='/sign-in' element={<SigninForm />} />
            <Route path='/sign-up' element={<SignupForm />} />
          </Route>

          {/*private routes */}
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
        <Toaster position='top-center' toastOptions={{ duration: 4000 }} />
      </main>
    </UserDataProvider>
  );
};

export default AppRoute;
