import React, { useState } from 'react';

const AddNote = ({ createNote }) => {
  const [showForm, setShowForm] = useState(false);
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
    
    // Reset form and close modal
    setNoteData({ title: '', content: '' });
    setShowForm(false);
  };

  const handleCancel = () => {
    setNoteData({ title: '', content: '' });
    setShowForm(false);
  };

  return (
    <>
      <button 
        className="add-note-btn" 
        onClick={() => setShowForm(true)}
        aria-label="Add new note"
      >
        +
      </button>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2 className="form-title">Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={noteData.title}
                  onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <textarea
                  id="content"
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
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNote;
