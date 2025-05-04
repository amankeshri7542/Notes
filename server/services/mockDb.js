// This module provides a mock database for development when MongoDB is not available
const mockNotes = [
  {
    _id: '60d21b4667d0d8992e610c85',
    title: 'Welcome to MERN Notes',
    content: 'This is a sample note. You are currently using the app with a mock database as MongoDB is not connected.',
    createdAt: new Date('2023-05-01T10:00:00.000Z'),
    updatedAt: new Date('2023-05-01T10:00:00.000Z')
  },
  {
    _id: '60d21b4667d0d8992e610c86',
    title: 'Getting Started',
    content: 'To save real notes, you need to connect to MongoDB. Check the server logs for more information.',
    createdAt: new Date('2023-05-02T14:30:00.000Z'),
    updatedAt: new Date('2023-05-02T14:30:00.000Z')
  }
];

let notes = [...mockNotes];

// Mock implementation of Mongoose-like methods
const MockDB = {
  isConnected: false,
  
  // Get all notes
  find: async () => {
    return [...notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  
  // Get note by ID
  findById: async (id) => {
    return notes.find(note => note._id === id) || null;
  },
  
  // Create a new note
  create: async (noteData) => {
    const newNote = {
      _id: `mock_${Date.now()}`,
      ...noteData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    notes.push(newNote);
    return newNote;
  },
  
  // Update a note
  findByIdAndUpdate: async (id, update) => {
    const index = notes.findIndex(note => note._id === id);
    if (index === -1) return null;
    
    const updatedNote = {
      ...notes[index],
      ...update,
      updatedAt: new Date()
    };
    
    notes[index] = updatedNote;
    return updatedNote;
  },
  
  // Delete a note
  findByIdAndDelete: async (id) => {
    const index = notes.findIndex(note => note._id === id);
    if (index === -1) return null;
    
    const deletedNote = notes[index];
    notes = notes.filter(note => note._id !== id);
    return deletedNote;
  },
  
  // Reset the mock database to initial state
  reset: () => {
    notes = [...mockNotes];
  }
};

module.exports = MockDB;