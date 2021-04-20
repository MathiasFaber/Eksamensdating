
var loginButton = document.getElementById("login");

loginButton.addEventListener('click', function(){
    var name = document.getElementById("name").value
    //var password = document.getElementById("password").value

    fetch(`http://localhost:7071/api/user?name=${name}`)
    //method post??
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
