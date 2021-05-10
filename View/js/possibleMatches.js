var nextUserIndex = 0;
console.log('0', nextUserIndex);
// Creates an empty array to store the users
var suggestedUsersArray = [];

// Functions that define what users to display
function displayUser(user) {
    // The first user of the allCorrect array is displayed on the possibleMatches page
    document.getElementById('id').innerHTML = user.userId;
    document.getElementById('user').innerHTML = user.name;
    document.getElementById('description').innerHTML = user.description;
    document.getElementById('zipCode').innerHTML = user.zipCode;
    document.getElementById('genderId').innerHTML = user.genderId;
    document.getElementById('toothbrushId').innerHTML = user.toothbrushId;

    // If statement that defines whether the gender is male or female from id
    document.getElementById('genderId').innerHTML = (user.genderId == 1)? "Male": "Female";

    // Since the colors have different id's in the database, they are now connected. The user will be displayed to the name of the colors
    switch (user.toothbrushId) {
        case 1:
            document.getElementById('toothbrushId').innerHTML = "Red";
            break;
        case 2:
            document.getElementById('toothbrushId').innerHTML = "Blue";
            break;
        case 3:
            document.getElementById('toothbrushId').innerHTML = "Green";
            break;
        case 4:
            document.getElementById('toothbrushId').innerHTML = "Pink";
            break;
        case 5:
            document.getElementById('toothbrushId').innerHTML = "Bamboo";
            break;
        case 6:
            document.getElementById('toothbrushId').innerHTML = "Purple";
            break;
        case 7:
            document.getElementById('toothbrushId').innerHTML = "Turquoise";
            break;
        case 8:
            document.getElementById('toothbrushId').innerHTML = "Black";
            break;
        case 9:
            document.getElementById('toothbrushId').innerHTML = "White";
            break;
        case 10:
            document.getElementById('toothbrushId').innerHTML = "Electric";
            break;
    } 
}

function displayNextUser() {
    nextUserIndex++
    if(nextUserIndex >= suggestedUsersArray.length){
        alert("There are no more users matching your criterias. You can change them at 'Update user' ")
    } else {
        displayUser(suggestedUsersArray[nextUserIndex])
    }
}

// The following function is started when the HTML page is loaded. 
document.addEventListener('DOMContentLoaded', function(){
    const currentUserList = JSON.parse(localStorage.getItem("currentUser"));
    // Error handling. Alerts an error if there is no user logged in
    if(currentUserList.length<0){
        alert('localstorage is empty');
        return;
    }
    var currentUser = currentUserList[0];

    // Instantiating the user so it is known which user is logged in
    var user = new User(currentUser.name, currentUser.email, currentUser.password, currentUser.birthdate, 
        currentUser.zipCode, currentUser.description, currentUser.genderId, currentUser.toothbrushId, currentUser.genderPreference, currentUser.agePreference);

    function possibleMatchesCallBack(data) {
        // Loop that loops through all users
        for(var j=0; j < data.user.length; j++) {   
            suggestedUsersArray.push(data.user[j])
        }

        nextUserIndex = 0;
        if (suggestedUsersArray.length > 0) {
            // If there are more than 0 users in the array of suggested users, the next user will be displayed
            displayUser(suggestedUsersArray[0]);
        }
    }
    // Calling the function in the User class with input and the callback function
    user.possibleMatches(currentUser, possibleMatchesCallBack);   
    

    // If there are no more users, this is alerted. 
    document.getElementById("like").addEventListener('click', function(e) {
        e.preventDefault()

        // When liking a person, your ID and the other users ID is saved and sent to the database. 
        var otherUserId = document.getElementById("id").textContent;

        function likeCallBack(data) {
            console.log("Like created", data)
            // If the like is mutual, it returns that match == true. If so, an alert is created, to show the user that he/she has a match. 
            if (data.match == true) {
                alert('Jubiii, match!') 
            }
            // When the like is created, the next possible user will be displayed
            displayNextUser();
        }

        // Calling the function in the User class with inputs and the callback function
        user.like(currentUser.userId, otherUserId, likeCallBack);

    }); 

    // Dislike button
    document.getElementById("dislike").addEventListener('click', function(e) {
        e.preventDefault()
        // No logic when a user is dislikes besides the next user will be displayed
        displayNextUser();
    });  
});