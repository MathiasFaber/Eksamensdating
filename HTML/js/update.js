//variabel for den bruger, som er logget ind 
var currentUser = JSON.parse(localStorage.getItem("currentUser"));
console.log(currentUser)

// henter information fra min User Klasse, som blev oprettet i sign.js - formålet er at man som bruger kan se sine brugeroplysninger
var userId = JSON.parse(localStorage.getItem("currentUser"))[0].userId;
console.log(userId)
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

editUser = document.getElementById("editBtn1")

var updateBTN  = document.getElementById("updateBTN")
console.log(updateBTN)
updateBTN.addEventListener('click', function(e) {
    e.preventDefault()

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

      console.log(updateData)
    
      localStorage.setItem('currentUser', JSON.stringify(updateData));

    fetch("http://localhost:7071/api/update", {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })    
    .then((data) => {
        console.log(data)
        console.log("USER UPDATED!:D")
        // window.location.href = ("myProfile.html")
    })
    .catch((err) => {
        console.log(err)
    })
})
