import React, { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import { fetchNotes, createNote, updateNote, deleteNote } from './api/index';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all notes when the component mounts
  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      try {
        const data = await fetchNotes();
        setNotes(data);
        setError('');
      } catch (error) {
        console.error('Error fetching notes:', error);
        setError('Failed to load notes. Please try again later.');
      } finally {
        setLoading(false);
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
      setError('Failed to update note. Please try again.');
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
      setError('Failed to delete note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">MERN Notes App</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {currentId ? 'Edit Note' : 'Create Note'}
          </h2>
          {currentId ? (
            <EditNote
              currentId={currentId}
              notes={notes}
              updateNote={handleUpdateNote}
              setCurrentId={setCurrentId}
            />
          ) : (
            <AddNote createNote={handleAddNote} />
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Notes</h2>
          {loading && !currentId ? (
            <p className="text-gray-500">Loading notes...</p>
          ) : (
            <NotesList
              notes={notes}
              setCurrentId={setCurrentId}
              deleteNote={handleDeleteNote}
            />
          )}
          {!loading && notes.length === 0 && (
            <p className="text-gray-500">No notes yet. Create one to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
