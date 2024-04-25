import React from 'react';
import ReactDOM from 'react-dom';

const CreateNoteModal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-indigo-100'>
      {children}
    </div>,
    document.getElementById('modal')
  );
};

export default CreateNoteModal;
