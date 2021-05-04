// The "show amount of users" button is defined
var button1 = document.getElementById("usersBTN")

// When the button is clicked the following function is run
button1.addEventListener('click', function(){
// This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
    fetch("http://localhost:7071/api/PossibleMatches")
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };
        
        response.json().then(function (data) {
            // The amount of users are displayed in the HTML
            document.getElementById('totalUsers').innerHTML = data.user.length;
        });
    })
 
    .catch((err) => {
        console.log(err)
        alert("Failed to get users")
    });
}); 

// The "see all matches" button is defined
var button2 = document.getElementById("matchesBTN")

// When the button is clicked, the following function is called 
button2.addEventListener('click', function (){
    // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
    fetch("http://localhost:7071/api/totalMatches")
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };
        
        response.json().then(function (data) {
            // As well as before, the amount of matches are dipslayed in the HTML.
            // Data.user.length is divided by 2, as all matches include: me matching with you AND you matching with me
            document.getElementById('totalMatches').innerHTML = data.user.length / 2;
        });
    })

    .catch((err) => {
        console.log(err)
        alert("Failed to get users")
    });
}); 