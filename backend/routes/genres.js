const express = require('express');
const router = express.Router();
const db = require('../database/db.js')

router.get('/', (req, res, next) => {
  res.status(200)
    .json({
      payload: "Users get all route works"
    })
});

module.exports = router;
