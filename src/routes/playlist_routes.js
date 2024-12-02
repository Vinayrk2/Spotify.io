const { Router } = require('express');
const router = Router();
const Playlist = require('../models/playlist_model');

router.get('/', async (req, res) => {
    try {
        const playlist = await Playlist.find();
        res.send(playlist);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/create/",(req,res)=>{
    res.render("create_playlist")
})


router.post('/create/', async (req, res) => {
    try {
        const newApp = new Playlist(req.body);
        const savedApp = await newApp.save();
        res.status(201).send(savedApp);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:name/', async (req, res) => {
    try {
        const name = req.params.name;
        const playlist = await Playlist.findOne({"name":name}).populate("song_list");
        res.render('playlist',{playlist})
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedApp = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedApp);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Playlist.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get_playlists = async (req, res) => {
    try {
        const playlists = await Playlist.find();
        return playlists;
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = router;