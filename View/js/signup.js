// the submit form is defined
var form  = document.getElementById("signup")

// when the user submits his or hers information, the following fucntion runs
form.addEventListener('submit', function(e) {
    e.preventDefault()

    // The details are stored in the following variables
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

    // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
    fetch("http://localhost:7071/api/user", {
        method: 'POST', // POST request that sends all the user details to the API
        // The variables are stored as an object, and sent to the API. 
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

    // When the data is send back from the request, the user is signed up and sent to the login.html page. 
    .then((data) => {
        console.log(data)
        console.log("user signed up successfully!:D")
        window.location.href = ("login.html")
    })
    .catch((err) => {
        console.log(err)
    })
})

