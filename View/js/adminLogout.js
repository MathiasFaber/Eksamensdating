// The logout button is stored in a variable
var logOutButton = document.getElementById("logout");

// When the button is clicked, this function runs
logOutButton.addEventListener("click", function() {

    // The localstorage key 'currentUser' is removed
    localStorage.removeItem('currentUser'); 

    // The user is send back to the login page
    window.location.replace("./login.html")
}) 