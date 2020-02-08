const express = require('express');
const router = express.Router();
const db = require('../database/db.js')

router.get('/', async (req, res, next) => {
  try {
    let allUsers = await db.any('SELECT * FROM users;');
    res.status(200)
      .json({
        payload: allUsers,
        sucess: true
      })
  }
  catch (err) {
    throw err
  }
});

router.get('/:id', async (req, res, next) => {
  let id = req.params.id;
  try {
    let userById = await db.one('SELECT * FROM users WHERE id = $1;', id)
    res.status(200)
      .json({
        payload: userById,
        success: true
      })
  }
  catch (err) {
    throw err
  }
});

router.post('/', async (req, res, next) => {
  let { username, avatar_url } = req.body;
  try {
    let postedUser = await db.one('INSERT INTO users(username, avatar_url) VALUES($1, $2) RETURNING *;', [username, avatar_url])
    res.status(200)
    .json({
      payload: postedUser
    })
  }
  catch(err) {
    throw err
  }
});

module.exports = router;
