'use strict'

let dateNow = getDate();
document.getElementById('main-inhaltdatum-datum-datum').innerText = dateNow;

function writeCookieVorbereitung(Name){
    let Datum = getDate();
    let myText = document.querySelector("#main-inhalttext-fabian-inhalt").value;

    if(Name === "Rebecca")
        myText = document.querySelector("#main-inhalttext-rebecca-inhalt").value;
        writeCookie(Datum, Name, myText);
}

function writeCookie(Datum, Name, myText){
    document.cookie = `${Datum + "!" + Name}=${myText}`;
    loadCookie();
}

function loadCookie(){
    let MyCookies = document.cookie;
    MyCookies = MyCookies.split(";");
    MyCookies.forEach(element => {
        let myText = element.split("!");
        myText[0] = myText[0].replace(" ","");
        if(myText[0] == getDate()){
            let message = myText[1].split("=");
            if(message[0] == "Rebecca"){
                document.querySelector("#main-inhalttext-rebecca-inhalt").value = message[1];
            }
            else{
                document.querySelector("#main-inhalttext-fabian-inhalt").value = message[1];
            } 
        }});
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


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }