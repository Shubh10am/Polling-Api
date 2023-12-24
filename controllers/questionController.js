const Question = require('../models/questionModel');
const Option = require('../models/optionModel');

// Create a question
exports.createQuestion = async(req, res) => {
    try {
        const { title } = req.body;
        const question = new Question({ title });
        await question.save();
        res.json(question);
    } catch (error) {
        console.log("error")
        res.status(500).json({ error: error.message });
    }
};

// Add options to a question
exports.addOptionsToQuestion = async(req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        const option = await Option.create({ text, question: id });
        question.options.push(option);
        await question.save();
        res.json(option);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a question
exports.deleteQuestion = async(req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Check if any option has votes
        const optionsWithVotes = await Option.find({ question: id, votes: { $gt: 0 } });
        if (optionsWithVotes.length > 0) {
            return res.status(400).json({ error: 'Cannot delete a question with options having votes' });
        }

        // Delete the question
        await question.remove();
        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View a question with its options and votes
exports.viewQuestion = async(req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id).populate('options');

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        const formattedQuestion = {
            id: question._id,
            title: question.title,
            options: question.options.map((option) => ({
                id: option._id,
                text: option.text,
                votes: option.votes,
                link_to_vote: `http://localhost:8000/options/${option._id}/add_vote`,
            })),
        };

        res.json(formattedQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};