"use strict";

// Controller für notiz.html


// registrieren aller buttons
document.getElementById("noteBtnSave").onclick = function() {saveNote()};
document.getElementById("noteBtnCancel").onclick = function() {location.href="index.html"};


/**
 * Hauptmethode wenn die Notizseite geöffnet wird
 */
function mainNote(){

    // Prüfen ob eine neue Notiz erstellt, oder ob eine bestehende Notiz bearbeitet werden soll
    if (sessionStorage.create === "create"){
        displayNote();
    }
    else if(typeof(sessionStorage.create) !== "undefined"){
        let note = getNoteByID(sessionStorage.create);
        displayNote(note);
    }

    if (typeof(sessionStorage.style) !== "undefined"){
        if (JSON.parse(sessionStorage.style) === "ori"){
            document.getElementById("style").setAttribute("href", "alternativ.css");
        }
        else{
            document.getElementById("style").setAttribute("href", "style.css");

        }
    }
}


/**
 * Zeigt den Inhalt einer Notiz in Notiz.html an
 * @param {Notiz} [context] - Ein Notizobjekt
 */
function displayNote(context){

    // Handlebar template entgegen nehmen
    let tlContent = document.getElementById("notizBearbeiten");
    let source = tlContent.innerHTML;
    let template = Handlebars.compile(source);

    if (typeof(context) === "undefined"){
        context = {noteInputTitle: "Titel...",
            noteInputText: "Beschreibung...",
            noteInputImportance: "",
            noteInputDate: "",
            noteID: "0",
            noteCreateDate: "0"
        };
    }
    else{
        context = context.getNote();
    }

    // Notizen in das Handlebarstemplate einfügen
    let result = template(context);

    // handlebarteplate inkl. daten in das html einfügen
    tlContent.insertAdjacentHTML('afterend', result);
}


/**
 *Nimmt die Angaben zu einer Notiz aus dem html entgegen und gibt sie zur speicherung an das modell weiter
 */
function saveNote() {

    let title = document.getElementById("noteInputTitle").value;
    let description = document.getElementById("noteInputText").value;
    let importance = document.getElementById("noteInputImportance").value;
    let date = document.getElementById("noteInputDate").value;
    let finished = "";
    if (document.getElementById("noteInputFinished").checked) {
        finished = "checked";
    }

    // falls der erstellt-Tag noch nicht abgefüllt ist.
    let created = document.getElementById("noteCreateDate").getAttribute("value");
    if (created === "0") {
        created = Date.now().toString();
    }


    //erstellen der Notiz-ID oder die notiz als zu editieren senden
    let note;
    let id = document.getElementById("noteIdentifaction").getAttribute("value");
    if (id === "0") {
        id = Date.now() + title + Math.random();
        note = new Notiz(id, title, description, importance, date, finished, created);
        addNoteToStorage(note.getNote());
    }
    else {
        // notiz editieren
        note = new Notiz(id, title, description, importance, date, finished, created);
        editNoteInStorage(note.getNote());
    }

    //die Darstelung zum Erstellen einer Notiz wird durch index.html ersetzt
    window.location.replace("index.html");
}


/**
 * Gibt die Informationen einer spezifischenNotiz aus dem sessionstorage zurück
 * @param {string} id - ID der Notiz welche gesucht wird
 * @returns {Notiz}
 */
function getNoteByID(id){
    let allNotes = getSavedNotes();

    // Suchen nach der Notiz mit der entsprechenden ID
    for (let i = 0; i < allNotes.length; i++) {
        if (allNotes[i].noteID === id) {
            return new Notiz(allNotes[i].noteID,
                allNotes[i].noteInputTitle,
                allNotes[i].noteInputText,
                allNotes[i].noteInputImportance,
                allNotes[i].noteInputDate,
                allNotes[i].noteInputFinished,
                allNotes[i].noteCreateDate);
        }
    }
}