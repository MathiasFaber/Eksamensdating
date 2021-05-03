//opretter en variabel for log ud knappen
var logOutBTN = document.getElementById("logout");

//Funktionen startes ved klik på log ud knappen 
logOutBTN.addEventListener("click", function() {
    //sletter data fra localStorage 
    localStorage.removeItem('currentUser'); 

    //sender brugeren til siden, hvor vedkommende kan logge ind 
    window.location.replace("./login.html")
}) 