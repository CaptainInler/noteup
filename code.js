"use strict";

// Controller

/**
 * Liest die gespeicherten Notizen aus dem Modell aus und gibt sie in die Browseranzeige aus.
 */
function main() {

    // Handlebar template entgegen nehmen
    let tlContent = document.getElementById("notizVorlage");
    let source = tlContent.innerHTML;
    let template = Handlebars.compile(source);

    // abrufen der bereits gespeicherten Notizen
    let context = getSavedNotes();



    function checkDone(notiz) {
        if (notiz.noteInputFinished === ""){
            return notiz;
        }

    }

    let showDone = sessionStorage.showDone;

    if (showDone === undefined){
        showDone = false;
    }
    else {
        showDone = JSON.parse(sessionStorage.showDone);
    }

    if (!showDone) {
        context= context.filter(checkDone);
    }


    // Notizen in das Handlebarstemplate einfügen
    let result = template(context);


    // handlebarteplate inkl. daten in das html einfügen
    tlContent.insertAdjacentHTML('afterend', result);

    document.getElementById("shFinished").checked = showDone;


    if (sessionStorage.style !== undefined){
        if (JSON.parse(sessionStorage.style) === "ori"){
            document.getElementById("style").setAttribute("href", "alternativ.css");
            document.getElementById("changeStyle").setAttribute("value", "alternativ");
            document.getElementById("changeStyle").innerHTML = "Hier gehts zurück";
        }
        else{
            document.getElementById("style").setAttribute("href", "style.css");
            document.getElementById("changeStyle").setAttribute("value", "ori");
            document.getElementById("changeStyle").innerHTML = "Nicht Drücken";

        }
    }


}


/**
 * Wird aufgerufen, wenn auf der Hauptseite der Button zum erstellen oder editiern einer Notiz geklickt wird.
 */
function editNote(event){

    // prüfen ob eine neue Notiz erstellt werden soll oder eine bestehende editiert
    if (event.id === "createNote"){
        sessionStorage.create = "create";
    }
    else if (event.id === "editNote"){
        // ID der bearbeitenden Notiz finden und in den sessionstorage ablegen
        sessionStorage.create = event.parentNode.parentNode.firstElementChild.getAttribute("value");
    }
    window.location.replace("notiz.html");
}

/**
 * Sortiert die gespeicherten Notizen nach der Datum wann es abgeschlossen sein soll
 * @param {string} direction - "up" oder "down" je nach dem in welche richtung sortiert werden soll
 */
function sortFinished(direction) {

    sortNote("noteInputDate", direction);
    window.location.replace("index.html");
}


/**
 * Sortiert die gespeicherten Notizen nach der Datum wann sie erstellt wurden
 * @param {string} direction - "up" oder "down" je nach dem in welche richtung sortiert werden soll
 */
function sortCreate(direction) {

    sortNote("noteCreateDate", direction);
    window.location.replace("index.html");
}

/**
 * Sortiert die gespeicherten Notizen nach der Wichtigkeit
 * @param {string} direction - "up" oder "down" je nach dem in welche richtung sortiert werden soll
 */
function sortImportance(direction) {

    sortNote("noteInputImportance", direction);
    window.location.replace("index.html");
}

/**
 * Zeigt auf der Hauptseite die erledigten Notizen an oder eben nicht
 * @param checkbox
 */
function ckbshFinished(checkbox) {

    if(checkbox.checked){
        sessionStorage.showDone = JSON.stringify(true);
    }
    else {
        sessionStorage.showDone = JSON.stringify(false);
    }

    window.location.replace("index.html");
}


function changeStyle(button){

    if(button.value === "ori"){
        sessionStorage.style = JSON.stringify("ori");
    }
    else {
        sessionStorage.style = JSON.stringify("alternativ");
    }

    window.location.replace("index.html");

}



// -------------------------------------------------------------------------------------------------------------------
// Teil für notiz.html

/**
 * Hauptmethode wenn die Notizseite geöffnet wird
 */
function mainNote(){

    // Prüfen ob eine neue Notiz erstellt, oder ob eine bestehende Notiz bearbeitet werden soll
    if (sessionStorage.create === "create"){
        displayNote();
    }
    else if(sessionStorage.create !== undefined){
        // Notiz aus dem Sessionstorage heraussuchen und darstellen lassen
        let note = getNoteByID(sessionStorage.create);
        displayNote(note);
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

    if (context === undefined){
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
function saveNote(){

    let title = document.getElementById("noteInputTitle").value;
    let description = document.getElementById("noteInputText").value;
    let importance = document.getElementById("noteInputImportance").value;
    let date = document.getElementById("noteInputDate").value;
    let finished = "";
    if (document.getElementById("noteInputFinished").checked){
        finished = "checked";
    }

    let created = document.getElementById("noteCreateDate").getAttribute("value");
    if (created==="0"){
        created = Date.now();
    }

    let id = document.getElementById("noteIdentifaction").getAttribute("value");
    if (id==="0"){
        id = Date.now() + title + Math.random();
    }
    else{
        // löschen der alten Notiz
        deleteNote(id);
    }

    let note = new notiz(id, title, description, importance, date, finished, created);

    addNoteToSessionCache(note);

    //die Darstelung zum Erstellen einer Notiz wird durch index.html ersetzt
    window.location.replace("index.html");
}