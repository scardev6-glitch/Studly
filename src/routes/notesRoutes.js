const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, notesController.createNote);
router.get('/', protect, notesController.getUserNotes);
router.get('/provided', protect, notesController.getProvidedNotes);
router.get('/provided/:id/pdf', notesController.getProvidedNotePdf);

module.exports = router;
