const express = require('express');
const path = require('path');
const app = express();
const song_routes = require("./src/routes/song_routes")
const artist_routes = require("./src/routes/artist_routes")
const playlist_routes = require("./src/routes/playlist_routes")
const mongoose = require('mongoose')
const request = require('request')
const user_routes = require("./src/routes/user_routes")

// Mongo connection
mongoose.connect('mongodb://127.0.0.1:27017/spotify')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err))

// Basic Settings
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Sending the Home page
app.get("/",async (req,res)=>{
    const songs = await song_routes.get_songs();
    const playlists = await playlist_routes.get_playlists();

    res.render("index", {"songs":songs, "playlists":playlists});
})


// Routes Setup
app.use("/song", song_routes)
app.use("/playlist", playlist_routes)
app.use("/artist", artist_routes)
app.use("/user", user_routes)

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
