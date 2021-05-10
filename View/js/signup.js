// the submit form is defined
var form  = document.getElementById("signup")

// when the user submits his or hers information, the following fucntion runs
form.addEventListener('submit', function(e) {
    e.preventDefault()

    // The details are stored in the following variables
    var name = document.getElementById("name").value; 
    var email = document.getElementById("email").value; 
    var password = document.getElementById("password").value; 
    var birthdate = document.getElementById("birthdate").value; 
    var zipCode = document.getElementById("zipcode").value
    var genderId = document.getElementById("gender").value; 
    var toothbrushId = document.getElementById("toothbrushColor").value; 
    var description = document.getElementById("description").value;
    var genderPreference = document.getElementById("genderPreference").value; 
    var agePreference = document.getElementById("agePreference").value; 

    var newUser = new User(name, email, password, birthdate, zipCode, description, genderId, toothbrushId, genderPreference, agePreference)

    newUser.createUser();
});

