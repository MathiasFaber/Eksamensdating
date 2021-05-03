currentUser = JSON.parse(localStorage.getItem("currentUser"))

document.addEventListener('DOMContentLoaded', function(){
    fetch("http://localhost:7071/api/Matches", {
        method: 'POST',
        body: JSON.stringify({
            currentUserId: currentUser[0].userId
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


        
        response.json().then(function (data) {
            console.log(data)

            var userContainer = document.getElementById('matches');

            for(i=0; i < data.length; i++){
                var users = document.createElement('div');
            
                // Her bliver de forskellige properties fra klassen udvalgt og kan displayes på siden 
                users.className = "match";
                
                // displayer navne på oprettede brugere i matches.html 
                users.innerHTML += '<div class="matchName" id='+data[i].name+'>' +data[i].name+'</div>';

                users.innerHTML += '<button class="deleteMatch" onclick="deleteMatch('+data[i].userId+')" id='+data[i].userId+'>Delete Match</button> <br>';

            
                // For hver bruger laves et "child". Brugeren vises altså i forlængelse af forrige bruger.
                console.log(data[i])
                console.log(data[i].name)
                console.log(data[0].userId)

                userContainer.appendChild(users);
            }
        })
    })  

    .catch((err) => {
        console.log(err)
        alert("Failed to get users")
    });
}); 

function deleteMatch(id){
    fetch("http://localhost:7071/api/deleteMatch", {
        method: 'DELETE',
        body: JSON.stringify({
            currentUserId: currentUser[0].userId,
            otherUserId: id
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

        location.reload()

    })

}

