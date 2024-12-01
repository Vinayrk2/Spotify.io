const { Router } = require('express');
const router = Router();
const Artist = require('../models/artist_model');

router.get('', async (req, res) => {
    try {
        const artist = await Artist.find();
        res.send(artist);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('', async (req, res) => {
    try {
        const newApp = new Artist(req.body);
        const savedApp = await newApp.save();
        res.status(201).send(savedApp);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedApp = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedApp);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Artist.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;