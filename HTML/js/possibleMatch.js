// Dele af dette stykke kode er udarbejdet i samarbejde med min studiegruppe
// Henter oneUsre fra html og gemmer den i en variabel. 
var userContainer = document.getElementById('oneUser');

// Henter founduser fra localstorage, så vi ved hvilken person der er på skærmen.
// Founduser er en key fra localstorage, som oprettes når brugeren trykker ind på en profil. 
// den profil der trykkes på sendes til localstorage key "founduser"
var user = JSON.parse(localStorage.getItem('founduser'));

// laver en container, hvori brugerne skal indsættes/vises
var container = document.createElement('container');

// Her laves en klasse til den bruger som skal vises på siden. 
container.className = "container";

// Her viser jeg navnet på den person brugeren har trykket ind på.  
container.innerHTML += '<div class="name"> Name: ' + user.name + '</div>';
container.innerHTML += '<div class="city"> Birthdate: ' + user.birthdate + '</div>';
container.innerHTML += '<div class="phone"> Gender: ' + user.genderID + '</div>';

// Her kunne man overveje at vise flere oplysninger om brugeren på siden, dette skal bestemt implementeres ved en videreudvikling af appen. 

// Her bruges appendChild funktionen til at sætte container efter userContainer. 
userContainer.appendChild(container);

// Her laves Like knappen for den bruger der er valgt. 
// knappen har en "onclick" funktion, som gør at når der trykkes på knappen, kører funktionen som sender liket til serveren, og det gemmes i likes.JSON. 
var addALike = '<button type="button" onclick="addToMylikes()" class ="addALikeBtn">Like';

// Indsætter addALike i containeren 
container.innerHTML += addALike;