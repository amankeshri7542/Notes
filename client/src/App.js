import React, { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import { fetchNotes, createNote, updateNote, deleteNote } from './api/index';

// Sample lorem ipsum data for initial notes
const sampleNotes = [
  {
    _id: 'sample1',
    title: 'Meeting Notes',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'sample2',
    title: 'Project Ideas',
    content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'sample3',
    title: 'Shopping List',
    content: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'sample4',
    title: 'Book Recommendations',
    content: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

function App() {
  const [notes, setNotes] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialized, setInitialized] = useState(false);

  // Fetch all notes when the component mounts
  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      try {
        const data = await fetchNotes();
        setNotes(data.length > 0 ? data : sampleNotes);
        setError('');
      } catch (error) {
        console.error('Error fetching notes:', error);
        setError('Failed to load notes from the server. Using sample notes instead.');
        setNotes(sampleNotes);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    getNotes();
  }, []);

  // Handler for adding a new note
  const handleAddNote = async (noteData) => {
    setLoading(true);
    try {
      const newNote = await createNote(noteData);
      setNotes([...notes, newNote]);
      setError('');
    } catch (error) {
      console.error('Error creating note:', error);
      setError('Failed to create note. Please try again.');
      
      // Add locally if server fails
      const mockNote = {
        _id: `local_${Date.now()}`,
        ...noteData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes([...notes, mockNote]);
    } finally {
      setLoading(false);
    }
  };

  // Handler for updating an existing note
  const handleUpdateNote = async (id, noteData) => {
    setLoading(true);
    try {
      const updatedNote = await updateNote(id, noteData);
      setNotes(notes.map((note) => (note._id === id ? updatedNote : note)));
      setCurrentId(null);
      setError('');
    } catch (error) {
      console.error('Error updating note:', error);
      setError('Failed to update note on the server. Updated locally.');
      
      // Update locally if server fails
      const updatedNotes = notes.map(note => 
        note._id === id 
          ? { ...note, ...noteData, updatedAt: new Date().toISOString() }
          : note
      );
      setNotes(updatedNotes);
      setCurrentId(null);
    } finally {
      setLoading(false);
    }
  };

  // Handler for deleting a note
  const handleDeleteNote = async (id) => {
    setLoading(true);
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
      setError('');
    } catch (error) {
      console.error('Error deleting note:', error);
      setError('Failed to delete note from server. Deleted locally.');
      
      // Delete locally if server fails
      setNotes(notes.filter((note) => note._id !== id));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Notes App</h1>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </header>

      <main>
        {loading && !initialized ? (
          <div className="empty-state">Loading notes...</div>
        ) : (
          <NotesList
            notes={notes}
            setCurrentId={setCurrentId}
            deleteNote={handleDeleteNote}
          />
        )}
        
        {!loading && initialized && notes.length === 0 && (
          <div className="empty-state">No notes yet. Create one to get started!</div>
        )}
        
        <AddNote createNote={handleAddNote} />
        
        {currentId && (
          <EditNote
            currentId={currentId}
            notes={notes}
            updateNote={handleUpdateNote}
            setCurrentId={setCurrentId}
          />
        )}
      </main>
    </div>
  );
}

export default App;
