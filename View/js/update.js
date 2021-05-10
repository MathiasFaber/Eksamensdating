const currentUserList = JSON.parse(localStorage.getItem("currentUser"));
// Error handling. Alerts an error if there is no user logged in
var currentUser = null;

if(currentUserList.length<0){
    alert('localstorage is empty');
} else {
    currentUser = currentUserList[0];

    // The following code fills out the update form, with the current users details. 
    document.getElementById("name").value = currentUser.name;
    document.getElementById("email").value = currentUser.email;
    document.getElementById("password").value = currentUser.password;
    document.getElementById("birthdate").value = currentUser.birthdate;
    document.getElementById("zipCode").value = currentUser.zipCode;
    document.getElementById("description").value = currentUser.description;
    document.getElementById("genderId").value = currentUser.genderId;
    document.getElementById("toothbrushId").value = currentUser.toothbrushId;
    document.getElementById("genderPreference").value = currentUser.genderPreference;
    document.getElementById("agePreference").value = currentUser.agePreference;
}

// The update button is stored in a variable
var updateBTN  = document.getElementById("updateBTN")

// When the user presses the update button, the following function runs. 
updateBTN.addEventListener('click', function(e) {
    e.preventDefault()
    let updateUser = {
        userId: currentUser.userId,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        birthdate: document.getElementById("birthdate").value,
        zipCode: document.getElementById("zipCode").value,
        description: document.getElementById("description").value,
        genderId: document.getElementById("genderId").value,
        toothbrushId: document.getElementById("toothbrushId").value,
        genderPreference: document.getElementById("genderPreference").value,
        agePreference: document.getElementById("agePreference").value
    };   
    
    function myCallBack() { 
        // Update current user in local storage
        let updateDataList = [];
        updateDataList.push(updateUser);
        localStorage.setItem('currentUser', JSON.stringify(updateDataList));
        // an alert is made, to tell the user that the update has been made 
        alert("User has been updated succesfully")

        // the user is send back to his/her profile
        window.location.href = ("myProfile.html")
    }    

    var user = new User(currentUser.name, currentUser.email, currentUser.password, currentUser.birthdate, 
        currentUser.zipCode, currentUser.description, currentUser.genderId, currentUser.toothbrushId, currentUser.genderPreference, currentUser.agePreference);

    user.updateUser(updateUser, myCallBack);
});
