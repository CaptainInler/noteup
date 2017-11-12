const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notecontroller.js');
const fs = require("fs");
const path = require('path');


// middleware. wird bei jedem routsaufruf durchlaufen
router.use(function timeLog (req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next()
});


router.get("/getNote/:noteId", notesController.getNoteByID);
router.get("/getAllNotes", notesController.getAllNotes);
router.post("/addNote/:note", notesController.addNote);


module.exports = router;