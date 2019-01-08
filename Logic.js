'use strict'

// Variablen Deklaration
const main_inhalttext_fabian = document.querySelector('.main-inhalttext-fabian');
const main_inhalttext_rebecca = document.querySelector('.main-inhalttext-rebecca');
const main_inhalttext_datum = document.querySelector('.main-inhalttext-datum');

// Einzeiler
setInterval(() => {
    addNewDiaryEntry();
}, 5000);


// Funktionen
function addNewDiaryEntry(){
    let inputField =  document.createElement("input");
    inputField.setAttribute("type","text");  
    inputField.setAttribute("id","main-inputfeld"); 
    let inputField1 =  document.createElement("input");
    inputField1.setAttribute("type","text");  
    inputField1.setAttribute("id","main-inputfeld"); 
    let dateField = document.createElement("p")
    dateField.setAttribute("type", "text");
    let dateNow = getDate();
    dateField.innerText = dateNow;
    

    document.querySelector(".main-inhaltdatum-datum").appendChild(dateField);
    document.querySelector(".main-inhalttext-fabian").appendChild(inputField);
    document.querySelector(".main-inhalttext-rebecca").appendChild(inputField1);
    

}

function getDate(){
    var date = new Date();
    var tag = date.getDate();
    var monatDesJahres = date.getMonth();
    var jahr = date.getFullYear();
    var tagInWoche = date.getDay();
    var wochentag = new Array("Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag");
    var monat = new Array("Januar", "Februar", "M&auml;rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember");
    var datum = tag + "." + (monatDesJahres + 1) + "." + jahr;
    return datum;
}
