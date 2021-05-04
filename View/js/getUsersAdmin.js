// The function starts when the HTML page is loaded. 
document.addEventListener('DOMContentLoaded', function(){
    // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
    fetch("http://localhost:7071/api/getUsersAdmin")
    // Error handling
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };

        // The get request responds with all the users in the database. 
        // The following code looops through all the users, and displays a name for each user in the database. 
        response.json().then(function (data) {
            var userContainer = document.getElementById('user');

            for(var i=0; i < data.length; i++){                
                // created a html element 'div'
                var users = document.createElement('div');

                // the div is given a class
                users.className = "match";
                
                // the div is populated with a classname, an ID matching the user displayed and an onclick function.
                users.innerHTML += '<div class="matchName" id='+data[i].userId+' onclick="oneUser('+data[i].userId+')">'+data[i].name+'</div>';
            
                // For each user a new 'users.innerhtml' is made. This is done by using the appenChild function. 
                // This means that for each user in the database, the appendChild function will create a new line with the name of the next user. 
                userContainer.appendChild(users);
            }
        });
    })  

    .catch((err) => {
        console.log(err)
        alert("Failed to get users")
    });
}); 


// This function is run, when the admin presses one of the users that is made in the function above this
// the function is run with 'input' which contains the ID of the user that has been pressed. (This is also shown in the inline HTML at line 25)
function oneUser (input) {
    // The fetch sends a request to the getUsersAdmin endpoint. It is a get request, as we request alle the users. 
    fetch("http://localhost:7071/api/getUsersAdmin")
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };

        // the repsonse contains all users, and we therefore need to loop through them and find the one matching the input ID. 
        // When the user is found, the localstorage 'foundUser' is set, and the admin is sent to the updateUser page. 
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

    });
};
