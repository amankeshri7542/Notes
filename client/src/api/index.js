import axios from 'axios';

// Base URL for API requests
// We're connecting directly to the backend API on port 5000
const API = axios.create({ 
  baseURL: `${window.location.protocol}//${window.location.hostname}:5000/api`
});

// Function to fetch all notes
export const fetchNotes = async () => {
  try {
    const { data } = await API.get('/notes');
    return data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Function to create a new note
export const createNote = async (noteData) => {
  try {
    const { data } = await API.post('/notes', noteData);
    return data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Function to update an existing note
export const updateNote = async (id, updatedNoteData) => {
  try {
    const { data } = await API.patch(`/notes/${id}`, updatedNoteData);
    return data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

// Function to delete a note
export const deleteNote = async (id) => {
  try {
    await API.delete(`/notes/${id}`);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};
