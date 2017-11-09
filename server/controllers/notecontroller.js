const Datastore = require('nedb');
const db = new Datastore({ filename: './models/notes.db', autoload: true});

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

    getNotes: function(callback) {
        db.find({}, callback);
    },

    getNote: function(id, callback) {
        db.findOne({ _id: id }, callback);
    },

    addNote: function(callback) {
        let note = new Notiz();
        db.insert(note, callback);
    },

    deleteNote: function(id, callback) {
        db.remove({ _id: id }, {multi: false}, callback);
    }
};

module.exports = notesController;