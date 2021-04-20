/*
class user {
    constructor(name){
        this.name = name;
    }
} 

new user = 

*/


var form  = document.getElementById("postform")
form.addEventListener('submit', function(e) {
    e.preventDefault()

    var name = document.getElementById("name").value; 
    var email = document.getElementById("email").value; 
    var birthdate = document.getElementById("birthdate").value; 
    var genderID = document.getElementById("genderID").value; 
    var toothbrushColorID = document.getElementById("toothbrushColorID").value; 

    fetch("http://localhost:7071/api/user", {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            birthdate: birthdate,
            genderID: genderID,
            toothbrushColorID: toothbrushColorID
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
    })
    .catch((err) => {
        console.log(err)
    })
})


var getButton = document.getElementById("getusers");

getButton.addEventListener('click', function(){
    var name1 = document.getElementById("name1").value;
    fetch(`http://localhost:7071/api/user?name=${name1}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("noget gik galt" + response.status)
                    return;
                };

                response.json().then(function (data) {
                    console.log(data);
                    name2 = data[1].value
                    email2 = data[2].value
                    gender2 = data[3].value
                    country2 = data[4].value

                    console.log(name2 + email2)
                    alert("Navn: " + name2 + " " + "Email: " + email2 + " " +  "Gender: " + gender2 + " " + "Country: " + country2)
                });
            } 
        )
        .catch(function (err){
            console.log(err)
        })
});