const mongoose = require('mongoose');

// Define the User schema
const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    song_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'song' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    banner: { type: String, default:"/img/default.jpg", required:false},
    description: { type: String, default:"", required:false}
});

// Create the model
const Playlist = mongoose.model('playlist', playlistSchema);

module.exports = Playlist;
