const express = require('express');
const router = express.Router();
const db = require('../database/db.js');

router.get('/user/:user_id', async (req, res, next) => {
    let userId = req.params.user_id;
    try {
        let showsByUser = await db.any(`SELECT shows_id, title, img_url, genre_id, genre_name 
        FROM shows_users 
        INNER JOIN users ON shows_users.user_id = users.id 
        INNER JOIN shows ON shows_users.shows_id = shows.id
        INNER JOIN genres ON shows.genre_id = genres.id
        WHERE shows_users.user_id = $1;`, userId);
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
//for users profile to display what they are watching

router.get('/showInfo/:showId', async (req, res, next) => {
    let showId = req.params.showId;
    try {
        let showById = await db.one(`SELECT shows.id, title, img_url, genres.id, genre_name
        FROM shows
        INNER JOIN genres ON shows.genre_id = genres.id
        WHERE shows.id = $1`, showId);
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

router.get(`/findShowInfo/`, async (req, res, next) => {
    try {
        let getShowsQuery = `
            SELECT title, img_url, genre_id, genre_name, shows_id,
                ARRAY_AGG(
                    JSON_BUILD_OBJECT(
                        'username', username,
                        'user_id', user_id,
                        'avatar_url', avatar_url
                    )
                ) viewers
            FROM shows_users 
            INNER JOIN users ON shows_users.user_id = users.id 
            INNER JOIN shows ON shows_users.shows_id = shows.id
            INNER JOIN genres ON shows.genre_id = genres.id
            GROUP BY title, img_url, genre_id, genre_name,shows_id;
        `
        let showInfo = await db.any(getShowsQuery)
        res.status(200)
            .json({
                payload: showInfo,
                sucess: true
            })
    }
    catch (err) {
        throw err
    }
});
//use this route for the all shows master page 

router.post('/', async (req, res, next) => {
    const { title, img_url, genre_id } = req.body;
    let checkTitle = await db.one(`SELECT id FROM shows WHERE title = $1`, title);
    if(!checkTitle){
        try {
            let postedShow = await db.one(`INSERT INTO shows(title, img_url, genre_id) 
                    VALUES($1, $2, $3) 
                    RETURNING *;`, [title, img_url, genre_id]);
            res.status(200)
                .json({
                    payload: postedShow,
                    success: true
                })
        }
        catch (err) {
            throw err
        }
    }
    else{
        res.json({
            payload: "Show already exists",
            success: false
        })
    }
});

router.get('/genre/:genre_id', async (req, res, next) => {
    let genre_id = req.params.genre_id;
    try {
        let show = await db.one(`SELECT * 
        FROM shows 
        WHERE genre_id = $1;`, genre_id);
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