"use strict"

//Variablen
const httpObjekt = new XMLHttpRequest(); 
const jsonServerURL = 'http://172.20.240.196:3000/Produkte'; 
const content = document.querySelector('#content');
let produktTemplate = document.querySelector('#produktTemplate');
var produkte = []; 
const cartProdukte = [];
const arrWarenkorb = [];
let loginModal = document.getElementById('LoginModal');
let createProduktModal = document.getElementById('ProduktModal');
let WarenkorbModal = document.getElementById('WarenkorbModal');
let closeXLogin = document.getElementsByClassName("close")[0];
let closeXcreate = document.getElementsByClassName("close")[1];
let closeXWarenkorb = document.getElementsByClassName("close")[2];

//Funktionen
function loadProdukte(){    
    httpObjekt.onreadystatechange = () => {  
        if(httpObjekt.readyState === httpObjekt.DONE){  
            handleResponse(httpObjekt.responseText); 
        }
    }
    httpObjekt.open('GET', jsonServerURL);
    httpObjekt.send();
}

function handleResponse(responseText){
    produkte = JSON.parse(responseText);
    produkte.forEach(element => {
        addProduktToPage(element.Name, element.Beschreibung, element.Quelle, element.id)
    });
}

function addProduktToPage(Name, Beschreibung, Quelle, ObjektID){
    produktTemplate.content.querySelector('.ProduktBz').textContent = Name;
    produktTemplate.content.querySelector('.ProduktPr').textContent = Beschreibung;
    produktTemplate.content.querySelector('#prodSize').src = Quelle;
    
    let WagenImage = "./bilder/cart.png";
    produktTemplate.content.querySelector('.imgInput').innerHTML = `<img id="cartSize" onclick="addToCart(${ObjektID})" src="${WagenImage}"></img>`;
    let cloneDesTemplates = document.importNode(produktTemplate.content, true);
    content.prepend(cloneDesTemplates);
}

function accountClicked(){
    loginModal.style.display = "block";
}

closeXLogin.onclick = function() {
    loginModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    }
  }

function speicherProdukte(){
    createProduktModal.style.display = "block";
}

closeXcreate.onclick = function() {
    createProduktModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == createProduktModal) {
      createProduktModal.style.display = "none";
    }
  }

function cartClicked(){
    vorbereitungInCookie();
    WarenkorbModal.style.display = "block";
}

closeXWarenkorb.onclick = function() {
    WarenkorbModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == WarenkorbModal) {
    WarenkorbModal.style.display = "none";
  }
}

function login(){
    let Benutzername = document.getElementById('username').value;
    let Passwort = document.getElementById('password').value;

   if(Benutzername === '' && Passwort === ''){
       let createButton = document.getElementById('btnsCreate');
       createButton.style.visibility = 'visible';
       loginModal.style.display = "none";
       document.getElementById('myBtn').src = './bilder/accred.jpeg';
   }
   else{
       alert('Login fehlgeschlagen!');
   }
}

function createProdukt(){
    let produktName = document.getElementById('produktName').value;
    let produktBeschreibung = document.getElementById('produktBeschreibung').value;
    let produktQuelle = document.getElementById('produktQuelle').value;
    let fehlerMeldung = document.getElementById('Meldungen');

    if(produktName === '' || produktBeschreibung === '' || produktQuelle === ''){
        fehlerMeldung.innerHTML = `<p id="errorHandling">Bitte füllen Sie alles aus!</p>`;
    }
    else{
        fehlerMeldung.innerHTML = `<p id="successHandling">Produkt erstellt!</p>`;
        let produktInformationen = {
            Name: String,
            Beschreibung: String,
            Quelle: String
        }
    
        produktInformationen.Name = produktName;
        produktInformationen.Beschreibung = produktBeschreibung;
        produktInformationen.Quelle = produktQuelle;

        let neuesProdukt = JSON.stringify(produktInformationen);
    
        httpObjekt.open('POST', jsonServerURL);
        httpObjekt.setRequestHeader('Content-Type', 'application/json');
        httpObjekt.send(neuesProdukt);
    }
}

function addToCart(IDFürWarenkorb){
    document.getElementById('cart').src = './bilder/cartred.png';
    cartProdukte.push(IDFürWarenkorb);
    console.log(cartProdukte);   
}

function vorbereitungInCookie(){
    cartProdukte.reverse();

    cartProdukte.forEach(eintragImWarenkorb => {
        produkte.forEach(aktProdukt => {
            if(eintragImWarenkorb == aktProdukt.id){
                arrWarenkorb.push(aktProdukt);
                schreibeInCookies();
            }
        });
    });
}

function schreibeInCookies(){
    arrWarenkorb.forEach(element => {        
        document.cookie = `beschreibung${element.id}=${element.Beschreibung}`;
        document.cookie = `name${element.id}=${element.Name}`;
    });
    ladeAusCookie();
}

function fülleWarenkorb(NameWK, BeschreibungWK){
    let template = document.getElementById('warenkorbTemplate');
    let mycont = document.getElementById('Warenliste');

    template.content.querySelector('.warenkorbName').textContent = NameWK;
    template.content.querySelector('.warenkorbBeschreibung').textContent = BeschreibungWK;

    let clone = document.importNode(template.content, true);
    mycont.prepend(clone);
}


function ladeAusCookie(){
    const cookieContent = document.cookie;
    console.log(cookieContent);
    // fülleWarenkorb(name, beschreibung);
}
