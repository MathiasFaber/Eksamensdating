var form  = document.getElementById("signup")
form.addEventListener('submit', function(e) {
    e.preventDefault()

    var name = document.getElementById("name").value; 
    var email = document.getElementById("email").value; 
    var birthdate = document.getElementById("birthdate").value; 
    var zipCode = document.getElementById("zipcode").value
    var genderId = document.getElementById("gender").value; 
    var toothbrushId = document.getElementById("toothbrushColor").value; 
    var description = document.getElementById("description").value;
    var password = document.getElementById("password").value; 
    var seekingGenderId = document.getElementById("seekingGender").value; 
    var seekingAgeId = document.getElementById("seekingAge").value; 

    console.log(name)
    console.log(email)
    console.log(birthdate)
    console.log(zipCode)
    console.log(gender)
    console.log(toothbrushId)
    console.log(description)
    console.log(password)
    console.log(seekingAge)
    console.log(seekingGender)

    fetch("http://localhost:7071/api/user", {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            birthdate: birthdate,
            zipCode: zipCode,
            description: description,
            genderId: genderId,
            toothbrushId: toothbrushId,
            seekingGenderId: seekingGenderId,
            seekingAgeId: seekingAgeId
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

