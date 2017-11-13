'use strict';

// Model (MVC-Pattern)


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
        // let notiz = new Object(); -> noob-info: alternative schreibmöglichkiet zu "{}"

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

//
// /**
//  * fügt die Daten einer Notizen in den sessionCache des Browsers zu den bereits gespeicherten Notizen hinzu
//  * @param {Notiz} notiz - Die Angaben zu einer Notiz
//  */
// function addNoteToSessionCache(notiz) {
//
//     // die bisher gepseicherten notizen lesen und in einen Array ablegen
//     let note = getSavedNotes();
//
//     // die neu eingegebene Notiz dem array hinzufügen
//     note.push(notiz.getNote());
//     sessionStorage.notizen = JSON.stringify(note);
//
// }



function addNoteToStorage(notiz){
    let xhr = new XMLHttpRequest();

    // xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === 4) {
    //         console.log(this.responseText);
    //     }
    // });

    xhr.open("POST", "http://127.0.0.1:3001/notiz/addNote", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    xhr.send("notiz=" + JSON.stringify(notiz));

    // console.log(xhr.readyState);
    // console.log(xhr.responseText);

}

// /**
//  * Gibt alle gespeicherten Notizen aus dem sessionCache des Browsers zurück
//  * @returns {Array} Die einzelnen Notiz-Objekten sind in einem Array enthalten.
//  */
// function getSavedNotes() {
//
//     // prüfen, ob bereits Notizen im sessionCache gespeichert sind
//     if (sessionStorage.notizen !== undefined){
//         let noti = sessionStorage.notizen;
//         let noti2 = JSON.parse(noti);
//         return noti2;
//     }
//     else{
//         return [];
//     }
// }



/**
 * Gibt alle gespeicherten Notizen aus dem sessionCache des Browsers zurück
 * @returns {Array} Die einzelnen Notiz-Objekten sind in einem Array enthalten.
 */
function getSavedNotes() {






    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    let data = null;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            data = this.responseText;
        }
    });

    xhr.open("GET", "http://127.0.0.1:3001/notiz/getAllNotes");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    console.log(xhr.responseText);

    return JSON.parse(data)
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
            let note = new Notiz(allNotes[i].noteID,
                allNotes[i].noteInputTitle,
                allNotes[i].noteInputText,
                allNotes[i].noteInputImportance,
                allNotes[i].noteInputDate,
                allNotes[i].noteInputFinished,
                allNotes[i].noteCreateDate);
            addNoteToSessionCache(note);
        }
    }
}


/**
 *
 * @param {string}  sortby - Notiztag nach welchem sortiert werden soll
 * @param {string}  direction - richtung in welche zu sortieren ist
 */
function sortNote(sortby, direction){

    let allNotes = getSavedNotes();

    if (direction === "up") {
        allNotes.sort(function (a, b) {
            return parseInt(String(b[sortby]).replace(/-/g,'')) - parseInt(String(a[sortby]).replace(/-/g,''));
        });
    }
    else {
        allNotes.sort(function (a, b) {
            return parseInt(String(a[sortby]).replace(/-/g,'')) - parseInt(String(b[sortby]).replace(/-/g,''));
        });
    }

    sessionStorage.notizen = JSON.stringify(allNotes);

}