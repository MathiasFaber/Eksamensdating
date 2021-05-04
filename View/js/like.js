// The like button is defined
var like  = document.getElementById("like")
// the function is run by clicking the like button
like.addEventListener('click', function(e) {
    e.preventDefault()

    // When liking a person, your ID and the other users ID is saved and sent to the database. 
    var currentUserId = JSON.parse(localStorage.getItem("currentUser"))
    var otherUserId = document.getElementById("id").textContent;

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
    })
    .catch((err) => {
        console.log(err)
    })
}); 