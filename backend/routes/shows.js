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

router.get('/:id', async(req, res, next) => {
    let id = req.params.id;
    try{
        let showById = await db.one('SELECT * FROM shows WHERE id = $1;', id);
        res.status(200)
        .json({
            payload: showById,
            success: true
        })
    }
    catch (err) {
        throw err;
    }
});

router.post('/', async(req, res, next) => {
    const { title, img_url, user_id, genre_id } = req.body;
    try {
        let postedShow = await db.one('INSERT INTO shows(title, img_url, user_id, genre_id) VALUES($1, $2, $3, $4) RETURNING *;', [title, img_url, user_id, genre_id]);
        res.status(200)
        .json({
            payload: postedShow,
            success: true
        })
    }
    catch(err) {
        throw err
    }
});

router.get('/:genre_id', async (req, res, next) => {
    let genre_id = req.params.genre_id;
    try {
        let show = await db.one('SELECT * FROM genres WHERE id = $1;', genre_id);
        res.status(200)
        .json({
            payload: show,
            success: true
        })
    }
    catch(err) {
        throw err;
    }
})
module.exports = router;