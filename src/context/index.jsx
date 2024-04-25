import React, { createContext, useState } from 'react';

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [userData, setUserData] = useState({});
  const [userActiveNotes, setUserActiveNotes] = useState([]);
  const [userArchivedNotes, setUserArchivedNotes] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedNotes, setDisplayedNotes] = useState([]);
  const [displayActive, setDisplayActive] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState({});

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        userActiveNotes,
        setUserActiveNotes,
        userArchivedNotes,
        setUserArchivedNotes,
        userCategories,
        setUserCategories,
        loading,
        setLoading,
        displayedNotes,
        setDisplayedNotes,
        displayActive,
        setDisplayActive,
        openModal,
        setOpenModal,
        selectedCategory,
        setSelectedCategory,
        noteToUpdate,
        setNoteToUpdate,
        openEditModal,
        setOpenEditModal,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
