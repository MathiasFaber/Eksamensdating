document.addEventListener('DOMContentLoaded', function(){
    fetch("http://localhost:7071/api/PossibleMatches")
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };

        response.json().then(function (data) {
            console.log(JSON.stringify(data) + "nænæ");
        });
    })

    .catch((err) => {
        console.log(err)
        alert("Failed to get users")
    });
}); 