var currentUser = JSON.parse(localStorage.getItem('currentUser'))
console.log(currentUser[0].name)

document.addEventListener('DOMContentLoaded', function(){
    fetch("http://localhost:7071/api/PossibleMatches")
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };

        
        response.json().then(function (data) {
            let allUsers = JSON.stringify(data)

            console.log(data.user)
            var userContainer = document.getElementById('user');
            var suggestedUsersArray = []
                for(var j=0; j < data.user.length; j++){   
                    if(currentUser[0].userId == data.user[j].userId){
                        continue;
                    }

                    if(currentUser[0].toothbrushId == data.user[j].toothbrushId){
                        console.log(data.user[j].name, currentUser[0].name)
                        suggestedUsersArray.push(data.user[j])
                        console.log(suggestedUsersArray)
                    }
                }

                var correctGender = []
                for(var i=0; i < suggestedUsersArray.length; i++){
                    if(suggestedUsersArray[i].genderId == currentUser[0].genderPreference && currentUser[0].genderId == suggestedUsersArray[i].genderPreference){
                        console.log("correct gender")
                        correctGender.push(suggestedUsersArray[i])

                    }
                }
                console.log(correctGender)


                function calculateAge(user){
                //konverterer fra SQL dataformat til js dataformat med Date()
                    var birthdate = new Date(correctGender[b].birthdate)
                    // console.log(birthdate)
                    var ageDifMs = Date.now() - birthdate.getTime();
                    var ageDate = new Date(ageDifMs); // miliseconds from epoch
                    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
                    // console.log(age)
                    if(age >= 18 && age <= 25){
                        return 1;
                    } else if (age >= 26 && age <= 35){
                        return 2;
                    } else if (age >= 36 && age <= 50){
                        return 3;
                    } else if (age >= 51){
                        return 4;
                    }
                }

                function displayGender (){
                    if(genderId == 1){
                        document.getElementById('genderId').innerHTML = "Male";
                    } else if (genderId = 2){
                        document.getElementById('genderId').innerHTML = "Female"
                    }
                }

                function displayToothbrush(){
                    if(toothbrushId == 1){
                        document.getElementById('toothbrushId').innerHTML = "Red";
                    } else if (toothbrushId = 2){
                        document.getElementById('toothbrushId').innerHTML = "Blue"
                    } else if (toothbrushId = 3){
                        document.getElementById('toothbrushId').innerHTML = "Green"
                    } else if (toothbrushId = 4){
                        document.getElementById('toothbrushId').innerHTML = "Pink"
                    } else if (toothbrushId = 5){
                        document.getElementById('toothbrushId').innerHTML = "Bamboo"
                    } else if (toothbrushId = 6){
                        document.getElementById('toothbrushId').innerHTML = "Purple"
                    } else if (toothbrushId = 7){
                        document.getElementById('toothbrushId').innerHTML = "Turquoise"
                    } else if (toothbrushId = 8){
                        document.getElementById('toothbrushId').innerHTML = "Black"
                    } else if (toothbrushId = 9){
                        document.getElementById('toothbrushId').innerHTML = "White"
                    } else if (toothbrushId = 10){
                        document.getElementById('toothbrushId').innerHTML = "Electric"
                    } 

                }


                var allCorrect = []

                for(var b=0; b < correctGender.length; b++){
                    var age1 = calculateAge(correctGender[b])
                    var age2 = calculateAge(currentUser[0])
                    console.log(age1)
                    console.log(age2)
                    console.log(age2)
                    console.log(currentUser[0])
                    console.log(currentUser)

                    if(age1 == currentUser[0].agePreference && age2 == correctGender[b].agePreference){
                        console.log("Correct age")
                        console.log(correctGender[b])
                        console.log(currentUser.agePreference)
                        allCorrect.push(correctGender[b])
                    } 
                }
                console.log(allCorrect)

                // Logik der viser 1 bruger ad gangen. 
                //let index = parseInt(Math.random()*allCorrect.length); //Math.random() ganget med antallet af index i bruger-array. parseInt() gør decimal-tallet til et helt tal.
            
                var i = 0;  // the index of the current item to show

                document.getElementById('id').innerHTML = allCorrect[i].userId;    // get the item and increment i to move to the next
                document.getElementById('user').innerHTML = allCorrect[i].name;    // get the item and increment i to move to the next
                document.getElementById('description').innerHTML = allCorrect[i].description;
                document.getElementById('zipCode').innerHTML = allCorrect[i].zipCode;
                document.getElementById('genderId').innerHTML = allCorrect[i].genderId;
                document.getElementById('toothbrushId').innerHTML = allCorrect[i].toothbrushId;

                displayGender()
                displayToothbrush()

                document.getElementById("like").addEventListener('click', function(){
                    console.log(allCorrect.length)
                    if(i == allCorrect.length - 1){
                        console.log(allCorrect.length)
                        alert("ikk flere brugere")
                    } else {
                        i++
                        console.log(i)
                        document.getElementById('id').innerHTML = allCorrect[i].userId;    // get the item and increment i to move to the next
                        document.getElementById('user').innerHTML = allCorrect[i].name;    // get the item and increment i to move to the next
                        document.getElementById('description').innerHTML = allCorrect[i].description;
                        document.getElementById('zipCode').innerHTML = allCorrect[i].zipCode;
                        document.getElementById('genderId').innerHTML = allCorrect[i].genderId;
                        document.getElementById('toothbrushId').innerHTML = allCorrect[i].toothbrushId;
                        displayGender()
                        displayToothbrush()
                    }
                });
                document.getElementById("dislike").addEventListener('click', function(){
                    console.log(allCorrect.length)
                    if(i == allCorrect.length - 1){
                        console.log(allCorrect.length)
                        alert("ikk flere brugere")
                    } else {
                        i++
                        console.log(i)
                        document.getElementById('id').innerHTML = allCorrect[i].userId;    // get the item and increment i to move to the next
                        document.getElementById('user').innerHTML = allCorrect[i].name;    // get the item and increment i to move to the next
                        document.getElementById('description').innerHTML = allCorrect[i].description;
                        document.getElementById('zipCode').innerHTML = allCorrect[i].zipCode;
                        document.getElementById('genderId').innerHTML = allCorrect[i].genderId;
                        document.getElementById('toothbrushId').innerHTML = allCorrect[i].toothbrushId;
                        displayGender()
                        displayToothbrush()
                    }
                });
        
        });
    })

    .catch((err) => {
        console.log(err)
        alert("Failed to get users")
    });
}); 

/*
function oneUser (input) {
    console.log(input)
    fetch("http://localhost:7071/api/PossibleMatches")
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };
        response.json().then(function (data) {
            console.log(data)
            for(i=0; i < data.user.length; i++){
                if(data.user[i].id == input){ .id?
                    let founduser = data.user[i];
                    console.log(founduser)
                    localStorage.setItem('founduser', JSON.stringify(founduser))
                }
            }
        })
        window.location.href = ("possiblematch.html")
    })
}

*/