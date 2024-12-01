const { Router } = require('express');
const router = Router();
const Song = require('../models/song_model');

router.get('/', async (req, res) => {
    try {
        const song = await Song.find();
        res.send(song);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const newApp = new Song(req.body);
        const savedApp = await newApp.save();
        res.status(201).send(savedApp);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedApp = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedApp);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Song.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get_songs = async () => {
    try {
        const songs = await Song.find();
        return songs
    } catch (error) {
        res.status(500).send(error.message);
    }
};
module.exports = router;