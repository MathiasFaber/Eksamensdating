// Denne variabel gemmer 'delete' knappen fra html, så vi kan bruge den senere
var deleteBTN = document.getElementById("deleteBTN");

// Funktionen herunder bliver først kørt når der klikkes på 'delete' knappen
deleteBTN.addEventListener("click", function() {
    // the foundUser variabel is found from the localstorage, as the user that the admin wants to edit or delete, is pushed into localstorage. 
    const foundUser = JSON.parse(localStorage.getItem("foundUser"))
    // If the localstorage is empty, it will return an error alert
    if(foundUser.length<0){
        alert('localstorage is empty');
        return;
    }
    // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
    fetch("http://localhost:7071/api/DeleteUser", {
        method: 'DELETE', // Delete request 
        // The data that is send along with the request is an object, containing the name of the user to be deleted. 
        body: JSON.stringify({
            name: foundUser.name
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }) 
    // the following .then statement runs when the sql query is done, and a response is sent back. 
    .then((data) => {
        // The user that is deleted is also removed from the localstorage
        localStorage.removeItem('foundUser');

        // An alert that tells the admin that the user has been deleted
        alert("User has been deleted succesfully!:D")

        // The admin is sent back to the 'editUsers' page when a user has been deleted
        window.location.href = ("editUsers.html")
    })

    // Error handling. If we catch an error it is console.logged and alerted. 
    .catch((err) => {
        console.log(err)
        alert("Failed to delete")
    });
});