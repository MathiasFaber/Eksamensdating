// The login button is defined
var loginButton = document.getElementById("login");

// When the login button is pressed, the following function runs. 
loginButton.addEventListener('click', function(){
    // The user writes an email and a password, which is saved in these variables. 
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    // If the requested fetch in the function user.login went well, this callback function is called
    function myCallBack(data) {
        console.log('User inserted in local storage')        
        // If the data matches a user, the localstorage key 'currentUser' is set
        localStorage.setItem('currentUser', JSON.stringify(data));
        // The user is sent to 'myProfile'
        window.location.href = ("myProfile.html")
    }

    // Instantiating the User with attributes from the currentUser
    var user = new User(null, email, password, null, null, null, null, null, null, null);
    // Calling the login function in the User class with myCallBack as inputs
    user.login(myCallBack);
});
