// Virker ikke, BAD REQUEST

var like  = document.getElementById("like")
like.addEventListener('click', function(e) {
    e.preventDefault()

    var currentUserId = JSON.parse(localStorage.getItem("currentUser"))
    var otherUserId = document.getElementById("id").textContent;

    console.log(currentUserId)
    console.log(currentUserId[0].userId)

    console.log(otherUserId)

    fetch("http://localhost:7071/api/notification", {
        method: 'POST',
        body: JSON.stringify({
            currentUserId: currentUserId[0].userId
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };

        
        response.json().then(function (data){
            console.log(data)
            // alert(data)
        })
    .catch((err) => {
        console.log(err)
    })
})
})

