const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notecontroller.js');
const bodyParser = require("body-parser")

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

// middleware. wird bei jedem routsaufruf durchlaufen
router.use(function timeLog (req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path, req.body);
    next()
});


router.get("/getAllNotes", notesController.getAllNotes);
router.post("/addNote", notesController.addNote);


module.exports = router;