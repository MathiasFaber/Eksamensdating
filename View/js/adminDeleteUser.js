// Denne variabel gemmer 'delete' knappen fra html, så vi kan bruge den senere
var deleteBTN = document.getElementById("deleteBTN");

// Funktionen herunder bliver først kørt når der klikkes på 'delete' knappen
deleteBTN.addEventListener("click", function() {
    // the foundUser variabel is found from the localstorage, as the user that the admin wants to edit or delete, is pushed into localstorage. 
    const foundUser = JSON.parse(sessionStorage.getItem("foundUser"))
    // If the localstorage is empty, it will return an error alert
    if(foundUser.length<0){
        alert('Sessionstorage is empty');
        return;
    }

    console.log('GUI foundUser: ', foundUser);
    debugger;
    // Indsætter ikke værdier i klassen, da vi blot er interesseret i klassens funktioner
    var admin = new Admin(null, null, null);
    
    function myCallBack() {
        // The user that is deleted is also removed from the localstorage
        sessionStorage.removeItem('foundUser');
        // An alert that tells the admin that the user has been deleted
        alert("User has been deleted succesfully");
        // The admin is sent back to the 'editUsers' page when a user has been deleted
        window.location.href = ("editUsers.html");
    }

    admin.deleteUser(foundUser.name, myCallBack);

});