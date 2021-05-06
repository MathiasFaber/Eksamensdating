// The login button is defined
var loginButton = document.getElementById("login");

// When the login button is pressed, the following function runs. 
loginButton.addEventListener('click', function(){
    // The user writes an email and a password, which is saved in these variables. 
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
    fetch("http://localhost:7071/api/login", {
        method: 'POST',
        body: JSON.stringify({
            // The email and password is send to the API, in order to check with the database, whether the login details are correct. 
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }) 
    .then((response) => {
        console.log(response)
        return response.json();
    })
    // If the data doesnt match any user, an error is alerted
    .then((data) => {
        if(data.length == 0){
            console.log("no user lol")
            alert("No user, try again")
        }else{
            // If the data matches a user, the localstorage key 'currentUser' is set and the user is sent to 'myProfile'
            console.log("yes very much user")
            localStorage.setItem('currentUser', JSON.stringify(data));
            window.location.href = ("myProfile.html")
        }
    })
    // If there is an error, an error message is alerted. 
    .catch((err) => {
        console.log(err)
        alert("Failed to login")
    })

})
