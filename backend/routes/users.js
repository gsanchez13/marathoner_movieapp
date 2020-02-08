const express = require('express');
const router = express.Router();
const db = require('../database/db.js')

router.get('/', (req, res, next) => {
  res.status(200)
    .json({
      payload: "Users get all route works"
    })
});

router.get('/:id', async (req, res, next) => {
  let id = req.params.id;
  try {
    let userById = await db.one('SELECT * FROM users WHERE id = $1', id)
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

module.exports = router;
