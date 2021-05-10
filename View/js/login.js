// The login button is defined
var loginButton = document.getElementById("login");

// When the login button is pressed, the following function runs. 
loginButton.addEventListener('click', function(){
    // The user writes an email and a password, which is saved in these variables. 
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    function myCallBack(data) {
        console.log('myCallBack ', data);
        // If the data matches a user, the localstorage key 'currentUser' is set and the user is sent to 'myProfile'
        console.log('User inserted in local storage')
        localStorage.setItem('currentUser', JSON.stringify(data));
        window.location.href = ("myProfile.html")
    }

    var user = new User(null, email, password, null, null, null, null, null, null, null);
    user.login(myCallBack);
});
