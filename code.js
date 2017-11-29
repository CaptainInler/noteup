"use strict";

// Controller für index.html

// registrieren aller buttons
document.getElementById("fnDatedown").onclick = function() {code.sortFinished("down")};
document.getElementById("fnDateup").onclick = function() {code.sortFinished("up")};

document.getElementById("sortCreatedown").onclick = function() {code.sortCreate("down")};
document.getElementById("sortCreateup").onclick = function() {code.sortCreate("up")};

document.getElementById("sortImportdown").onclick = function() {code.sortImportance("down")};
document.getElementById("sortImportup").onclick = function() {code.sortImportance("up")};

document.getElementById("createNote").onclick = function() {code.editNote(this)};
document.getElementById("changeStyle").onclick = function() {code.changeStyle(this)};


let code = {

        /**
         * Liest die gespeicherten Notizen aus dem Modell aus und gibt sie in die Browseranzeige aus.
         */
        main: function (){

        // Handlebar template entgegen nehmen
        let tlContent = document.getElementById("notizVorlage");
        let source = tlContent.innerHTML;
        let template = Handlebars.compile(source);

        // abrufen der bereits gespeicherten Notizen
        let context = model.getSavedNotes();

        (console.log(context));

        function checkDone(notiz) {
            if (notiz.noteInputFinished === "") {
                return notiz;
            }
        }

        let showDone = sessionStorage.showDone;
        // Prüfen, ob die Checkbox "Erledigt anzeigen" aktiviert ist
        if (typeof(showDone) === "undefined") {
            showDone = false;
        }
        else {
            showDone = JSON.parse(sessionStorage.showDone);
        }

        if (!showDone) {
            // Notizen herausfiltern, die erledigt sind
            context = context.filter(checkDone);
        }

        // Notizen in das Handlebarstemplate einfügen
        let result = template(context);

        // handlebarteplate inkl. daten in das html einfügen
        tlContent.insertAdjacentHTML('afterend', result);

        document.getElementById("shFinished").checked = showDone;

        if (typeof(sessionStorage.style) !== "undefined") {
            if (JSON.parse(sessionStorage.style) === "ori") {
                document.getElementById("style").setAttribute("href", "alternativ.css");
                document.getElementById("changeStyle").setAttribute("value", "alternativ");
                document.getElementById("changeStyle").innerHTML = "Hier gehts zurück";
            }
            else {
                document.getElementById("style").setAttribute("href", "style.css");
                document.getElementById("changeStyle").setAttribute("value", "ori");
                document.getElementById("changeStyle").innerHTML = "Nicht Drücken";
            }
        }
    },


    /**
     * Wird aufgerufen, wenn auf der Hauptseite der Button zum erstellen oder editiern einer Notiz geklickt wird.
     */
    editNote: function (event) {

        // prüfen ob eine neue Notiz erstellt werden soll oder eine bestehende editiert
        if (event.id === "createNote") {
            sessionStorage.create = "create";
        }
        else if (event.id === "editNote") {
            // ID der bearbeitenden Notiz finden und in den sessionstorage ablegen
            sessionStorage.create = event.parentNode.parentNode.firstElementChild.getAttribute("value");
        }
        window.location.replace("notiz.html");
    },

    /**
     * Sortiert die gespeicherten Notizen nach der Datum wann es abgeschlossen sein soll
     * @param {string} direction - "up" oder "down" je nach dem in welche richtung sortiert werden soll
     */
    sortFinished: function (direction) {

        model.sortNote("noteInputDate", direction);
        window.location.replace("index.html");
    },


    /**
     * Sortiert die gespeicherten Notizen nach der Datum wann sie erstellt wurden
     * @param {string} direction - "up" oder "down" je nach dem in welche richtung sortiert werden soll
     */
    sortCreate: function (direction) {

        model.sortNote("noteCreateDate", direction);
        window.location.replace("index.html");
    },

    /**
     * Sortiert die gespeicherten Notizen nach der Wichtigkeit
     * @param {string} direction - "up" oder "down" je nach dem in welche richtung sortiert werden soll
     */
    sortImportance: function (direction) {

        model.sortNote("noteInputImportance", direction);
        window.location.replace("index.html");
    },

    /**
     * Zeigt auf der Hauptseite die erledigten Notizen an oder eben nicht
     * @param checkbox
     */
    ckbshFinished: function (checkbox) {

        if (checkbox.checked) {
            sessionStorage.showDone = JSON.stringify(true);
        }
        else {
            sessionStorage.showDone = JSON.stringify(false);
        }

        window.location.replace("index.html");
    },

    changeStyle: function (button) {

        if (button.value === "ori") {
            sessionStorage.style = JSON.stringify("ori");
        }
        else {
            sessionStorage.style = JSON.stringify("alternativ");
        }

        window.location.replace("index.html");

    }

};