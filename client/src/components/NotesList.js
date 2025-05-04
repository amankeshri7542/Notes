import React from 'react';
import Note from './Note';

const NotesList = ({ notes, setCurrentId, deleteNote }) => {
  if (!notes.length) {
    return <div className="text-gray-500">No notes available</div>;
  }

  return (
    <div className="space-y-4">
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
