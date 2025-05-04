const express = require('express');
const { getNotes, createNote, updateNote, deleteNote, getNote } = require('../controllers/notes');

const router = express.Router();

// Route to get all notes
router.get('/', getNotes);

// Route to get a specific note by ID
router.get('/:id', getNote);

// Route to create a new note
router.post('/', createNote);

// Route to update an existing note
router.patch('/:id', updateNote);

// Route to delete a note
router.delete('/:id', deleteNote);

module.exports = router;
