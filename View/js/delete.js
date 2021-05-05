// The delete button is defined
var deleteBTN = document.getElementById("delete");

// The function is started, when the button is clicked
deleteBTN.addEventListener("click", function() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    // Error handling. Alerts an error if there is no user logged in
    if(currentUser.length<0){
        alert('localstorage is empty');
        return;
    }
    // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
    fetch("http://localhost:7071/api/DeleteUser", {
        method: 'DELETE', // Delete request is defined
        // The request contains the name of the user to be deleted. 
        body: JSON.stringify({
            userId: currentUser[0].userId 
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    // When the user is deleteed in the databse, the user is removed from localstorage too, and the user is sent to the login page. 
    .then((data) => {
        localStorage.removeItem('currentUser');

        window.location.href = ("login.html")
    })

    .catch((err) => {
        console.log(err)
        alert("Failed to delete")
    });
});  