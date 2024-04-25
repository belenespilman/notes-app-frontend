import React from 'react';
import { useContext } from 'react';
import { UserDataContext } from '../../context';
import NoteItem from '../NoteItem/NoteItem';

const NotesList = () => {
  const context = useContext(UserDataContext);

  return (
    <div className='flex flex-col mt-10 gap-4 max-w-70 ml-14 mr-14'>
      {context.displayedNotes.map((note) => (
        <NoteItem
          key={note.id}
          title={note.title}
          active={note.active}
          categories={note.categories}
          id={note.id}
        />
      ))}
    </div>
  );
};

export default NotesList;
