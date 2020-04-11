const express = require('express');
const router = express.Router();
const db = require('../database/db.js');
const { loginRequired } = require('../auth/helpers');

router.get('/user/:id', loginRequired, async (req, res, next) => {
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
//get user by id

router.get('/all', loginRequired, async (req, res, next) => {
  console.log(req.session)
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
//get all users

module.exports = router;
