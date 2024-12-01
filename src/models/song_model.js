const mongoose = require('mongoose');

// Define the User schema
const SongSchema = new mongoose.Schema({
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    artists: [{type:mongoose.Schema.Types.ObjectId, ref: 'artist'}],
    genre: [{type:String, required:false}],
    image: {type:String, required:false, default:"/img/default.jpg"},
    audio: {type:String, required:true},
    likes: {type:Number, default:0},
    year: {type:Number, default:2024}
});

// Create the model
const Song = mongoose.model('song', SongSchema);

module.exports = Song;
