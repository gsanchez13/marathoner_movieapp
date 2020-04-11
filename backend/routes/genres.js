const express = require('express');
const router = express.Router();
const db = require('../database/db.js');

router.get('/', async (req, res, next) => {
  try {
    let allGenres = await db.any('SELECT * FROM genres;')
    res.status(200)
      .json({
        payload: allGenres,
        success: true
      })
  }
  catch (err) {
    throw err
  }
});
//gets all genres for addShowForm

module.exports = router;


// router.post('/', async (req, res, next) => {
//   let { genre_name } = req.body;
//   try {
//     let newGenre = await db.one('INSERT INTO genres(genre_name) VALUES($1) RETURNING *;', genre_name);
//     res.status(200)
//       .json({
//         payload: newGenre,
//         success: true
//       })
//   }
//   catch (err) {
//     throw err
//   }
// });

