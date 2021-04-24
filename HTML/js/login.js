
var loginButton = document.getElementById("login");

loginButton.addEventListener('click', function(){
    var name = document.getElementById("name").value
    var password = document.getElementById("password").value

    fetch("http://localhost:7071/api/login", {
        method: 'POST',
        body: JSON.stringify({
            name: name,
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
    .then((data) => {
        // vi skal have brugeren der logger ind ID gemt i localstorage. 

        let user = user.find() //to be continued
        localStorage.setItem('currentUser', JSON.stringify(data));

        window.location.href = ("myProfile.html")
    })
    .catch((err) => {
        console.log(err)
        alert("Failed to login")
    })

})
