var loginButton = document.getElementById("login");

loginButton.addEventListener('click', function(){
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    function myCallBack(data) {
        // If the data sent back, is correct, the localstorage key 'currentUser' is updated and the admin is allowed access to the admin functions. 
        console.log("Yes very much user");
        localStorage.setItem('currentUser', JSON.stringify(data));
        window.location.href = ("adminControlpanel.html");
    }

    debugger;
    var admin = new Admin(email, password, 2);
    admin.adminLogin(myCallBack);
});
 