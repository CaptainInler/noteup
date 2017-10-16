"use strict";

// Controller

document.addEventListener("DOMContentLoaded", main);

function main() {

    // Handlebar template entgegen nehmen
    let tlContent = document.getElementById("notizVorlage");

    // TODO: Im Moment wird hier geschaut ob man im korrekten html ist. Vielleicht mit namespaces lösen?
    // https://stackoverflow.com/a/9059603

    if (tlContent === null){
        return;
    }

    let source = tlContent.innerHTML;
    let template = Handlebars.compile(source);

    let context = getSavedNotes();

    // let context = [{noteInputTitle:"Julia", noteInputText:"testJulia", noteInputDate:"2017-10-03"},
    //     {noteInputTitle:"Daniel", noteInputText:"testDaniel"},
    //     {noteInputTitle:"Christoph", noteInputText:"testChristoph"},
    //     {noteInputTitle:"Marc", noteInputText:"testMarc"}
    //
    // ];



    let result = template(context);

    tlContent.insertAdjacentHTML('afterend', result);
}



function save(){

    let title = document.getElementById("noteInputTitle").value;
    let description = document.getElementById("noteInputText").value;
    let importance = document.getElementById("noteInputImportance").value;
    let date = document.getElementById("noteInputDate").value;


    let note = new notiz(title, description, importance, date)

    addToSessionCache(note)

    //die alte anzeige wird gelöscht und stattdessen index.html angezeigt
    window.location.replace("index.html");

}







