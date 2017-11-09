const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next()
});



router.route('/all')
    .get(function (req, res) {
        res.json('Get a random book')
    });

router.route("")
    .post(function (req, res) {
        res.send('Add a book')
    });



router.get('/:noteId', function (req, res) {
    res.send(req.params)
});


module.exports = router;