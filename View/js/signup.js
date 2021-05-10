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

    // If the requested fetch in the function admin.deleteUser went well, this callback function is called
    function myCallback() {
        alert("User signed up successfully")
        window.location.href = ("login.html")
    }

    // Instantiating the class with a new user based on the inserted values
    var newUser = new User(name, email, password, birthdate, zipCode, description, genderId, toothbrushId, genderPreference, agePreference);
    // Calling the function createUser in the User class with inputs already in the class
    newUser.createUser(myCallback);
});

