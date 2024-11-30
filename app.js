const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home route
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Playlist View 
app.get('/playlist/', (req, res) => {
    res.render('playlist', { title: 'Playlist' });
});

// Song View 
app.get('/song/', (req, res) => {
    res.render('song', { title: 'Song' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
