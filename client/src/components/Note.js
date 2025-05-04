import React from 'react';

const Note = ({ note, setCurrentId, deleteNote }) => {
  return (
    <div className="note-tile">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>
      <div className="note-actions">
        <button
          onClick={() => setCurrentId(note._id)}
          className="edit-btn"
        >
          Edit
        </button>
        <button
          onClick={() => deleteNote(note._id)}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Note;
