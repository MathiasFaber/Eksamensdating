//opretter en variabel for log ud knappen
var deleteBTN = document.getElementById("deleteBTN");

//Funktionen startes ved klik på log ud knappen 
deleteBTN.addEventListener("click", function() {
    const localStorageProps = JSON.parse(localStorage.getItem("foundUser"))
    if(localStorageProps.length<0){
        alert('localstorage is empty');
        return;
    }
    fetch("http://localhost:7071/api/DeleteUser", {
        method: 'DELETE',
        body: JSON.stringify({
            name: localStorageProps.name
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then((response) => {
        console.log(response)
        return response.json();
    })
    .then((response) => {
        console.log(JSON.stringify(response) + "====================fetch, delete.js")
    })
    .then((data) => {
        localStorage.removeItem('foundUser');

        alert("User has been deleted succesfully!:D")

        window.location.href = ("editUsers.html")
    })

    .catch((err) => {
        console.log(err)
        alert("Failed to delete")
    });
});