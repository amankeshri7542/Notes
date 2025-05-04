import React from 'react';
import Note from './Note';

const NotesList = ({ notes, setCurrentId, deleteNote }) => {
  if (!notes.length) {
    return <div className="empty-state">No notes available</div>;
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <Note
          key={note._id}
          note={note}
          setCurrentId={setCurrentId}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
};

export default NotesList;
