// The "show amount of users" button is defined
var button1 = document.getElementById("usersBTN")

// When the button is clicked the following function is run
button1.addEventListener('click', function(){
    
    // If the requested fetch in the function admin.getUserCount went well, this callback function is called
    function myCallback(data) {
        // The amount of users are displayed in the HTML
        document.getElementById('totalUsers').innerHTML = data.length;
    }

    // When instantiating the class, there is no need for inserting values since only the methods of the class is interesting
    var admin = new Admin(null, null, 2);
    // Calling the getUserCount function in the Admin class with myCallback as input
    admin.getUserCount(myCallback);
}); 

// The "see all matches" button is defined
var button2 = document.getElementById("matchesBTN")

// When the button is clicked, the following function is called 
button2.addEventListener('click', function () {

    // If the requested fetch in the function admin.getMatchCount went well, this callback function is called
    function myCallback(data) {
        // As well as before, the amount of matches are dipslayed in the HTML.
        // Data.user.length is divided by 2, as all matches include: me matching with you AND you matching with me
        document.getElementById('totalMatches').innerHTML = data.user.length / 2;
    }

    // When instantiating the class, there is no need for inserting values since only the methods of the class is interesting
    var admin = new Admin(null, null, 2);
    // Calling the getMatchCount function in the Admin class with myCallback as input
    admin.getMatchCount(myCallback);
}); 