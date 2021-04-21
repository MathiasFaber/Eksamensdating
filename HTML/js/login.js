
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
        return response.json();
    })
    .then((data) => {
        console.log(data)
        localStorage.setItem('currentUser', JSON.stringify(data));
        //sender brugeren videre til sin profil side
        window.location.href = ("myProfile.html")
    })
    .catch((err) => {
        console.log(err)
        alert("Failed to login")
    })


})

    /*
    fetch(`http://localhost:7071/api/user?name=${name}/user?password=${password}`
    
        .then(
            function(response){
                console.log(response)
                if (response.status !== 200){
                    console.log("noget gik galt hej" + response.status)
                    return;
                };

                response.json().then(function (data) {
                    name2 = data[1].value
                    password2 = data[6].value
                    console.log(name2, password2)
                });
            } 
        )
        .catch(function (err){
            console.log(err)
        })
});
*/
