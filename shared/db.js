// All functions in this document are exported and used in the different azure functions.
// The functions are called, when a request is send to a specific endpoint from the frontend. 
// This is therefore a part of the backend, which connects the frontend to the database. 

// 'Tedious' is used to connect the Microsoft SQL database to the frontend.

// Defines that "Connection", "Request" and "TYPES" requires the package "tedious".
const {Connection, Request, TYPES} = require('tedious');

// The config file is required to gain access to the database. 
const config = require('./config.json')

// The connection to the database is established every time the variable "connection" appears
var connection = new Connection(config);

// This function ensures that there is a connection to the database, and that 'tedious' is working as wanted. 
// The function contains a promise, which resolves if theres a connection to the database, and rejects if not. 
function startdb(){
    return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
            if (err) {
                console.log('Connection failed:((')
                reject(err)
                throw err;
            } else {
                console.log('Connected!!:D')
                resolve();
            }
        });
        connection.connect();
    });
};

// The function is exported in order to call them from the azure functions. 
module.exports.sqlConnection = connection
// The function is exported in order to call them from the azure functions. 

module.exports.startdb = startdb;

// This function is called, when a signup in the datingapp is made. 
// The function is feeded with "payload" which is the data sent from the frontend. 
function insert(payload){
    return new Promise((resolve, reject) => {
        // The following SQl statement shows that the data should be inserted into the right columns in the database. (@name, @email etc. is the values that is send from the frontend)
        const sql = `INSERT INTO [Dating].[User] (name, email, password, birthdate, zipCode, description, genderId, toothbrushId, genderPreference, agePreference) VALUES (@name, @email, @password, @birthdate, @zipcode, @description, @genderId, @toothbrushId, @genderPreference, @agePreference)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            };
        });

        // The payload is turned into a parameter for each column in the database. 
        // This is done to put the rigth data into the rigth columns in the datatable in SQL. 
        request.addParameter('name', TYPES.VarChar, payload.name);
        request.addParameter('email', TYPES.VarChar, payload.email);
        request.addParameter('password', TYPES.VarChar, payload.password);
        request.addParameter('birthdate', TYPES.Date, payload.birthdate);
        request.addParameter('zipCode', TYPES.VarChar, payload.zipCode);
        request.addParameter('genderId', TYPES.Int, payload.genderId);
        request.addParameter('toothbrushId', TYPES.Int, payload.toothbrushId);
        request.addParameter('description', TYPES.VarChar, payload.description);
        request.addParameter('genderPreference', TYPES.Int, payload.genderPreference);
        request.addParameter('agePreference', TYPES.Int, payload.agePreference);

        // This statement executes the SQL query with the parameters from the payload. 
        connection.execSql(request)

        // When the request is completed, the promised is resolved and the user is now signed up and stored in the database.
        request.on('requestCompleted', (row) => {
            console.log('User inserted! juhu', row)
            resolve('User inserted', row)
        });
    });
}
// The function is exported in order to be called them from the 'signup' azure function. 
module.exports.insert = insert;


// This function validates the login information from the frontend with the database. 
function login (payload){
    return new Promise((resolve, reject) => {
        // The SQL statement selects the user that matches the information that is typed at the frontend.
        const sql = 'SELECT * FROM Dating.[User] WHERE email = @email AND password = @password'
        // Sending the password through like this is very unsafe, and it would be preferable to encrypt it. 
        const request = new Request(sql, (err, rowcount) => {
        if (err) {
            reject(err);
            console.log(err)
        } else if (rowcount == 0) {
            reject({message: "user does not exist"})
        }
    });

    // The parameters are made from the the data, that the user writes in the frontend to login. 
    request.addParameter('email', TYPES.VarChar, payload.email);
    request.addParameter('password', TYPES.VarChar, payload.password);

    // An empty array is made to contain the objects from the 'result' object.
    let results = [];
            request.on('row', function(columns)  {
                // the result object is made to contain all the information about a user, including keys and values for each column in the database
                let result = {};
                // For each column in the database, a object is made and stored in 'result'
                columns.forEach(column => {
                    result[column.metadata.colName] = column.value;
                });
                // Each user is pushed into the results array. (This should only be one user, as only one user matches the mail and password)
                results.push(result);
            });

            // 'doneProc' is used in order to let the forEach loop finish, before resolving the results.
            request.on('doneProc', (rowCount) => {
                resolve(results) 
            });
        // This statement executes the SQL query with the parameters from the payload.
        connection.execSql(request)
    });
};

// The function is exported in order to call them from the azure functions. 
module.exports.login = login;

//This function deletes a user from the database. 
function deleteProfile2 (payload){
    return new Promise((resolve, reject) => {
        // The SQL statement deletes the user from the database where the name matches the name of the user logged in. 
        const sql = 'DELETE FROM Dating.[User] WHERE userId = @userId'
    const request = new Request(sql, (err, rowcount) => {
        
        if (err) {
            return reject(err);
           
        // If the user doesnt exist in the database, the request is rejected. 
        // This will probably never happen, as you have to be logged in, to delete your profile. 
        } else if (rowcount == 0) {
            return reject({message: "user does not exist"})
        }else{
            return resolve({message: 'user deleted succesfully'})
        }
    });

    // The only parameter here is the name, which is sent from the frontend
    request.addParameter('userId', TYPES.Int, payload.userId);

    request.on('row', (columns) => {
        console.log(columns)
        resolve(columns)
    })

    // This statement executes the SQL query with the parameter from the payload.
    connection.execSql(request)
    });
};

// The function is exported in order to be called from the 'DeleteUser' azure functions. 
module.exports.deleteProfile2 = deleteProfile2;


// This function is called to show all users in the system 
function getUsers (){
    return new Promise((resolve, reject) => {
        // The SQL statement selects all users with the roleId 1. This is all the users excluding admins. 
        const sql = 'SELECT * FROM Dating.[User] WHERE roleId = 1'
        const request = new Request(sql, (err, rowcount) => {
            if (err) {
                reject(err);
            } else if (rowcount == 0) {
                reject({message: "user does not exist"})
            };
        });

        // This statement executes the SQL query with the parameter from the payload.
        connection.execSql(request)

        // An empty array is made to contain the objects from the 'result' object.
        let results = [];
            request.on('row', async function(columns)  {
            // the result object is made to contain all the information about a user, including keys and values for each column in the database
            let result = {};
            await columns.forEach(column => {
            result[column.metadata.colName] = column.value;
        });
        // The objects are pushed into the empty array, in order to store alle the objects (for each user) at each index in the array. 
        results.push(result);

      });
      // The request is resolved on 'doneProc', because the forEach loop needs to have looped through all users before resolving. 
      request.on('doneProc', (rowCount) => {
             resolve(results) 
        });
    });
};

// The function is exported in order to be called from the 'PossibleMatches' azure function. 
module.exports.getUsers = getUsers;


// This function updates information about a user. 
function update (payload){
    return new Promise((resolve, reject) => {
        // The SQL statement is made with an update query. In this way all the information about a user can be updated, be knowing their ID, which is sent from the frontend as well as the updated data. 
        const sql = 'UPDATE Dating.[User] SET name=@name, email=@email, password=@password, birthdate=@birthdate, zipCode=@zipCode, description=@description, genderId=@genderId, toothbrushId=@toothbrushId, genderPreference=@genderPreference, agePreference=@agePreference WHERE userId = @userId'
    const request = new Request(sql, (err, rowcount) => {
        if (err) {
            return reject(err);
        } else if (rowcount == 0) {
            return reject({message: "user does not exist"})
        }
    });

    // The parameters contains all the updated information about the user, while the ID will always remain the same. 
    // The ID is the unique key, which makes the SQL query find the rigth user. 
    request.addParameter('userId', TYPES.Int, payload.userId);
    request.addParameter('name', TYPES.VarChar, payload.name);
    request.addParameter('email', TYPES.VarChar, payload.email);
    request.addParameter('password', TYPES.VarChar, payload.password);
    request.addParameter('birthdate', TYPES.Date, payload.birthdate);
    request.addParameter('zipCode', TYPES.VarChar, payload.zipCode);
    request.addParameter('genderId', TYPES.Int, payload.genderId);
    request.addParameter('toothbrushId', TYPES.Int, payload.toothbrushId);
    request.addParameter('description', TYPES.VarChar, payload.description);
    request.addParameter('genderPreference', TYPES.Int, payload.genderPreference);
    request.addParameter('agePreference', TYPES.Int, payload.agePreference);

    request.on('row', (columns) => {
        console.log(columns)
        resolve(columns)
    })

    // This statement executes the SQL query with the parameters from the payload
    connection.execSql(request)
    });
};

// The function is exported in order to be called from the 'update' function. 
module.exports.update = update;


// This function is called, when a user likes another user in the frontend. 
// The frontend sends 2 ID's with the post request, including the ID of the user liking and the user liked. 
// Inside this function is another SQL statement which runs within the function. 
// The second SQL query checks whether the like is mutual, and resolves with 
function like(payload){
    return new Promise((resolve, reject) => {
        // The SQL statement inserts the like into the 'Like' table in the database. 
        const sql = `INSERT INTO [Dating].[Like] (currentUserId, otherUserId) VALUES (@currentUserId, @otherUserId)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            };
        });
        // The parameters contains 2 ID's, from the liking and the liked user. 
        request.addParameter('currentUserId', TYPES.Int, payload.currentUserId);
        request.addParameter('otherUserId', TYPES.Int, payload.otherUserId);

        request.on('requestCompleted', (row) => {
            console.log('Like inserted! juhu', row)

            // The following request checks whether there is a match or not. 
            const sqlNotification = `SELECT * FROM Dating.[Like] WHERE currentUserId = @currentUserId AND otherUserId = @otherUserId AND matchYN = 'Y'`
            const requestNotification = new Request(sqlNotification, (err) => {
                if (err) {
                    reject(err)
                    console.log(err)
                };
            });
            requestNotification.addParameter('currentUserId', TYPES.Int, payload.currentUserId);
            requestNotification.addParameter('otherUserId', TYPES.Int, payload.otherUserId);

            // If there is a match, match is set to {match: rowcount=1}, instead of 'false', and this is resolved 
            let match = false;
            requestNotification.on('doneInProc', (rowCount, more, rows) => {
                match = (rowCount == 1);
            });

            // When the 'requestNotification is done, the promise is resolved. 
            requestNotification.on('doneProc', () => {
                resolve({match: match}) 
           });
            // This statement executes the SQL query with the parameters from the payload, to check whether there is a match or not
            connection.execSql(requestNotification)
        });
        // This statement executes the SQL query with the parameters from the payload, to insert the like into the 'like' table. 
        connection.execSql(request)
    });
}

