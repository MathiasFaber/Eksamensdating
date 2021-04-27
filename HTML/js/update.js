//variabel for den bruger, som er logget ind 
var currentUser = JSON.parse(localStorage.getItem("currentUser"));
console.log(currentUser)

// henter information fra min User Klasse, som blev oprettet i sign.js - formålet er at man som bruger kan se sine brugeroplysninger
var id = JSON.parse(localStorage.getItem("currentUser"))[0].id;
console.log(id)
document.getElementById("name").value = currentUser[0].name;
document.getElementById("email").value = currentUser[0].email;
document.getElementById("birthdate").value = currentUser[0].birthdate;
document.getElementById("genderID").value = currentUser[0].genderID;
document.getElementById("toothbrushColorID").value = currentUser[0].toothbrushColorID;
document.getElementById("password").value = currentUser[0].password;



editUser = document.getElementById("editBtn1")

var updateBTN  = document.getElementById("updateBTN")
console.log(updateBTN)
updateBTN.addEventListener('click', function(e) {
    e.preventDefault()

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var birthdate = document.getElementById("birthdate").value;
    var genderID = document.getElementById("genderID").value;
    var toothbrushColorID = document.getElementById("toothbrushColorID").value;
    var password = document.getElementById("password").value;

      let updateData = {
        id: id,
        name: name,
        email: email,
        birthdate: birthdate,
        genderID: genderID,
        toothbrushColorID: toothbrushColorID,
        password: password
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
        window.location.href = ("myProfile.html")
    })
    .catch((err) => {
        console.log(err)
    })
})
