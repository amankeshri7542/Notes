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
    <div className="form-overlay">
      <div className="form-container">
        <h2 className="form-title">Edit Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="edit-title"
              name="title"
              value={noteData.title}
              onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-content" className="form-label">
              Content
            </label>
            <textarea
              id="edit-content"
              name="content"
              value={noteData.content}
              onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
              className="form-textarea"
              required
            ></textarea>
          </div>
          <div className="form-buttons">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
            >
              Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