// The function is exported in order to be called from the 'Like' azure function. 
module.exports.like = like;

// This function selects all the matches for a certain user 
function matches (payload){
    return new Promise((resolve, reject) => {
        // This SQL statement joins the two tables 'user' and 'like', in order to get the information about a user, that the current logged in user has matched with. 
        // The WHERE statement in the query, indicates that matchYN has to be Y. 
        // The matchYN column is made with a SQL trigger that automatically changes the default N to a Y, if there is a match. 
        const sql = `SELECT userId, name, birthdate, zipCode, description, genderId, toothbrushId
        FROM Dating.[User] AS u
        LEFT OUTER JOIN Dating.[Like] AS l
        ON u.userId = l.otherUserId
        WHERE l.currentUserId = @currentUserId AND matchYN = 'Y'`
        const request = new Request(sql, (err, rowcount) => {
            if (err) {
                reject(err);
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: "user does not exist"})
            };
        });

        // Only the current logged in users ID is needed, as the query needs to find all this users matches. 
        request.addParameter('currentUserId', TYPES.Int, payload.currentUserId);

        // This statement executes the SQL query with the parameters from the payload
        connection.execSql(request)

        // An empty array is made to contain the objects from the 'result' object.
        let results = [];
            request.on('row', async function(columns)  {
            // the result object is made to contain all the information about a user, including keys and values for each column in the database
            let result = {};
            await columns.forEach(column => {
            result[column.metadata.colName] = column.value;
        });
        // The objects are pushed into the empty array, in order to store alle the objects (for each user) at each index in the array. 
        results.push(result);

      });
      // The promise is resolved, when the foreach loop is done. 
      request.on('doneProc', (rowCount) => {
             resolve(results) 
        });
    });
};

