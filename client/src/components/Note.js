import React from 'react';

const Note = ({ note, setCurrentId, deleteNote }) => {
  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-800">{note.title}</h3>
        <span className="text-xs text-gray-500">{formatDate(note.createdAt)}</span>
      </div>
      <p className="mt-2 text-gray-600 whitespace-pre-line">{note.content}</p>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => setCurrentId(note._id)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => deleteNote(note._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Note;
