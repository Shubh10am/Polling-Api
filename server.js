const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questionRoutes');
const optionRoutes = require('./routes/optionRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://shubham12342019:shubh1234@cluster0.jtssa7v.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB!');
});

// Middleware
app.use(bodyParser.json());

// // Routes
app.use('/questions', questionRoutes);
app.use('/options', optionRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});