import React, { useContext, useState } from 'react';
import { createCategory, createNote, getUserData } from '../../api/api';
import { UserDataContext } from '../../context';
import toast from 'react-hot-toast';

const NoteForm = () => {
  const context = useContext(UserDataContext);
  const accessToken = localStorage.getItem('accesstoken');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState(
    context.userCategories
  );

  const onTitleChange = (e) => {
    setNewNoteTitle(e.target.value);
  };

  const onNewCategoryChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const createNewCategory = (e) => {
    e.preventDefault();
    createCategory(accessToken, newCategoryName)
      .then(({ id }) => {
        getUserData(accessToken).then(({ categories }) => {
          context.setUserCategories(categories);
          setDropdownOptions([
            ...dropdownOptions,
            { id, name: newCategoryName },
          ]);
          setNewCategoryName('');
          toast.success('New category created!');
        });
      })
      .catch(({ response }) => {
        const rawMessage = response.data.message;
        if (
          rawMessage.includes('duplicate key value violates unique constraint')
        ) {
          toast.error('There is already a category with that name');
        } else {
          toast.error(response.data.message);
        }
      });
  };

  const onCancel = () => {
    context.setOpenModal(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const categoriesFull = context.userCategories.filter((category) =>
      selectedCategories.includes(category.name)
    );
    const categoriesIds = categoriesFull.map((category) => category.id);
    createNote(accessToken, newNoteTitle, categoriesIds).then((res) => {
      getUserData(accessToken).then(({ activeNotes }) => {
        context.setUserActiveNotes(activeNotes);
        if (context.displayActive) {
          context.setDisplayedNotes(activeNotes);
        }
        toast.success('New note added!');
        context.setOpenModal(false);
      });
    });
  };

  const handleDropdownChange = (e) => {
    if (selectedCategories.includes(e.target.value)) {
      const categories = selectedCategories.filter(
        (categories) => categories != e.target.value
      );
      setSelectedCategories(categories);
    } else {
      setSelectedCategories([...selectedCategories, e.target.value]);
    }
  };

  return (
    <form onSubmit={onSubmit} className='flex flex-col items-center'>
      <label>
        <h1 className='font-semibold text-xl mb-10'>Create a new Note!</h1>
      </label>
      <textarea
        placeholder='Add Note'
        value={newNoteTitle}
        onChange={onTitleChange}
        className='bg-white border border-gray-300 border-solid rounded-lg text-gray-600 text-lg text-center px-4 py-3 h-16 w-full'
      />
      <h1 className='font-semibold text-md mb-2 mt-7'>Selected Categories:</h1>
      {selectedCategories.map((category, index) => (
        <h1
          className='mb-1 font-light bg-indigo-300 rounded-full px-3 py-1'
          key={index}
        >
          {category}
        </h1>
      ))}

      <select
        multiple
        className='block appearance-none w-full bg-white border border-gray-300 hover:border-black px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
        value={selectedCategories}
        onChange={handleDropdownChange}
      >
        {dropdownOptions.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type={'text'}
        value={newCategoryName}
        onChange={onNewCategoryChange}
        placeholder='Create a new category'
        className='mt-2 bg-white border border-gray-300 border-solid rounded-lg text-gray-600 text-lg text-center px-4 py-3 h-8 w-full'
      />
      <button
        className='text-black font-bold py-2 px-4 border border-indigo-500 rounded-xl mt-2 h-10'
        onClick={createNewCategory}
      >
        Create
      </button>

      <div className='flex justify-between mt-8 w-full'>
        <button
          className=' bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-md'
          type='button'
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          className=' bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-md'
          type='submit'
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
