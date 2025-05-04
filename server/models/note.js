const mongoose = require('mongoose');

// Define the note schema
const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
});

// Create and export the Note model
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
