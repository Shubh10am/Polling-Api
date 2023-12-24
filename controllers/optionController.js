const Option = require('../models/optionModel');

// Delete an option
exports.deleteOption = async(req, res) => {
    try {
        const { id } = req.params;
        const option = await Option.findById(id);
        if (!option) {
            return res.status(404).json({ error: 'Option not found' });
        }

        // Check if the option has votes
        if (option.votes > 0) {
            return res.status(400).json({ error: 'Cannot delete an option with votes' });
        }

        // Remove the option
        await option.remove();
        res.json({ message: 'Option deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a vote to an option
exports.addVoteToOption = async(req, res) => {
    try {
        const { id } = req.params;
        const option = await Option.findById(id);
        if (!option) {
            return res.status(404).json({ error: 'Option not found' });
        }

        // Increment the vote count
        option.votes += 1;
        await option.save();
        res.json({ message: 'Vote added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};