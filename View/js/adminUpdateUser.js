//variabel for den bruger, som er logget ind 
var foundUser = JSON.parse(localStorage.getItem("foundUser"));

// henter information fra min User Klasse, som blev oprettet i sign.js - formålet er at man som bruger kan se sine brugeroplysninger
var userId = JSON.parse(localStorage.getItem("foundUser")).userId;
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

editUser = document.getElementById("editBtn1")

var updateBTN  = document.getElementById("updateBTN")
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

      localStorage.setItem('foundUser', JSON.stringify(updateData));
      alert("User updated!:D")
      window.location.href = ("adminUpdateUser.html")


    fetch("http://localhost:7071/api/update", {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })    
    .then((data) => {
        console.log(data, "---------------------")
    })
    .catch((err) => {
        console.log(err)
    })
})
