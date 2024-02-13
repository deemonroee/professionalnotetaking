const router = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET request to read notes from database file
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST request to write notes into database file
router.post('/notes', (req, res) => {
    const { title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid()
        };

        readAndAppend(newNote, './db/db.json');
        res.json('New note added successfully')
    } else {
        res.error('Error in adding note')
    }
});

router.delete('/notes/:id', (req, res) => {
    readAndDelete(req.params.id, './db/db.json');
    res.json('deleted')
})

module.exports = router;