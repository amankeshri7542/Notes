const mongoose = require('mongoose');
const Note = require('../models/note');
const MockDB = require('../services/mockDb');

// Get all notes
exports.getNotes = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('Using mock database for getNotes');
      const mockNotes = await MockDB.find();
      return res.status(200).json(mockNotes);
    }
    
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error in getNotes:', error);
    res.status(500).json({ message: 'Failed to fetch notes', error: error.message });
  }
};

// Get a specific note by ID
exports.getNote = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('Using mock database for getNote');
      const mockNote = await MockDB.findById(id);
      if (!mockNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      return res.status(200).json(mockNote);
    }
    
    // Validate if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Invalid note ID' });
    }
    
    const note = await Note.findById(id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.status(200).json(note);
  } catch (error) {
    console.error('Error in getNote:', error);
    res.status(500).json({ message: 'Failed to fetch note', error: error.message });
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Basic validation
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('Using mock database for createNote');
      const mockNote = await MockDB.create({ title, content });
      return res.status(201).json(mockNote);
    }
    
    const newNote = new Note({ title, content });
    await newNote.save();
    
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error in createNote:', error);
    res.status(500).json({ message: 'Failed to create note', error: error.message });
  }
};

// Update an existing note
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    // Basic validation
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('Using mock database for updateNote');
      const mockUpdatedNote = await MockDB.findByIdAndUpdate(id, { title, content });
      
      if (!mockUpdatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      
      return res.status(200).json(mockUpdatedNote);
    }
    
    // Validate if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Invalid note ID' });
    }
    
    const updatedNote = await Note.findByIdAndUpdate(
      id, 
      { title, content, updatedAt: new Date() }, 
      { new: true }
    );
    
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('Error in updateNote:', error);
    res.status(500).json({ message: 'Failed to update note', error: error.message });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('Using mock database for deleteNote');
      const mockDeletedNote = await MockDB.findByIdAndDelete(id);
      
      if (!mockDeletedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      
      return res.status(200).json({ message: 'Note deleted successfully' });
    }
    
    // Validate if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Invalid note ID' });
    }
    
    const deletedNote = await Note.findByIdAndDelete(id);
    
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error in deleteNote:', error);
    res.status(500).json({ message: 'Failed to delete note', error: error.message });
  }
};
