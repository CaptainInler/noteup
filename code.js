"use strict";

document.addEventListener("DOMContentLoaded", main);

function main() {


    let tlContent = document.getElementById("notiz");

    let source = tlContent.innerHTML;
    let template = Handlebars.compile(source);

    let context = [{noteTitle:"Ritesh"},
        {noteTitle:"John"}
    ];

    let result = template(context);

    tlContent.insertAdjacentHTML('afterend', result);
}


function save(){
    let notiz = [];
    //lesen der bisher abgespeicherten Daten


    let notizen = JSON.parse(sessionStorage.getItem("notiz"));
    if (!(notizen === null)){
        notiz.push(notizen)
    }


    //der wert im tag mit id "noteInputText" wird in den array gespeichert
    notiz.push(document.getElementById("noteInputText").value);

    // werte in den sessionstorage speichern
    sessionStorage.setItem("notiz", JSON.stringify(notiz));

    //die alte anzeige wird gelöscht und stattdessen index.html angezeigt
    window.location.replace("index.html");
};







