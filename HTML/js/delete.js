//opretter en variabel for log ud knappen
var deleteBTN = document.getElementById("delete");


//Funktionen startes ved klik på log ud knappen 
deleteBTN.addEventListener("click", function() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"))
    console.log(currentUser)
    fetch("http://localhost:7071/api/DeleteUser", {
        method: 'DELETE',
        body: JSON.stringify({
            name: currentUser.name //id
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then((response) => {
        console.log(response)
    })

    .catch((err) => {
        console.log(err)
        alert("Failed to delete")
    })

    //localStorage.removeItem('currentUser'); 
})