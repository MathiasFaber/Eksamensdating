// The function starts when the HTML page is loaded. 
document.addEventListener('DOMContentLoaded', function(){
    function myCallback(data) {
        var userContainer = document.getElementById('user');

        for(var i=0; i < data.length; i++){                
            // created a html element 'div'
            var users = document.createElement('div');

            // the div is given a class
            users.className = "match";
            
            // the div is populated with a classname, an ID matching the user displayed and an onclick function.
            users.innerHTML += '<div class="matchName" id='+data[i].userId+' onclick="oneUser('+data[i].userId+')">'+data[i].userId+'        '+data[i].name+'</div>';
        
            // For each user a new 'users.innerhtml' is made. This is done by using the appenChild function. 
            // This means that for each user in the database, the appendChild function will create a new line with the name of the next user. 
            userContainer.appendChild(users);
        }
    }

    var admin = new Admin(null, null, 2);
    admin.getUserList(myCallback);
}); 


// This function is run, when the admin presses one of the users that is made in the function above this
// the function is run with 'input' which contains the ID of the user that has been pressed. (This is also shown in the inline HTML at line 25)
function oneUser (input) {
    function myCallback(data) {
        for(i=0; i < data.length; i++){
            if(data[i].userId == input){ /*.id?*/
                let founduser = data[i];
                sessionStorage.setItem('foundUser', JSON.stringify(founduser))
            }
        }
        window.location.href = ("adminUpdateUser.html")
    }

    var admin = new Admin(null, null, 2);
    admin.getUser(myCallback);
};
