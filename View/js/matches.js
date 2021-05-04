// The logged in user (currentUser) is defined in a variable. 
currentUser = JSON.parse(localStorage.getItem("currentUser"))

// When the HTML page is loaded, the following function runs. 
document.addEventListener('DOMContentLoaded', function(){

    // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
    fetch("http://localhost:7071/api/Matches", {
        method: 'POST',
        // The current users ID is sent to the API
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
            var userContainer = document.getElementById('matches');
            // All matches that this user has is looped through, and the name of each user that is matched with is displayed. 
            for(i=0; i < data.length; i++){
                var users = document.createElement('div');
            
                // Each user gets a classname
                users.className = "match";
                
                // Each user gets a class, an ID and their name is displayed 
                users.innerHTML += '<div class="matchName" id='+data[i].name+'>' +data[i].name+'</div>';

                // as well as their name is displayed, a delete button is added for each user. 
                // the delete button has an onclick function, which is shown after this function. 
                users.innerHTML += '<button class="deleteMatch" onclick="deleteMatch('+data[i].userId+')" id='+data[i].userId+'>Delete Match</button> <br>';

                // AppendChild function is used to created a name and a button for each user
                userContainer.appendChild(users);
            }
        })
    })  

    .catch((err) => {
        console.log(err)
        alert("Failed to get users")
    });
}); 

// This function is called, when the user presses the 'delete match' button
// It sends a request, to delete the match from the database. 
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
        // the page is reloaded, in order to update the list of matches after deleting one. 
        location.reload()
    });
};