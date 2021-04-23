
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
        localStorage.setItem('currentUser', JSON.stringify(data));
        //Dette skal KUN være username og password

        window.location.href = ("myProfile.html")
    })
    .catch((err) => {
        console.log(err)
        alert("Failed to login")
    })


})
