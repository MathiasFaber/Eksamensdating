// The attributes with an underscore, symbolizes that the attribute is private
// The group haven't implemented getters and setters, which is why the private attributes are only symbolized with the underscore instead of actually being private. 
class User {
    constructor(name, email, _password, birthdate, zipCode, description, _genderId, _toothbrushId, _genderPreference, _agePreference) {
        this.user = {
            name: name,
            email: email,
            password: _password,
            birthdate: birthdate,
            zipCode: zipCode,
            description: description,
            genderId: _genderId,
            toothbrushId: _toothbrushId,
            genderPreference: _genderPreference,
            agePreference: _agePreference
        }
    };



    // Creating new user
    createUser(callback) {
        fetch("http://localhost:7071/api/user", {
        method: 'POST', // POST request that sends all the user details to the API
        // The variables are stored as an object, and sent to the API. 
        body: JSON.stringify(this.user),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then((response) => {
        return response.json();
    })

    // When the data is send back from the request, the user is signed up and sent to the login.html page. 
    .then((data) => {
        console.log(data)
        callback(data);
    })
    .catch((err) => {
        console.log(err)
    })
    }

    //Sletter egen bruger
    deleteUser(userId, callback) {
        // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
        fetch("http://localhost:7071/api/DeleteUser", {
            method: 'DELETE', // Delete request is defined
            // The request contains the name of the user to be deleted. 
            body: JSON.stringify({
                userId: userId 
            }),
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        })
        // If the fetch went well, a callback function is called 
        .then((data) => {
            callback();
        })

        // Catching an error if the fetch did not go well
        .catch((err) => {
            console.log(err)
            alert("Failed to delete")
        });
    }

    //Opdaterer egen bruger
    updateUser(currentUser, callback) {
        // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
        fetch("http://localhost:7071/api/update", {
            method: 'PUT', // put request, that updates existing data in the database
            body: JSON.stringify(currentUser),
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        })  
        
        // If the fetch went well, a callback function is called 
        .then((data) => {
            console.log(data)
            console.log("USER UPDATED")
            callback();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    //Logger ind
    login(callback) {
        // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
        fetch("http://localhost:7071/api/login", {
            method: 'POST',
            body: JSON.stringify({
                // The email and password is send to the API, in order to check with the database, whether the login details are correct. 
                email: this.user.email,
                password: this.user.password
            }),
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        })
        .then((response) => {
            console.log(response)
            return response.json();
        })
        // If the data doesnt match any user, an error is alerted
        .then((data) => {
            if(data.length == 0){
                console.log("no user")
                alert("No user, try again")
            } else {
                callback(data); // If the fetch went well, a callback function is called 
            }
        })
        // If there is an error, an error message is alerted. 
        .catch((err) => {
            console.log(err)
            alert("Failed to login")
        })
    }

    //Liker en anden bruger
    like(currentUserId, otherUserId, callback) {
        // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
        fetch("http://localhost:7071/api/Like", {
            method: 'POST', // post request that sends the like to the like table in the database
            body: JSON.stringify({
                currentUserId: currentUserId, 
                otherUserId: otherUserId
            }),
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        })
        .then((response) => {
            return response.json();
        })
        // If the fetch went well, a callback function is called 
        .then((data) => {
            callback(data);
        })
        .catch((err) => {
            console.log(err)
        });
    }

    //Foreslå brugere
    possibleMatches(currentUser, callback) {
        // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
        fetch("http://localhost:7071/api/PossibleMatches", {
            method: 'POST', // post request that sends the like to the like table in the database
            body: JSON.stringify({
                user: currentUser
            }),
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        })

        .then((response) => {
            if (response.status !== 200) {
                console.log("noget gik galt" + response.status)
                return;
            };
            // If the fetch went well, a callback function is called 
            response.json().then(function (data) {          
                callback(data);
            });
        })

        .catch((err) => {
            console.log(err)
            alert("Failed to get users")
        });
    }

    //Giver liste over egne matches
    getMatchlist(currentUserId, callBack) {
        // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
        fetch("http://localhost:7071/api/Matches", {
            method: 'POST',
            // The current users ID is sent to the API
            body: JSON.stringify({
                currentUserId: currentUserId
            }),
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        })
        .then(function (response){
            if (response.status !== 200){
                console.log("noget gik galt" + response.status)
                return;
            }; 

            // If the fetch went well, a callback function is called 
            response.json().then(function (data) {
                callBack(data);
            })
        })  

        .catch((err) => {
            console.log(err)
            alert("Failed to get users")
        });
    }

    //Fjerner et givet like af anden bruger
    deleteMatch(currentUserId, otherUserId, callBack) {
        fetch("http://localhost:7071/api/deleteMatch", {
            method: 'DELETE',
            body: JSON.stringify({
                currentUserId: currentUserId,
                otherUserId: otherUserId
            }),
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        })
        .then(function (response){
            if (response.status !== 200){
                console.log("noget gik galt" + response.status)
                return;
            };
            // If the fetch went well, a callback function is called 
            callBack();
        });
    }
};


class Admin extends User {
    constructor(email, password, roleId){
        super(null, email, password, null, null, null, null, null, null, null)
        this.roleId = roleId;
    }

    adminLogin(callback) {
        // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
        fetch("http://localhost:7071/api/loginAdmin", {
            method: 'POST', // post request
            // The admins email and password is sent along with the request, for the db function to verify the login. 
            body: JSON.stringify({
                email: this.user.email,
                password: this.user.password
            }),
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        })
        // The response object is stringified in order to put it into localstorage in the next .then statement.
        .then((response) => {
            console.log(response)
            return response.json();
        })
        // If there is sent no data back, an error is console.logged
        .then((data) => {
            if(data.length == 0){
                console.log("No user")
            } else {
                callback(data); // If the fetch went well, a callback function is called 
            }
        })
        .catch((err) => {
            console.log(err)
            alert("User not authorized")
        })
    }

    getUserList(callback) {
        // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
        fetch("http://localhost:7071/api/getUsersAdmin")
        // Error handling
        .then(function (response){
            if (response.status !== 200){
                console.log("noget gik galt" + response.status)
                return;
            };

            // The get request responds with all the users in the database. 
            // The following code looops through all the users, and displays a name for each user in the database. 
            response.json().then(function (data) {
                callback(data);
            });
        })  

        .catch((err) => {
            console.log(err)
            alert("Failed to get users")
        });
    }

    getUser(callback) {
        // The fetch sends a request to the getUsersAdmin endpoint. It is a get request, as we request alle the users. 
        fetch("http://localhost:7071/api/getUsersAdmin")
        .then(function (response){
            if (response.status !== 200){
                console.log("noget gik galt" + response.status)
                return;
            };

            // If the fetch went well, a callback function is called 
            response.json().then(function (data) {
                callback(data);
            })

        })

        .catch((err) => {
            console.log(err)
            alert("Failed to get user")
        });
    }

    //Opdaterer en brugers profil
    updateUser(updateData, callback) {
        // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
        fetch("http://localhost:7071/api/update", {
            method: 'PUT', // PUT request, that updates infromation about a user. 
            body: JSON.stringify(updateData), // The body of the request contains the updated data object. 
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        })   
        // If the fetch went well, a callback function is called  
        .then((data) => {
            console.log(data)
            callback();
        })
        .catch((err) => {
            console.log(err)
        });
    }

    //Sletter en brugers profil
    deleteUser(userId, callback) {
        // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
        fetch("http://localhost:7071/api/DeleteUser", {
            method: 'DELETE', // Delete request 
            // The data that is send along with the request is an object, containing the name of the user to be deleted. 
            body: JSON.stringify({
                userId: userId
            }),
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        }) 
        // If the fetch went well, a callback function is called  
        .then((data) => {
            callback();
        })

        // Error handling. If we catch an error it is console.logged and alerted. 
        .catch((err) => {
            console.log(err)
            alert("Failed to delete")
        });
    }

    //Giver antallet af registrerede brugere
    getUserCount(callback) {
        // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
        fetch("http://localhost:7071/api/getUsersAdmin")
        .then(function (response){
            if (response.status !== 200){
                console.log("noget gik galt" + response.status)
                return;
            };
            // If the fetch went well, a callback function is called 
            response.json().then(function (data) {
                callback(data);
            });
        })
    
        .catch((err) => {
            console.log(err)
            alert("Failed to get users")
        });
    }

    //Giver antallet af accepterede matches
    getMatchCount(callback) {
        // This fetch listens to the localhost port 7071, and sends a request to the specified endpoint
        fetch("http://localhost:7071/api/totalMatches")
        .then(function (response){
            if (response.status !== 200){
                console.log("noget gik galt" + response.status)
                return;
            };
            // If the fetch went well, a callback function is called 
            response.json().then(function (data) { 
                callback(data);
            });
        })

        .catch((err) => {
            console.log(err)
            alert("Failed to get users")
        });
    }
}