
var loginButton = document.getElementById("login");

loginButton.addEventListener('click', function(){
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    fetch("http://localhost:7071/api/login", {
        method: 'POST',
        body: JSON.stringify({
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
    .then((data) => {
        if(data.length == 0){
            console.log("no user lol")
        }else{
            console.log("yes very much user")
            localStorage.setItem('currentUser', JSON.stringify(data));
            window.location.href = ("myProfile.html")
        }
        
        
    })
    .catch((err) => {
        console.log(err)
        alert("Failed to login")
    })

})
