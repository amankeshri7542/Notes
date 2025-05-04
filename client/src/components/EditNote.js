import React, { useState, useEffect } from 'react';

const EditNote = ({ currentId, notes, updateNote, setCurrentId }) => {
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
  });

  // Find the current note based on currentId
  useEffect(() => {
    const note = currentId ? notes.find((n) => n._id === currentId) : null;
    if (note) {
      setNoteData({ title: note.title, content: note.content });
    }
  }, [currentId, notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!noteData.title.trim() || !noteData.content.trim()) {
      alert('Please fill in both title and content fields');
      return;
    }
    
    updateNote(currentId, noteData);
  };

  const handleCancel = () => {
    setCurrentId(null);
    setNoteData({ title: '', content: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="edit-title"
          name="title"
          value={noteData.title}
          onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
          Content
        </label>
        <textarea
          id="edit-content"
          name="content"
          value={noteData.content}
          onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Update Note
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditNote;
