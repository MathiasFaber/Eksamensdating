// Currentuser from localstorage is stored in a variable
var currentUser = JSON.parse(localStorage.getItem('currentUser'));
// 
var nextUserIndex = 0;
console.log('0', nextUserIndex);
// Creates an empty array to store the users
var suggestedUsersArray = [];

// The first user of the allCorrect array is displayed on the possibleMatches page
function displayUser(user) {
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
    var currentUserId = currentUser;

    // If there are no more users, this is alerted. 
    document.getElementById("like").addEventListener('click', function(e) {
        e.preventDefault()

        // When liking a person, your ID and the other users ID is saved and sent to the database. 
        //var currentUserId = currentUser;
        var otherUserId = JSON.parse(document.getElementById("id").textContent);

        var newLike = new Match(currentUserId[0].userId, otherUserId)

        console.log(newLike)

        // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
        fetch("http://localhost:7071/api/Like", {
            method: 'POST', // post request that sends the like to the like table in the database
            body: JSON.stringify({
                currentUserId: currentUserId[0].userId, 
                otherUserId: otherUserId
            }),
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("Like created", data)
            // If the like is mutual, it returns that match == true. If so, an alert is created, to show the user that he/she has a match. 
            if (data.match == true) {
                alert('Jubiii, match!') 
            }
            displayNextUser();

        })
        .catch((err) => {
            console.log(err)
        });
    }); 

    // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
    fetch("http://localhost:7071/api/PossibleMatches", {
        method: 'POST', // post request that sends the like to the like table in the database
        body: JSON.stringify({
            user: currentUserId[0]
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then((response) => {
        if (response.status !== 200) {
            console.log("noget gik galt" + response.status)
            return;
        };

        response.json().then(function (data) {           
            // Loop that loops through all users
            for(var j=0; j < data.user.length; j++) {   
                suggestedUsersArray.push(data.user[j])
            }

            nextUserIndex = 0;
            if (suggestedUsersArray.length > 0) {
                displayUser(suggestedUsersArray[0]);
            }
        });
    })

    .catch((err) => {
        console.log(err)
        alert("Failed to get users")
    })
});

