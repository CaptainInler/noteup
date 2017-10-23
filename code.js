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

    // let context = [{noteInputTitle:"Julia", noteInputText:"testJulia", noteInputDate:"2017-10-03"},
    //     {noteInputTitle:"Daniel", noteInputText:"testDaniel"},
    //     {noteInputTitle:"Christoph", noteInputText:"testChristoph"},
    //     {noteInputTitle:"Marc", noteInputText:"testMarc"}
    // ];

    // Notizen in das Handlebarstemplate einfügen
    let result = template(context);

    // handlebarteplate inkl. daten in das html einfügen
    tlContent.insertAdjacentHTML('afterend', result);
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
        // Idder bearbeitenden Notiz finden und in den sessionstorage ablegen
        sessionStorage.create = event.parentNode.parentNode.firstElementChild.getAttribute("value");
    }
    window.location.replace("notiz.html");
}



// -------------------------------------------------------------------------------------------------------------------
// Teil für notiz.html

/**
 * Hauptmethode wenn die Notizseite geöffnet wird
 */
function mainNote(){

    // Prüfen ob eine neu Notiz erstellt, oder ob eine bstehende Notiz bearbeitet werden soll
    if (sessionStorage.create === "create"){
        displayNote();
    }
    else if(sessionStorage.create !== undefined){
        // Notiz aus dem Sessionstorage heraussuchen und darstellen lassen
        let note = getNoteByID(sessionStorage.create);
        deleteNote(sessionStorage.create);
        displayNote(note);
    }
}


/**
 * Zeigt den Inhlat einer Notiz in notiz.html an
 * @param {notiz} [context] - Die Angaben zu einer Notiz
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
            noteInputDate: ""
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
    let id = title + window.performance.now() + Math.random();

    let note = new notiz(id, title, description, importance, date, finished);

    addNoteToSessionCache(note);

    //die Darstelung zum Erstellen einer Notiz wird durch index.html ersetzt
    window.location.replace("index.html");
}