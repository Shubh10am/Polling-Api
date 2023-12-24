const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Create a question
router.post('/create', questionController.createQuestion);

// Add options to a question
router.post('/:id/options/create', questionController.addOptionsToQuestion);

// Delete a question
router.delete('/:id/delete', questionController.deleteQuestion);

// View a question with its options and votes
router.get('/:id', questionController.viewQuestion);

module.exports = router;