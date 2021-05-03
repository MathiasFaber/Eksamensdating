//opretter en variabel for log ud knappen
var deleteBTN = document.getElementById("delete");

//Funktionen startes ved klik på log ud knappen 
deleteBTN.addEventListener("click", function() {
    const localStorageProps = JSON.parse(localStorage.getItem("currentUser"))
    if(localStorageProps.length<0){
        alert('localstorage is empty');
        return;
    }
    fetch("http://localhost:7071/api/DeleteUser", {
        method: 'DELETE',
        body: JSON.stringify({
            name: localStorageProps[0].name
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
        console.log(JSON.stringify(response))
    })
    .then((data) => {
        localStorage.removeItem('currentUser');

        window.location.href = ("login.html")
    })

    .catch((err) => {
        console.log(err)
        alert("Failed to delete")
    });
});