// The function is exported in order to call it from the 'Matches' azure functions. 
module.exports.matches = matches;


// This function deletes a like from the logged in user to another user, and in that way deletes a match. 
function deleteMatch123 (payload){
    return new Promise((resolve, reject) => {
        // The SQL statement deletes a row from the like table, where the id's match the current users id and the other users id. 
        const sql = 'DELETE FROM Dating.[Like] WHERE currentUserId = @currentUserId AND otherUserId = @otherUserId'
    const request = new Request(sql, (err, rowcount) => {
        
        if (err) {
            return reject(err);
           
        } else if (rowcount == 0) {
            return reject({message: "user does not exist"})
        }else{
            return resolve({message: 'user deleted succesfully'})
        }
    });

    // The parameters comes from the payload, which is the ID's on the two users, which like has to be deleted. 
    request.addParameter('currentUserId', TYPES.Int, payload.currentUserId);
    request.addParameter('otherUserId', TYPES.Int, payload.otherUserId);

    request.on('row', (columns) => {
        console.log(columns)
        resolve(columns)
    })

    // This statement executes the SQL query with the parameters from the payload
    connection.execSql(request)
    });
};

// The function is exported in order to be called from the 'DeleteMatch' azure function. 
module.exports.deleteMatch123 = deleteMatch123;


