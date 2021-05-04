var loginButton = document.getElementById("login");

loginButton.addEventListener('click', function(){
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
    fetch("http://localhost:7071/api/loginAdmin", {
        method: 'POST', // post request
        // The admins email and password is sent along with the request, for the db function to verify the login. 
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    // The response object is stringified in order to put it into localstorage in the next .then statement.
    .then((response) => {
        console.log(response)
        return response.json();
    })
    // If there is sent no data back, an error is console.logged
    .then((data) => {
        if(data.length == 0){
            console.log("no user lol")
        } else {
            // If the data sent back, is correct, the localstorage key 'currentUser' is updated and the admin is allowed access to the admin functions. 
            console.log("yes very much user")
            localStorage.setItem('currentUser', JSON.stringify(data));
            window.location.href = ("adminControlpanel.html")
        }
    })
    .catch((err) => {
        console.log(err)
        alert("User not authorized")
    })

})
 