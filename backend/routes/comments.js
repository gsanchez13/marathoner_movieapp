const express = require('express');
const router = express.Router();
const db = require('../database/db.js')

router.get('/showInfo/:show_id', async (req, res, next) => {
    let showId = req.params.show_id;
    try {
        let showById = await db.any(`SELECT * 
        FROM comments 
        INNER JOIN users ON comments.user_id = users.id 
        INNER JOIN shows ON comments.show_id = shows.id 
        WHERE comments.show_id = $1;`, showId)
        res.status(200)
            .json({
                payload: showById,
                success: true
            })
    }
    catch (err) {
        throw err
    }
});

router.post('/', async (req, res, next) => {
    const { comment_body, user_id, show_id } = req.body;
    try {
        let newComment = await db.one('INSERT INTO comments(comment_body, user_id, show_id) VALUES ($1, $2, $3) RETURNING *;', [comment_body, user_id, show_id])
        let userCommentInfo = await db.any('SELECT (username, avatar_url, show_id) FROM comments INNER JOIN users ON comments.id = users.id WHERE comments.user_id = $1 AND comments.show_id = $2', [user_id, show_id]);
        console.log(newComment)
        console.log(userCommentInfo)
        res.status(200)
            .json({
                payload: newComment,
                info: userCommentInfo,
                success: true
            })
    }
    catch (err) {
        throw err
    }
});

module.exports = router;