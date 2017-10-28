'use strict';

// Model (MVC-Pattern)


/**
 * Das notiz-Objekt representiert eine Notiz mit allen seinen Informationen
 */
class notiz {

    /**
     * Der Konstruktor des notiz-Objekts nimmt die Daten entgegen und speichert sie in die entsprechenden variabeln
     * @constructor
     * @param {string} id - ID der Notiz
     * @param {string} title - Titel der Notiz
     * @param {string} description - Die Beschreibung der Notiz
     * @param {int} importance - Wichtigkeit der Notiz
     * @param {string} date - Datum, bis wann die Notiz erledigt sein soll
     * @param {string} finished - "checked" falls die Aufgabe erledigt ist, sonst ""
     */
    constructor(id, title, description, importance, date, finished) {
        this.id = id;
        this.titel = title;
        this.description = description;
        this.importance = importance;
        this.date = date;
        this.finished = finished;
    }


    /**
     * @typedef {Object} notiz
     * @property {string} noteInputTitle - Titel
     * @property {string} noteInputText - Text
     * @property {int} noteInputImportance - Wichtigkeit
     * @property {string} noteInputDate - Datum
     * @property {string} noteInputFinished - Fertig
     */

    /**
     * gibt die Varaibeln der Notiz als Object zurück
     * @returns {notiz} Abgespeicherte Werte einer Notiz als Notiz-Objekt
     */
    getNote(){

        let notiz = {};
        // let notiz = new Object(); -> noob-info: alternative schreibmöglichkiet zu "{}"

        notiz["noteID"] = this.id;
        notiz["noteInputTitle"] = this.titel;
        notiz["noteInputText"] = this.description;
        notiz["noteInputImportance"] = this.importance;
        notiz["noteInputDate"] = this.date;
        notiz["noteInputFinished"] = this.finished;

        return notiz
    }
}


/**
 * fügt die Daten einer Notizen in den sessionCache des Browsers zu den bereits gespeicherten Notizen hinzu
 * @param {notiz} notiz - Die Angaben zu einer Notiz
 */
function addNoteToSessionCache(notiz) {

    // die bisher gepseicherten notizen lesen und in einen Array ablegen
    let note = getSavedNotes();

    // die neu eingegebene notiz dem array hinzufügen
    note.push(notiz.getNote());

    sessionStorage.notizen = JSON.stringify(note);
}

/**
 * Gibt alle gespeicherten Notizen aus dem sessionCache des Browsers zurück
 * @returns {Array} Die einzelnen Notiz-Objekten sind in einem Array enthalten.
 */
function getSavedNotes() {

    // prüfen, ob bereits Notizen im sessionCache gespeichert sind
    if (sessionStorage.notizen !== undefined){
        return JSON.parse(sessionStorage.notizen);
    }
    else{
        return [];
    }
}


/**
 * Gibt die Informationen einer spezifischenNotiz aus dem sessionstorage zurück
 * @param {string} id - ID der Notiz welche gesucht wird
 * @returns {notiz}
 */
function getNoteByID(id){
    let allNotes = getSavedNotes();

    // Suchen nach der Notiz mit der entsprechenden ID
    for (let i = 0; i < allNotes.length; i++) {
        if (allNotes[i].noteID === id) {
            return new notiz(allNotes[i].noteID,
                allNotes[i].noteInputTitle,
                allNotes[i].noteInputText,
                allNotes[i].noteInputImportance,
                allNotes[i].noteInputDate,
                allNotes[i].noteInputFinished);
        }
    }
}


/**
 *
 * @param {string} id - ID der Notiz welche gelöscht wird
 */
function deleteNote(id){
    let allNotes = getSavedNotes();

    // Alle Notizen werden aus dem sessionstorage gelöscht
    delete sessionStorage.notizen;

    // Suchen nach der Notiz mit der entsprechenden ID
    for (let i = 0; i < allNotes.length; i++) {
        if (allNotes[i].noteID !== id) {
            let note = new notiz(allNotes[i].noteID,
                allNotes[i].noteInputTitle,
                allNotes[i].noteInputText,
                allNotes[i].noteInputImportance,
                allNotes[i].noteInputDate,
                allNotes[i].noteInputFinished);
            addNoteToSessionCache(note);
        }
    }
}
