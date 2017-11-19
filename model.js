'use strict';

/**
 * Das Notiz-Objekt representiert eine Notiz mit allen seinen Informationen
 */
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


    /**
     * @typedef {Object} Notiz
     * @property {string} noteID - ID der Notiz
     * @property {string} noteInputTitle - Titel
     * @property {string} noteInputText - Text
     * @property {int} noteInputImportance - Wichtigkeit
     * @property {string} noteInputDate - Datum
     * @property {string} noteInputFinished - Fertig
     * @property {string} noteCreateDate - Erstelldatum
     */

    /**
     * gibt die Variabeln der Notiz als Object zurück
     * @returns {Notiz} Abgespeicherte Werte einer Notiz als Notiz-Objekt
     */
    getNote(){

        let notiz = {};

        notiz["noteID"] = this.id;
        notiz["noteInputTitle"] = this.titel;
        notiz["noteInputText"] = this.description;
        notiz["noteInputImportance"] = this.importance;
        notiz["noteInputDate"] = this.date;
        notiz["noteInputFinished"] = this.finished;
        notiz["noteCreateDate"] = this.created;

        return notiz
    }
}

function addNoteToStorage(notiz){
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://127.0.0.1:3001/addNote", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    xhr.send(JSON.stringify(notiz));
}

function editNoteInStorage(notiz){
    let xhr = new XMLHttpRequest();

    xhr.open("PUT", "http://127.0.0.1:3001/editNote/" + notiz.noteID, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    xhr.send(JSON.stringify(notiz));
}


/**
 * Gibt alle gespeicherten Notizen zurück
 * @returns {Array} Die einzelnen Notiz-Objekten sind in einem Array enthalten.
 */
function getSavedNotes() {

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    let data = null;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            data = this.responseText;
        }
    });

    xhr.open("GET", "http://127.0.0.1:3001/getAllNotes", false);
    // cache-control nicht erlaubt wenn allowCrossDomain aktiv ist
    // xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    return JSON.parse(data);
}


/**
 *
 * @param {string}  sortby - Notiztag nach welchem sortiert werden soll
 * @param {string}  direction - richtung in welche zu sortieren ist
 */
function sortNote(sortby, direction){

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", `http://127.0.0.1:3001/sortAllNotes/${sortby}/${direction}`, false);
    // cache-control nicht erlaubt wenn allowCrossDomain aktiv ist
    // xhr.setRequestHeader("cache-control", "no-cache");
    // xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}