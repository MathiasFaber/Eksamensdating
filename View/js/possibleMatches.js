// Currentuser from localstorage is stored in a variable
var currentUser = JSON.parse(localStorage.getItem('currentUser'))

// The following function is started when the HTML page is loaded. 
document.addEventListener('DOMContentLoaded', function(){

    // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
    fetch("http://localhost:7071/api/PossibleMatches")
    .then(function (response){
        if (response.status !== 200){
            console.log("noget gik galt" + response.status)
            return;
        };

         
        response.json().then(function (data) {
            // Creates an empty array to store the users
            var suggestedUsersArray = []
            // Loop that loops through all users
                for(var j=0; j < data.user.length; j++){   
                    // If the user in the data is equal to the current user, it continues. 
                    // This is done, so that the user does not see himself/herself as a possible match
                    if(currentUser[0].userId == data.user[j].userId){
                        continue;
                    }

                    // if the current user and the users that are looped through has the same color of toothbrush, the user is pushed to the array. 
                    // This is the first matching criteria in the system, a unique way of matching people by their toothbrush. 
                    if(currentUser[0].toothbrushId == data.user[j].toothbrushId){
                        suggestedUsersArray.push(data.user[j])
                    }
                }

                // A new array is made to store the users, that match the currentuser genderPreference
                var correctGender = []
                for(var i=0; i < suggestedUsersArray.length; i++){
                    // The array from before is looped through. The if statement here, finds all the user that matches the genderpreference of the current user
                    // as well as they need to have a genderpreference that matches the currentusers gender. 
                    if(suggestedUsersArray[i].genderId == currentUser[0].genderPreference && currentUser[0].genderId == suggestedUsersArray[i].genderPreference){
                        // These users are pushed into the correctGender arary. 
                        correctGender.push(suggestedUsersArray[i])

                    }
                }

                // this function calculates a users age, from their birthdate. 
                function calculateAge(user){
                // Converts the data from SQL format to JS format with the Date() function
                    var birthdate = new Date(correctGender[b].birthdate)
                    var ageDifMs = Date.now() - birthdate.getTime();
                    var ageDate = new Date(ageDifMs); // miliseconds from epoch
                    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
                    // As the genderpreferences are divided into 4 categories, the function returns an ID between 1-4, which indicates which interval of age the user belongs to. 
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

                // This function returns whether the user is a male or female, based on the genderId
                function displayGender (){
                    if(genderId == 1){
                        document.getElementById('genderId').innerHTML = "Male";
                    } else if (genderId = 2){
                        document.getElementById('genderId').innerHTML = "Female"
                    }
                }

                // This function returns which color of toothbrush the user has, based on the toothbrushId
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

                // an empty array is made. This array is made to contain all the users that match all the matching criteria of the currentUser
                var allCorrect = []

                // The correctGender array is looped through
                for(var b=0; b < correctGender.length; b++){
                    // By using the calculateAge function, the currentUser and the other users age are defined. 
                    var age1 = calculateAge(correctGender[b])
                    var age2 = calculateAge(currentUser[0])

                    // If the currentusers age matches the other users agePreference and vice versa, the other user is pushed into the allCorrect array. 
                    if(age1 == currentUser[0].agePreference && age2 == correctGender[b].agePreference){
                        allCorrect.push(correctGender[b])
                    } 
                }
            

                var i = 0;  // the index of the current item to show

                // The first user of the allCorrect array is displayed on the possibleMatches page
                document.getElementById('id').innerHTML = allCorrect[i].userId;
                document.getElementById('user').innerHTML = allCorrect[i].name;
                document.getElementById('description').innerHTML = allCorrect[i].description;
                document.getElementById('zipCode').innerHTML = allCorrect[i].zipCode;
                document.getElementById('genderId').innerHTML = allCorrect[i].genderId;
                document.getElementById('toothbrushId').innerHTML = allCorrect[i].toothbrushId;

                // The gender and toothbrush function is called, to display the gender and toothbrush color
                displayGender()
                displayToothbrush()

                // When the user presses the like button, the next user from the array is displayed (i++)
                // If there are no more users, this is alerted. 
                document.getElementById("like").addEventListener('click', function(){
                    if(i == allCorrect.length - 1){
                        alert("ikk flere brugere")
                    } else {
                        i++
                        document.getElementById('id').innerHTML = allCorrect[i].userId;    
                        document.getElementById('user').innerHTML = allCorrect[i].name;    
                        document.getElementById('description').innerHTML = allCorrect[i].description;
                        document.getElementById('zipCode').innerHTML = allCorrect[i].zipCode;
                        document.getElementById('genderId').innerHTML = allCorrect[i].genderId;
                        document.getElementById('toothbrushId').innerHTML = allCorrect[i].toothbrushId;
                        displayGender()
                        displayToothbrush()
                    }
                });
                // the same function runs, if the user presses dislike. 
                document.getElementById("dislike").addEventListener('click', function(){
                    if(i == allCorrect.length - 1){
                        alert("ikk flere brugere")
                    } else {
                        i++
                        document.getElementById('id').innerHTML = allCorrect[i].userId;
                        document.getElementById('user').innerHTML = allCorrect[i].name;
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