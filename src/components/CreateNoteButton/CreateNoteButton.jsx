import React from 'react';
import { useContext } from 'react';
import { UserDataContext } from '../../context';

const CreateNoteButton = () => {
  const context = useContext(UserDataContext);

  return (
    <div>
      <button
        className='bg-white font-bold hover:bg-indigo-800 py-2 px-4 rounded-md  text-indigo-600 hover:text-white border border-black '
        onClick={() => {
          context.setOpenModal(true);
        }}
      >
        Create Note
      </button>
    </div>
  );
};

export default CreateNoteButton;
