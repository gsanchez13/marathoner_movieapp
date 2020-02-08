const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200)
    .json({
      payload: "Users get all route works"
    })
});

module.exports = router;
