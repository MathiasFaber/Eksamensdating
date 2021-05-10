// The delete button is defined
var deleteBTN = document.getElementById("delete");

// The function is started, when the button is clicked
deleteBTN.addEventListener("click", function() {
    const currentUserList = JSON.parse(localStorage.getItem("currentUser"));
    // Error handling. Alerts an error if there is no user logged in
    if(currentUserList.length<0){
        alert('localstorage is empty');
        return;
    }
    const currentUser = currentUserList[0];

    var user = new User(currentUser.name, currentUser.email, currentUser.password, currentUser.birthdate, 
        currentUser.zipCode, currentUser.description, currentUser.genderId, currentUser.toothbrushId, currentUser.genderPreference, currentUser.agePreference);
    
    function myCallBack() {
        localStorage.removeItem('currentUser');
        window.location.href = ("login.html")
    }
    user.deleteUser(currentUser.userId, myCallBack);
});  