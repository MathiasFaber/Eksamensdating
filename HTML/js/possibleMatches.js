document.addEventListener('DOMContentLoaded', function(){
    fetch("http://localhost:7071/api/PossibleMatches")
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };

        response.json().then(function (data) {
            console.log(data);
            name = data[1].value
            email = data[2].value
            gender = data[3].value
            country = data[4].value

            console.log(name + email)
            alert("Navn: " + name + " " + "Email: " + email + " " +  "Gender: " + gender + " " + "Country: " + country)
        });
        
    })
    .catch((err) => {
        console.log(err)
        alert("Failed to get users")
    })
});