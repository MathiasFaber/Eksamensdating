// The delete button is defined
var deleteBTN = document.getElementById("delete");

// The function is started, when the button is clicked
deleteBTN.addEventListener("click", function() {
    // Getting currentUserList from localstorage
    const currentUserList = JSON.parse(localStorage.getItem("currentUser"));
    // Error handling - Alerts an error if there is no user logged in
    if(currentUserList.length<0){
        alert('localstorage is empty');
        return;
    }
    // Defining that the currentUser is the first one in the currentUserList
    const currentUser = currentUserList[0];
    
    // If the requested fetch in the function user.deleteUser went well, this callback function is called
    function myCallBack() {
        // The currentUser is deleted from localstorage
        localStorage.removeItem('currentUser');
        // The user will be taken back to the login page
        window.location.href = ("login.html")
    }

    // Instantiating the User with attributes from the currentUser
    var user = new User(currentUser.name, currentUser.email, currentUser.password, currentUser.birthdate, 
        currentUser.zipCode, currentUser.description, currentUser.genderId, currentUser.toothbrushId, currentUser.genderPreference, currentUser.agePreference
    );
    // Calling the deleteUser function in the User class with currentUser.userId and myCallBack as inputs
    user.deleteUser(currentUser.userId, myCallBack);
});  