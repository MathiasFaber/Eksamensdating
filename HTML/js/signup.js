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
    var genderPreference = document.getElementById("genderPreference").value; 
    var agePreference = document.getElementById("agePreference").value; 


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
            genderPreference: genderPreference,
            agePreference: agePreference
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

