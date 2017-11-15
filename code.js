"use strict";

// Controller für index.html

// registrieren aller buttons
document.getElementById("fnDatedown").onclick = function() {sortFinished("down")};
document.getElementById("fnDateup").onclick = function() {sortFinished("up")};

document.getElementById("sortCreatedown").onclick = function() {sortCreate("down")};
document.getElementById("sortCreateup").onclick = function() {sortCreate("up")};

document.getElementById("sortImportdown").onclick = function() {sortImportance("down")};
document.getElementById("sortImportup").onclick = function() {sortImportance("up")};

document.getElementById("createNote").onclick = function() {editNote(this)};
document.getElementById("changeStyle").onclick = function() {changeStyle(this)};



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

    (console.log(context));


    function checkDone(notiz) {
        if (notiz.noteInputFinished === ""){
            return notiz;
        }
    }

    let showDone = sessionStorage.showDone;
    // Prüfen, ob die Checkbox "Erledigt anzeigen" aktiviert ist
    if (typeof(showDone) === "undefined"){
        showDone = false;
    }
    else {
        showDone = JSON.parse(sessionStorage.showDone);
    }

    if (!showDone) {
        // Notizen herausfiltern, die erledigt sind
        context= context.filter(checkDone);
    }

    // Notizen in das Handlebarstemplate einfügen
    let result = template(context);


    // handlebarteplate inkl. daten in das html einfügen
    tlContent.insertAdjacentHTML('afterend', result);

    document.getElementById("shFinished").checked = showDone;


    if (typeof(sessionStorage.style) !== "undefined"){
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