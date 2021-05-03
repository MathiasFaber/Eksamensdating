var button1 = document.getElementById("usersBTN")
button1.addEventListener('click', function(){
    fetch("http://localhost:7071/api/PossibleMatches")
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };
        
        response.json().then(function (data) {
            console.log(data)
            document.getElementById('totalUsers').innerHTML = data.user.length;
            console.log(data.user.length)


        });
    })

    .catch((err) => {
        console.log(err)
        alert("Failed to get users")
    });
}); 

var button2 = document.getElementById("matchesBTN")
button2.addEventListener('click', function (){
    fetch("http://localhost:7071/api/totalMatches")
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };
        
        response.json().then(function (data) {
            console.log(data)
            document.getElementById('totalMatches').innerHTML = data.user.length / 2;
            console.log(data.user.length)
        });
    })

    .catch((err) => {
        console.log(err)
        alert("Failed to get users")
    });
}); 