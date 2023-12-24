const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');

// Delete an option
router.delete('/:id/delete', optionController.deleteOption);

// Add a vote to an option
router.post('/:id/add_vote', optionController.addVoteToOption);

module.exports = router;