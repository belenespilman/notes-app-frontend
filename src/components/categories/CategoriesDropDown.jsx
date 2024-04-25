import React, { useContext } from 'react';
import { UserDataContext } from '../../context/index';

const CategoriesDropDown = () => {
  const context = useContext(UserDataContext);

  const handleChange = (e) => {
    context.setSelectedCategory(e.target.value);
    const notes = context.displayActive
      ? context.userActiveNotes
      : context.userArchivedNotes;
    if (e.target.value === 'All categories') {
      context.setDisplayedNotes(notes);
    } else {
      const categoryId = context.userCategories.find(
        (category) => category.name === e.target.value
      )?.id;
      const filteredNotes = notes.filter((note) => {
        return note.categories.some((category) => category.id === categoryId);
      });
      context.setDisplayedNotes(filteredNotes);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-full mt-10'>
      <div className='relative inline-block'>
        <select
          className='block appearance-none w-full  text-md text-gray-600 bg-white border border-gray-300 hover:border-gray-500 px-6 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline h-11'
          value={context.selectedCategory}
          onChange={handleChange}
        >
          <option value={null}>All categories</option>
          {context.userCategories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <svg
            className='fill-current h-4 w-4'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M9.293 12.95a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CategoriesDropDown;
