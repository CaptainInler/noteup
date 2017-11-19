const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notecontroller.js');
const bodyParser = require("body-parser")

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

// middleware. wird bei jedem routsaufruf durchlaufen
router.use(function timeLog (req, res, next) {
    // console.log('methode: %s url: %s path: %s', req.method, req.url, req.path, req.body);
    next()
});


router.get("/getAllNotes", notesController.getAllNotes);
router.get("/sortAllNotes/:topic/:direction", notesController.sortAllNotes);
router.post("/addNote", notesController.addNote);
router.put("/editNote/:noteId", notesController.editNote);

module.exports = router;