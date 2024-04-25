import { useContext } from 'react';
import { UserDataContext } from '../../context/index';

const FilterByCategory = () => {
  const context = useContext(UserDataContext);

  const displayActiveNotes = () => {
    context.setDisplayActive(true);
    if (context.selectedCategory != 'All categories') {
      const notesByCategory = context.userActiveNotes.filter((notes) => {
        return notes.categories.some(
          (category) => category.name === context.selectedCategory
        );
      });
      context.setDisplayedNotes(notesByCategory);
    } else {
      context.setDisplayedNotes(context.userActiveNotes);
    }
  };

  const displayArchivedNotes = () => {
    context.setDisplayActive(false);
    if (context.selectedCategory != 'All categories') {
      const notesByCategory = context.userArchivedNotes.filter((notes) => {
        return notes.categories.some(
          (category) => category.name === context.selectedCategory
        );
      });
      context.setDisplayedNotes(notesByCategory);
    } else {
      context.setDisplayedNotes(context.userArchivedNotes);
    }
  };

  return (
    <div className='container flex justify-center mx-auto mt-8'>
      <button
        className={`mr-2  hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-md ${context.displayActive ? 'bg-indigo-800' : 'bg-indigo-600'}`}
        onClick={() => displayActiveNotes()}
      >
        Active Notes
      </button>
      <button
        className={` hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-md ${context.displayActive ? 'bg-indigo-600' : 'bg-indigo-800'}`}
        onClick={() => displayArchivedNotes()}
      >
        Archived Notes
      </button>
    </div>
  );
};

export default FilterByCategory;
