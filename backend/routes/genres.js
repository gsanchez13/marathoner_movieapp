const express = require('express');
const router = express.Router();
const db = require('../database/db.js')

router.get('/', async (req, res, next) => {
  try {
    let allGenres = await db.any('SELECT * FROM genres')
    res.status(200)
      .json({
        payload: allGenres
      })
  }
  catch (err) {
    throw err
  }
});

module.exports = router;
