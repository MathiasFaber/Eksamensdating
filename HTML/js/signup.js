var form  = document.getElementById("signup")
form.addEventListener('submit', function(e) {
    e.preventDefault()

    var name = document.getElementById("name").value; 
    var email = document.getElementById("email").value; 
    var birthdate = document.getElementById("birthdate").value; 
    var genderID = document.getElementById("genderID").value; 
    var toothbrushColorID = document.getElementById("toothbrushColorID").value; 
    var password = document.getElementById("password").value; 


    fetch("http://localhost:7071/api/user", {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            birthdate: birthdate,
            genderID: genderID,
            toothbrushColorID: toothbrushColorID,
            password: password
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
        console.log("user signed up successfully!:D")
        window.location.href = ("login.html")
    })
    .catch((err) => {
        console.log(err)
    })
})

