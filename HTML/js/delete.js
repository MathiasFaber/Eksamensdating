//opretter en variabel for log ud knappen
var deleteBTN = document.getElementById("delete");


//Funktionen startes ved klik på log ud knappen 
deleteBTN.addEventListener("click", function() {
    var name = JSON.stringify("b") //JSON.parse(localStorage.getItem("currentUser")) navn skal hentes fra localstorage
    var password = JSON.stringify("b")
    fetch("http://localhost:7071/api/DeleteUser", {
        method: 'POST',
        body: JSON.stringify({
            name: name, //id
            password: password
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        console.log(response + "fetch, delete.js")
    })

    .catch((err) => {
        console.log(err)
        alert("Failed to delete")
    })

    //localStorage.removeItem('currentUser'); 
})