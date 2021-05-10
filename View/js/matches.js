// The logged in user (currentUser) is defined in a variable. 
var currentUser = null;

var user = null;

// When the HTML page is loaded, the following function runs. 
document.addEventListener('DOMContentLoaded', function(){
    const currentUserList = JSON.parse(localStorage.getItem("currentUser"));
    // Error handling. Alerts an error if there is no user logged in
    if(currentUserList.length<0){
        alert('localstorage is empty');
        return;
    }
    currentUser = currentUserList[0];

    function myCallBack(data) {
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
    }

    user = new User(currentUser.name, currentUser.email, currentUser.password, currentUser.birthdate, 
        currentUser.zipCode, currentUser.description, currentUser.genderId, currentUser.toothbrushId, currentUser.genderPreference, currentUser.agePreference);

    user.getMatchlist(currentUser.userId, myCallBack);
}); 

// This function is called, when the user presses the 'delete match' button
// It sends a request, to delete the match from the database. 
function deleteMatch(otherUserId) {

    function deleteMatchCallBack() {
        // the page is reloaded, in order to update the list of matches after deleting one. 
        location.reload()
    }

    user.deleteMatch(currentUser.userId, otherUserId, deleteMatchCallBack);
};