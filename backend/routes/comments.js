const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200)
        .json({
            payload: "Comments get all router works"
        })
})
module.exports = router;