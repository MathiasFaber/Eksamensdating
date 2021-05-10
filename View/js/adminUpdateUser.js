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

    // If the requested fetch in the function admin.updateUser went well, this callback function is called
    function myCallback () {
        // The user is updated, the sessionstorage is changed 
        sessionStorage.setItem('foundUser', JSON.stringify(updateData));
        //An alert pops up informing the admin that the user was updated
        alert("User updated")
        // The admin is sent back to the adminUpdateUser page
        window.location.href = ("adminUpdateUser.html")
    }

    // When instantiating the class, there is no need for inserting values since only the methods of the class is interesting
    var admin = new Admin(null, null, 2);
    // Calling the updateUser function in the Admin class with updateData and myCallback as inputs
    admin.updateUser(updateData, myCallback);
})
 