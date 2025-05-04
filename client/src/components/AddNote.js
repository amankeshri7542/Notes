import React, { useState } from 'react';

const AddNote = ({ createNote }) => {
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!noteData.title.trim() || !noteData.content.trim()) {
      alert('Please fill in both title and content fields');
      return;
    }
    
    createNote(noteData);
    
    // Reset form
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
          id="title"
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
          id="content"
          name="content"
          value={noteData.content}
          onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Note
      </button>
    </form>
  );
};

export default AddNote;
