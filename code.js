function save(){
    var notiz = [];
    //lesen der bisher abgespeicherten Daten


    var notizen = JSON.parse(sessionStorage.getItem("notiz"));
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