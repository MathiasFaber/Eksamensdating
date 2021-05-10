// The login button is defined
var loginButton = document.getElementById("login");

// When the login button is pressed, the following function runs
loginButton.addEventListener('click', function(){
    // The user writes an email and a password, which is saved in these variables
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    // If the requested fetch in the function admin.adminLogin went well, this callback function is called
    function myCallBack(data) {
        // If the data sent back, is correct, the localstorage key 'currentUser' is updated and the admin is allowed access to the admin functions. 
        console.log('User inserted in local storage');
        localStorage.setItem('currentUser', JSON.stringify(data));
        // The admin is sent back to the 'editUsers' page when a user has been deleted
        window.location.href = ("adminControlpanel.html");
    }

    // Instantiating the class with email and password as value + the roleId defining that the user is an admin
    var admin = new Admin(email, password, 2);
    // Calling the adminLogin function in the Admin class with myCallBack as input
    admin.adminLogin(myCallBack);
});
 