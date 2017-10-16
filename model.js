'use strict'

// Model (MVC-Pattern)



class notiz {

    constructor(titel, description, importance, date) {
        this.titel = titel;
        this.description = description;
        this.importance = importance;
        this.date = date;

    }

    getNote(){

        let notiz = {};

        notiz["noteInputTitle"] = this.titel;
        notiz["noteInputText"] = this.description;
        notiz["noteInputImportance"] = this.importance;
        notiz["noteInputDate"] = this.date;

        return notiz
    }
}

function addToSessionCache(notiz) {

    // die bisher gepseicherten notizen lesen
    let note = getSavedNotes();

    // die neu eingegebene notiz speichern
    note.push(notiz.getNote());

    sessionStorage.notizen = JSON.stringify(note);
}

function getSavedNotes() {


    if (sessionStorage.length >0){
        let content =  JSON.parse(sessionStorage.notizen);
        return content;
    }
    else{
        return [];
    }



}