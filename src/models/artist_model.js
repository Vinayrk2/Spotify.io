const mongoose = require('mongoose');

// Define the User schema
const ArtistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    genre: [{type:String, required:false}],
    image: {type:String, required:false, default:"img/default.jpg"}
});

// Create the model
const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;