import React, { useContext } from 'react';
import { useState } from 'react';
import {
  createCategory,
  getUserData,
  addCategoriesToNote,
  removeCategoriesFromNote,
  editNoteTitle,
} from '../../api/api';
import { UserDataContext } from '../../context';
import toast from 'react-hot-toast';

const UpdateNoteForm = () => {
  const context = useContext(UserDataContext);
  const accessToken = localStorage.getItem('accesstoken');

  const categoryNames = context.noteToUpdate.categories.map(
    (category) => category.name
  );
  const [newNoteTitle, setNewNoteTitle] = useState(context.noteToUpdate.title);
  const [selectedCategories, setSelectedCategories] = useState(categoryNames);
  const [dropdownOptions, setDropdownOptions] = useState(
    context.userCategories
  );
  const [newCategoryName, setNewCategoryName] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const addedCategoriesNames = selectedCategories.filter(
      (name) => !categoryNames.includes(name)
    );
    const removedCategoriesNames = categoryNames.filter(
      (name) => !selectedCategories.includes(name)
    );
    const addedCategoriesFull = context.userCategories.filter((category) =>
      addedCategoriesNames.includes(category.name)
    );
    const removedCategoriesFull = context.userCategories.filter((category) =>
      removedCategoriesNames.includes(category.name)
    );

    const addedCategories = addedCategoriesFull.map((category) => category.id);
    const removedCategories = removedCategoriesFull.map(
      (category) => category.id
    );
    if (newNoteTitle != context.noteToUpdate.title) {
      await editNoteTitle(accessToken, context.noteToUpdate.id, newNoteTitle);
    }
    if (addedCategories.length > 0) {
      await addCategoriesToNote(
        accessToken,
        context.noteToUpdate.id,
        addedCategories
      );
    }
    if (removedCategories.length > 0) {
      await removeCategoriesFromNote(
        accessToken,
        context.noteToUpdate.id,
        removedCategories
      );
    }
    getUserData(accessToken).then(({ activeNotes, archivedNotes }) => {
      context.setUserActiveNotes(activeNotes);
      context.setUserArchivedNotes(archivedNotes);
      if (context.displayActive) {
        context.setDisplayedNotes(activeNotes);
      } else {
        context.setDisplayedNotes(archivedNotes);
      }
      toast.success('Note updated!');
      context.setOpenEditModal(false);
    });
  };

  const onCancel = (e) => {
    e.preventDefault();
    context.setOpenEditModal(false);
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
          toast.success('Category created!');
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

  const onTitleChange = (e) => {
    e.preventDefault();
    setNewNoteTitle(e.target.value);
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
        <h1 className='font-semibold text-xl mb-10'>Edit note</h1>
      </label>
      <textarea
        placeholder='Note title'
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
        className='text-black font-bold py-2 px-4 border border-indigo-500 rounded-xl mt-2 h-10 hover:bg-indigo-700 hover:text-white transition-colors'
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
          Save
        </button>
      </div>
    </form>
  );
};

export default UpdateNoteForm;
