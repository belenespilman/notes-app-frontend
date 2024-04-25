import React from 'react';
import { useContext, useState } from 'react';
import { UserDataContext } from '../../context';

const NoteSearch = () => {
  const context = useContext(UserDataContext);
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    const allNotes = context.displayActive
      ? context.userActiveNotes
      : context.userArchivedNotes;
    if (e.target.value === '') {
      context.setDisplayedNotes(allNotes);
    } else {
      const filteredNotes = allNotes.filter((notes) =>
        notes.title.includes(e.target.value)
      );
      context.setDisplayedNotes(filteredNotes);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <input
        placeholder='  🔍 Search your notes'
        className=' h-10 border-2 border-indigo-200 rounded-xl'
        value={searchValue}
        disabled={context.loading}
        onChange={handleChange}
      />
    </div>
  );
};

export default NoteSearch;
