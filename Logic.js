'use strict'

// Variablen Deklaration
const main_inhalttext_fabian = document.querySelector('.main-inhalttext-fabian');
const main_inhalttext_rebecca = document.querySelector('.main-inhalttext-rebecca');
const main_inhalttext_datum = document.querySelector('.main-inhalttext-datum');

// Einzeiler
setInterval(() => {
    addNewDiaryEntry();
}, 2000);


// Funktionen
function addNewDiaryEntry(){
    var inputField =  document.createElement("input");
    inputField.setAttribute("type","text");  
    document.querySelector(".main-inhalttext-fabian").appendChild(inputField);}