// This function is similar to the login function, but only allows admins to login. This is indicated by only allowing login, if the roleId = 2. 
function adminLogin (payload){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Dating.[User] WHERE email = @email AND password = @password'
    const request = new Request(sql, (err, rowcount) => {
        if (err) {
            reject(err);
            console.log(err)
        } else if (rowcount == 0) {
            reject({message: "user does not exist"})
        }
    });

    request.addParameter('email', TYPES.VarChar, payload.email);
    request.addParameter('password', TYPES.VarChar, payload.password);

    let results = [];
            request.on('row', async function(columns)  {
            let result = {};
            await columns.forEach(column => {
            result[column.metadata.colName] = column.value;
        });
        results.push(result);
        // The following if-statement allows only admins to login. 
        if(results[0].roleId === 2){
            request.on('doneProc', (rowCount) => {
                resolve(results) 
           });
        } else {
            reject({message: "user does not exist"})
        }
      });
    // This statement executes the SQL query with the parameters from the payload
    connection.execSql(request)
    });
};

// The function is exported in order to call it from the 'adminLogin' azure function. 
module.exports.adminLogin = adminLogin;


// This function gets all the matches from the 'Like' table in the database. 
function adminGetMatches (){
    return new Promise((resolve, reject) => {
        // The SQL statement selects all from the likes table, where there is a match. 
        const sql = `SELECT * FROM Dating.[Like] WHERE matchYN = 'Y'`
        const request = new Request(sql, (err, rowcount) => {
            if (err) {
                reject(err);
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: "user does not exist"})
            };
        });
        // This statement executes the SQL query with the parameters from the payload
        connection.execSql(request)

        // An empty array is made to contain the objects from the 'result' object.
        let results = [];
            request.on('row', async function(columns)  {
            // the result object is made to contain all the information about a user, including keys and values for each column in the database
            let result = {};
            await columns.forEach(column => {
            result[column.metadata.colName] = column.value;
        });
        // The objects are pushed into the empty array, in order to store alle the objects (for each user) at each index in the array. 
        results.push(result);

      });
      // The promise is resolved when the forEach loop is done. 
      request.on('doneProc', (rowCount) => {
             resolve(results) 
        });
    });
};

// The function is exported in order to be called from the 'totalMatches' azure function. 
module.exports.adminGetMatches = adminGetMatches;


// This function selects all the users from the database, excluding admins. 
function getUserById (){
    return new Promise((resolve, reject) => {
        // The SQL statement selects all from the users table, but only non-admins. 
        const sql = 'SELECT * FROM Dating.[User] WHERE roleId = 1'
    const request = new Request(sql, (err, rowcount) => {
        if (err) {
            reject(err);
            console.log(err)
        } else if (rowcount == 0) {
            reject({message: "user does not exist"})
        }
    });

    // An empty array is made to contain the objects from the 'result' object.
    let results = [];
    request.on('row', async function(columns)  {
    // the result object is made to contain all the information about a user, including keys and values for each column in the database
        let result = {};
        await columns.forEach(column => {
            result[column.metadata.colName] = column.value;
        });
        // The objects are pushed into the empty array, in order to store alle the objects (for each user) at each index in the array. 
        results.push(result);

      });
      request.on('doneProc', (rowCount) => {
             resolve(results) 
        });

    // This statement executes the SQL query with the parameters from the payload
    connection.execSql(request)
    });
};

// The function is exported in order to be called from the 'getUsersAdmin' azure functions. 
module.exports.getUserById = getUserById;