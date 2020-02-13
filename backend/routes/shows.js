const express = require('express');
const router = express.Router();
const db = require('../database/db.js');

router.get('/', async (req, res, next) => {
    try {
        let allShows = await db.any('SELECT * FROM shows INNER JOIN users ON shows.user_id = users.id');
        res.status(200)
            .json({
                payload: allShows,
                success: true
            })
    }
    catch (err) {
        throw err
    }
});

router.get('/user/:user_id', async (req, res, next) => {
    let userId = req.params.user_id;
    try {
        let showsByUser = await db.any('SELECT shows.id, title, img_url, genre_name FROM shows INNER JOIN genres ON shows.genre_id = genres.id WHERE shows.user_id = $1', userId);
        res.status(200)
            .json({
                payload: showsByUser,
                success: true
            })
    }
    catch (err) {
        throw err
    }
});

router.get('/showInfo/:showId', async (req, res, next) => {
    let showId = req.params.showId;
    try {
        let showById = await db.one(`SELECT shows.id as showId, title, img_url, genre_name, username 
        FROM shows 
        INNER JOIN genres ON shows.genre_id = genres.id 
        INNER JOIN users ON shows.user_id = users.id  
        WHERE shows.id = $1;`, showId);
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

router.post('/', async (req, res, next) => {
    const { title, img_url, user_id, genre_id } = req.body;
    console.log(title, img_url, user_id, genre_id)
    try {
        let postedShow = await db.one('INSERT INTO shows(title, img_url, user_id, genre_id) VALUES($1, $2, $3, $4) RETURNING *;', [title, img_url, user_id, genre_id]);
        res.status(200)
            .json({
                payload: postedShow,
                success: true
            })
    }
    catch (err) {
        throw err
    }
});
router.get('/genre/:genre_id', async (req, res, next) => {
    let genre_id = req.params.genre_id;
    try {
        let show = await db.one('SELECT * FROM shows WHERE genre_id = $1;', genre_id);
        res.status(200)
            .json({
                payload: show,
                success: true
            })
    }
    catch (err) {
        throw err;
    }
})

module.exports = router;