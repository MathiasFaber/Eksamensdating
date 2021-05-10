// Defining a variable that 'saves' the delete button from HTML for use 
var deleteBTN = document.getElementById("deleteBTN");

// Function is called when the delete button i clicked
deleteBTN.addEventListener("click", function() {
    // The foundUser variable is found from the sessionStorage, as the user that the admin wants to edit or delete, is pushed into sessionStorage 
    const foundUser = JSON.parse(sessionStorage.getItem("foundUser"))
    // If the sessionStorage is empty (less than zero), it will return an error alert
    if(foundUser.length<0){
        alert('Sessionstorage is empty');
        return;
    }
    
    // If the requested fetch in the function admin.deleteUser went well, this callback function is called
    function myCallBack() {
        // The user that is deleted is also removed from the localstorage
        sessionStorage.removeItem('foundUser');
        // An alert that tells the admin that the user has been deleted
        alert("User has been deleted succesfully");
        // The admin is sent back to the 'editUsers' page when a user has been deleted
        window.location.href = ("editUsers.html");
    }

    // When instantiating the class, there is no need for inserting values since only the methods of the class is interesting
    var admin = new Admin(null, null, 2);
    // Calling the deleteUser function in the Admin class with foundUser.userId and myCallBack as inputs
    admin.deleteUser(foundUser.userId, myCallBack);

});