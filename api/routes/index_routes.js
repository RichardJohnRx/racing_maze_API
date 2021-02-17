const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Racing Maze API')
});


module.exports = router;