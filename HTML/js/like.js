var like  = document.getElementById("like")
like.addEventListener('click', function(e) {
    e.preventDefault()

    var currentUserId = JSON.parse(localStorage.getItem("currentUser"))
    var otherUserId = document.getElementById("id").textContent;

    console.log(currentUserId)
    console.log(currentUserId[0].userId)

    console.log(otherUserId)

    fetch("http://localhost:7071/api/Like", {
        method: 'POST',
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
        console.log(data)
        console.log("Like created")
    })
    .catch((err) => {
        console.log(err)
    })
})

