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
        // Notiz aus dem Sessionstorage heraussuchen und darstellen lassen
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
 * Zeigt den Inhlat einer Notiz in notiz.html an
 * @param {notiz} [context] - Ein Notizobjekt
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

    let created = document.getElementById("noteCreateDate").getAttribute("value");
    if (created === "0") {
        created = Date.now();
    }

    let id = document.getElementById("noteIdentifaction").getAttribute("value");
    if (id === "0") {
        id = Date.now() + title + Math.random();
    }
    else {
        // löschen der alten Notiz
        deleteNote(id);
    }

    let note = new notiz(id, title, description, importance, date, finished, created);

    addNoteToSessionCache(note);

    //die Darstelung zum Erstellen einer Notiz wird durch index.html ersetzt
    window.location.replace("index.html");
}
