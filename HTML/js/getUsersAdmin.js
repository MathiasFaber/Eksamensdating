document.addEventListener('DOMContentLoaded', function(){
    fetch("http://localhost:7071/api/getUsersAdmin")
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };

        
        response.json().then(function (data) {
            let allUsers = JSON.stringify(data)
            console.log(data)

            var userContainer = document.getElementById('user');

            for(var i=0; i < data.length; i++){
                console.log(data[i])
                
                // Her laves omtalte div, for hver bruger
                var users = document.createElement('div');
            
                // Her bliver de forskellige properties fra klassen udvalgt og kan displayes på siden 
                users.className = "match";
                
                // displayer navne på oprettede brugere i matches.html 
                users.innerHTML += '<div class="matchName" id='+data[i].userId+' onclick="oneUser('+data[i].userId+')">'+data[i].name+'</div>';
            
                // For hver bruger laves et "child". Brugeren vises altså i forlængelse af forrige bruger.
                userContainer.appendChild(users);
            }
        });
    })

    .catch((err) => {
        console.log(err)
        alert("Failed to get users")
    });
}); 


function oneUser (input) {
    console.log(input)
    fetch("http://localhost:7071/api/getUsersAdmin")
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };
        response.json().then(function (data) {
            for(i=0; i < data.length; i++){
                if(data[i].userId == input){ /*.id?*/
                    let founduser = data[i];
                    console.log(founduser)
                    localStorage.setItem('foundUser', JSON.stringify(founduser))
                }
            }
        })
        window.location.href = ("adminUpdateUser.html")

    })
}



/*
var button = document.getElementById("id2")
button.addEventListener('click', function(){
    var userId = document.getElementById("id1").value
    console.log(userId)
    fetch("http://localhost:7071/api/getUsersAdmin", {
        method: 'POST',
        body: JSON.stringify({
            userId: userId
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };

        console.log(response)
        
        response.json().then(function (data) {
            console.log(data)
            document.getElementById("name").value = data[0].name;
            document.getElementById("email").value = data[0].email;
            document.getElementById("password").value = data[0].password;
            document.getElementById("birthdate").value = data[0].birthdate;
            document.getElementById("zipCode").value = data[0].zipCode;
            document.getElementById("description").value = data[0].description;
            document.getElementById("genderId").value = data[0].genderId;
            document.getElementById("toothbrushId").value = data[0].toothbrushId;
            document.getElementById("genderPreference").value = data[0].genderPreference;
            document.getElementById("agePreference").value = data[0].agePreference;
        
        });
    })

    .catch((err) => {
        console.log(err)
        alert("Failed to get users")
    });
}); 


*/