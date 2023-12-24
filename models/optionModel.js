const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
    link_to_vote: { type: String, required: true }, // Assuming you want to store the link_to_vote
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, // Reference to the Question model
});

module.exports = mongoose.model('Option', optionSchema);