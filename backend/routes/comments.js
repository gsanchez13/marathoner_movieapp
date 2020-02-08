const express = require('express');
const router = express.Router();
const db = require('../database/db.js')

router.get('/show/:show_id', async (req, res, next) => {
    let id = req.params.show_id;
    try {
        let showById = await db.one('SELECT * FROM shows WHERE id = $1;', id)
        res.status(200)
        .json({
            payload: showById,
            success: true
        })
    }
    catch(err){
        throw err
    }
})
module.exports = router;