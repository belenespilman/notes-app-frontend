import React from 'react';
import { useContext } from 'react';
import { archiveNote, deleteNote, getUserData } from '../../api/api';
import { UserDataContext } from '../../context';
import toast from 'react-hot-toast';

const NoteItem = ({ title, active, categories, id }) => {
  const context = useContext(UserDataContext);

  const accessToken = localStorage.getItem('accesstoken');
  const handleArchive = (e) => {
    e.preventDefault();
    archiveNote(accessToken, id)
      .then((res) => {
        getUserData(accessToken).then(({ archivedNotes, activeNotes }) => {
          context.setUserArchivedNotes(archivedNotes);
          context.setUserActiveNotes(activeNotes);
          if (context.displayedNotes.some((note) => note.id === id)) {
            const newNotes = context.displayedNotes.filter(
              (note) => note.id != id
            );
            context.setDisplayedNotes(newNotes);
          }
          toast.success('Note archived.');
        });
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteNote(accessToken, id)
      .then(() => {
        getUserData(accessToken).then(({ archivedNotes, activeNotes }) => {
          context.setUserArchivedNotes(archivedNotes);
          context.setUserActiveNotes(activeNotes);
          if (context.displayedNotes.some((note) => note.id === id)) {
            const newNotes = context.displayedNotes.filter(
              (note) => note.id != id
            );
            context.setDisplayedNotes(newNotes);
          }
          toast.success('Note deleted.');
        });
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    context.setNoteToUpdate({ id, title, active, categories });
    context.setOpenEditModal(true);
  };

  return (
    <div className=' bg-white rounded-lg shadow-md p-4'>
      <div className=''>
        <h1 className='text-lg font-semibold mb-2'>{title}</h1>
      </div>
      {!active ? <h1 className='text-gray-500 mb-2'>Archived</h1> : ''}

      {categories.length > 0 ? (
        <div className=''>
          <ul className='pl-4 float-end'>
            {categories.map((category) => (
              <li
                className='inline mx-1 text-sm text-gray-700  bg-indigo-100 rounded-full px-3 py-1 '
                key={category.id}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}

      <div className='flex gap-4'>
        <img
          src={'https://simpleicon.com/wp-content/uploads/pencil.png'}
          style={{ width: 30, cursor: 'pointer' }}
          alt='Edit'
          onClick={handleEdit}
        />

        {active ? (
          <img
            src={
              'https://cdn.icon-icons.com/icons2/1875/PNG/512/archive_120061.png'
            }
            alt='Archive'
            style={{ width: 30, cursor: 'pointer' }}
            onClick={handleArchive}
          />
        ) : (
          ''
        )}

        <img
          src={'https://cdn-icons-png.flaticon.com/512/3405/3405244.png'}
          style={{ width: 30, cursor: 'pointer' }}
          alt='Delete'
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default NoteItem;
