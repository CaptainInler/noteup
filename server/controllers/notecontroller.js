const fs = require("fs");
const path = require('path');

class Notiz {

    /**
     * Der Konstruktor des Notiz-Objekts nimmt die Daten entgegen und speichert sie in die entsprechenden variabeln
     * @constructor
     * @param {string} id - ID der Notiz
     * @param {string} title - Titel der Notiz
     * @param {string} description - Die Beschreibung der Notiz
     * @param {int} importance - Wichtigkeit der Notiz
     * @param {string} date - Datum, bis wann die Notiz erledigt sein soll
     * @param {string} finished - "checked" falls die Aufgabe erledigt ist, sonst ""
     * @param {string} created - Datum, wann die Notiz erstellt wurde
     */
    constructor(id, title, description, importance, date, finished, created) {
        this.id = id;
        this.titel = title;
        this.description = description;
        this.importance = importance;
        this.date = date;
        this.finished = finished;
        this.created = created;
    }
}

let notesController = {

    getNoteByID: function(req, res) {

        //datei folgendermasen lesen: funktioniert sonst nicht mit linux
        let jsonPath = path.join(__dirname, '..', 'models', 'notizen.json');
        let data = fs.readFileSync(jsonPath);
        let note = JSON.parse(data);
        console.log("test");
        console.log(note);
        res.send("gelesen")

    },

    getAllNotes: function(req, res) {

        //datei folgendermasen lesen: funktioniert sonst nicht mit linux
        let note = readAllNotes();
        console.log("alle Notizen gelesen");
        res.send(note)

    },

    addNote: function(req, res){

        console.log("post ok");

        let note = readAllNotes();

        // die neu eingegebene Notiz dem array hinzufügen
        let notiz = (req.params);
        note.push(notiz.note);
        let data = JSON.stringify(note);
        let jsonPath = path.join(__dirname, '..', 'models', 'notizen.json');
        fs.writeFile(jsonPath, data);

        res.send("ok");

    }
};


function readAllNotes() {

    let jsonPath = path.join(__dirname, '..', 'models', 'notizen.json');
    let data = fs.readFileSync(jsonPath);
    let note = JSON.parse(data);
    console.log("alle Notizen gelesen");
    return note;


}



module.exports = notesController;