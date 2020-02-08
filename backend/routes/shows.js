const express = require('express');
const router = express.Router();
const db = require('../database/db.js');

router.get('/', async (req, res, next) => {
    try {
        let allShows = await db.any('SELECT * FROM shows');
        res.status(200)
        .json({
            payload: allShows,
            success: true
        })
    }
    catch(err) {
        throw err
    }
});

module.exports = router;