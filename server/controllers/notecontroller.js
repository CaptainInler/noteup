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

    getAllNotes: function(req, res) {

        let note = readAllNotes();
        console.log("alle Notizen gelesen");
        // console.log(note);
        res.send(note)

    },

    addNote: function(req, res){

        let note = readAllNotes();
        let neu;

        for (let y in req.body){
            neu = JSON.parse(y);
        }

        // die neu eingegebene Notiz dem array hinzufügen
        note.push(neu);
        let data = JSON.stringify(note, null, 2);
        let jsonPath = path.join(__dirname, '..', 'models', 'notizen.json');
        fs.writeFileSync(jsonPath, data);

        // TODO: res.send("ok");

    }
};


function readAllNotes() {

    //datei folgendermasen lesen: funktioniert sonst nicht mit linux
    let jsonPath = path.join(__dirname, '..', 'models', 'notizen.json');
    let data = fs.readFileSync(jsonPath);
    let note = JSON.parse(data);
    console.log("alle Notizen gelesen");
    return note;


}



module.exports = notesController;