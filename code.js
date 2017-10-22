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
    //
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


    if (event.id === "createNote"){
        sessionStorage.create = "create";
    }
    else if (event.id === "editNote"){
        // ID der bearbeitenden Notiz finden
        let valueIdentifi = event.parentNode.parentNode.firstElementChild.getAttribute("value");
        // Id in den sessionstorage ablegen
        sessionStorage.create = valueIdentifi;
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
        displayEmptyNote();
    }
    else if(sessionStorage.create !== undefined){
        let note = getNoteByID(sessionStorage.create);
        displayEditNote(note);
    }
}

/**
 * Gibt die Informationen einer spezifischenNotiz aus dem sessionstorage zurück
 * @param id - ID der Notiz welche gesucht wird
 */
function getNoteByID(id){
    let allNotes = getSavedNotes();

    // Suchen nach der Notiz mit der entsprechenden ID
    for (var i = 0; i < allNotes.length; i++) {
        if (allNotes[i].noteID == id) {
            return allNotes[i]
        }
    }
}

/**
 *
 * @param id
 */
function deleteNote(id){
//TODO: hier gehts weiter
}



/**
 * Aktion wenn eine neue Notiz erstellt werden soll
 */
function displayEmptyNote(){

    // Handlebar template entgegen nehmen
    let tlContent = document.getElementById("notizBearbeiten");
    let source = tlContent.innerHTML;
    let template = Handlebars.compile(source);


    let context = {noteInputTitle: "Titel...",
        noteInputText: "Beschreibung...",
        noteInputImportance: "",
        noteInputDate: ""
    };


    // Notizen in das Handlebarstemplate einfügen
    let result = template(context);

    // handlebarteplate inkl. daten in das html einfügen
    tlContent.insertAdjacentHTML('afterend', result);
}


/**
 * Zeigt den inhlat einer notiz in notiz.html an
 */
function displayEditNote(context){

    // Handlebar template entgegen nehmen
    let tlContent = document.getElementById("notizBearbeiten");
    let source = tlContent.innerHTML;
    let template = Handlebars.compile(source);


    // let context = {noteInputTitle: "Titel...",
    //     noteInputText: "Beschreibung...",
    //     noteInputImportance: "",
    //     noteInputDate: ""
    // };


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
    let id = title + window.performance.now() + Math.random();

    let note = new notiz(id, title, description, importance, date);

    addToSessionCache(note);

    //die Darstelung zum Erstellen einer Notiz wird durch index.html ersetzt
    window.location.replace("index.html");

}