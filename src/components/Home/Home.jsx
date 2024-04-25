import { useEffect, useContext } from 'react';
import { getUserData } from '../../api/api';
import NoteSearch from '../NoteSearch/NoteSearch';
import { UserDataContext } from '../../context/index.jsx';
import Loader from '../Loader/Loader';
import FilterByCategory from '../categories/FilterByCategory.jsx';
import CategoriesDropDown from '../categories/CategoriesDropDown.jsx';
import NotesList from '../NotesList/NotesList';
import CreateNoteButton from '../CreateNoteButton/CreateNoteButton';
import CreateNoteModal from '../CreateNoteModal/CreateNoteModal';
import NoteForm from '../NoteForm/NoteForm';
import UpdateNoteForm from '../UpdateNoteForm/UpdateNoteForm';
import SignoutButton from '../../SignoutButton/SignoutButton';

const Home = () => {
  const context = useContext(UserDataContext);

  useEffect(() => {
    const accessToken = localStorage.getItem('accesstoken');
    if (accessToken) {
      getUserData(accessToken)
        .then((res) => {
          context.setUserData({ id: res.id, username: res.username });
          context.setUserArchivedNotes(res.archivedNotes);
          context.setUserActiveNotes(res.activeNotes);
          context.setUserCategories(res.categories);
          context.setDisplayedNotes(res.activeNotes);
          context.setLoading(false);
        })
        .catch(() => {
          window.location.href = '/sign-in';
        });
    } else {
      window.location.href = '/sign-in';
    }
  }, []);

  if (context.loading) {
    return (
      <div className='flex justify-center w-full h-20'>
        <div>
          <Loader />
          Loading...
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col w-full'>
        <div className='absolute top-0 right-0 flex mt-12 mr-12 gap-5'>
          <CreateNoteButton />
          <SignoutButton />
        </div>
        <div className='flex justify-center w-full h-20'>
          <h1 className='text-xl font-semibold text-center mt-8'>
            Hello, {context.userData.username}!
          </h1>
        </div>

        <div className='flex justify-center'>
          <NoteSearch />
        </div>

        <div>
          <CategoriesDropDown />
          <FilterByCategory />
          <NotesList />

          {context.openModal && (
            <CreateNoteModal>
              <NoteForm></NoteForm>
            </CreateNoteModal>
          )}

          {context.openEditModal && (
            <CreateNoteModal>
              <UpdateNoteForm></UpdateNoteForm>
            </CreateNoteModal>
          )}
        </div>
      </div>
    );
  }
};

export default Home;
