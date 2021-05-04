// This variable stores the currrentUser in a variable. 
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

// The following code fills out the update form, with the current users details. 
var userId = JSON.parse(localStorage.getItem("currentUser"))[0].userId;
document.getElementById("name").value = currentUser[0].name;
document.getElementById("email").value = currentUser[0].email;
document.getElementById("password").value = currentUser[0].password;
document.getElementById("birthdate").value = currentUser[0].birthdate;
document.getElementById("zipCode").value = currentUser[0].zipCode;
document.getElementById("description").value = currentUser[0].description;
document.getElementById("genderId").value = currentUser[0].genderId;
document.getElementById("toothbrushId").value = currentUser[0].toothbrushId;
document.getElementById("genderPreference").value = currentUser[0].genderPreference;
document.getElementById("agePreference").value = currentUser[0].agePreference;

// The update button is stored in a variable
var updateBTN  = document.getElementById("updateBTN")

// When the user presses the update button, the following function runs. 
updateBTN.addEventListener('click', function(e) {
    e.preventDefault()

    // the values from the input fields are stored in the new variables. 
    // The difference from before is that these are the new and updated values. 
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

    // an empty array is made to contain the updateData object
    let updateData1 = []

    // an object is made, containing all the updated user details
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

      // The object is pushed to the array
      updateData1.push(updateData)
    
      // localstorage is set, with the array. 
      localStorage.setItem('currentUser', JSON.stringify(updateData1));

      // an alert is made, to tell the user that the update has been made 
      alert("User has been updated succesfully!:D")

      // the user is send back to his/her profile
      window.location.href = ("myProfile.html")


    // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
    fetch("http://localhost:7071/api/update", {
        method: 'PUT', // put request, that updates existing data in the database
        body: JSON.stringify(updateData),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })  
      
    .then((data) => {
        console.log(data)
        console.log("USER UPDATED!:D")
    })
    .catch((err) => {
        console.log(err)
    })
})
