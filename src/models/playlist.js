const mongoose = require('mongoose');

// Define the User schema
const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    likes: { type: Number, required: true },
    email: { type: String, required: true, unique: true }
});

// Create the model
const playlist = mongoose.model('playlist', playlistSchema);

module.exports = User;
