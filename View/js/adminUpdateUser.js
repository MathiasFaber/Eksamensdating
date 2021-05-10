// This variable saves the user, that the admin has pressed and wants to edit or delete. 
var foundUser = JSON.parse(sessionStorage.getItem("foundUser"));

// The following lines fills out the input fields with the 'foundUsers' details. 
var userId = JSON.parse(sessionStorage.getItem("foundUser")).userId;
document.getElementById("name").value = foundUser.name;
document.getElementById("email").value = foundUser.email;
document.getElementById("password").value = foundUser.password;
document.getElementById("birthdate").value = foundUser.birthdate;
document.getElementById("zipCode").value = foundUser.zipCode;
document.getElementById("description").value = foundUser.description;
document.getElementById("genderId").value = foundUser.genderId;
document.getElementById("toothbrushId").value = foundUser.toothbrushId;
document.getElementById("genderPreference").value = foundUser.genderPreference;
document.getElementById("agePreference").value = foundUser.agePreference;

// The edit button is defined
var updateBTN  = document.getElementById("updateBTN")

// when the edit button is clicked, the following function is run
updateBTN.addEventListener('click', function(e) {
    e.preventDefault()

    // All the new values/updated values are saved in these variables
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var birthdate = document.getElementById("birthdate").value
    var zipCode = document.getElementById("zipCode").value
    var description = document.getElementById("description").value
    var genderId = document.getElementById("genderId").value
    var toothbrushId = document.getElementById("toothbrushId").value
    var genderPreference = document.getElementById("genderPreference").value
    var agePreference = document.getElementById("agePreference").value 

    // The data is stored in an object
    let updateData = {
        userId: userId,
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
    }    

    // The user is updated, the localstorage is changed, an alert pops up and the admin is sent back to the adminUpdateUser page. 
    sessionStorage.setItem('foundUser', JSON.stringify(updateData));
    alert("User updated")
    window.location.href = ("adminUpdateUser.html")

    // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
    fetch("http://localhost:7071/api/update", {
        method: 'PUT', // PUT request, that updates infromation about a user. 
        body: JSON.stringify(updateData), // The body of the request contains the updated data object. 
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })    
    .then((data) => {
        console.log(data)
    })
    .catch((err) => {
        console.log(err)
    })
})
 