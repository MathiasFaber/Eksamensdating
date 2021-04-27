document.addEventListener('DOMContentLoaded', function(){
    fetch("http://localhost:7071/api/PossibleMatches")
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };

        
        response.json().then(function (data) {
            let allUsers = JSON.stringify(data)
            console.log(allUsers)
            console.log(data)
            console.log(data.user)
            console.log(data[0])


            var userContainer = document.getElementById('user');

            for(var i=0; i < data.user.length; i++){
                console.log(data.user[3])
                
                // Her laves omtalte div, for hver bruger
                var users = document.createElement('div');
            
                // Her bliver de forskellige properties fra klassen udvalgt og kan displayes på siden 
                users.className = "match";
                
                // displayer navne på oprettede brugere i matches.html 
                users.innerHTML += '<div class="matchName" id='+data.user[i].id+' onclick="oneUser('+data.user[i].id+')">'+data.user[i].name+'</div>';
            
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
    fetch("http://localhost:7071/api/PossibleMatches")
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };
        response.json().then(function (data) {
            console.log(data)
            for(i=0; i < data.user.length; i++){
                if(data.user[i].id == input){ /*.id?*/
                    let founduser = data.user[i];
                    console.log(founduser)
                    localStorage.setItem('founduser', JSON.stringify(founduser))
                }
            }
        })
        window.location.href = ("possiblematch.html")

    })
}
