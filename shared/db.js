//main branch
const {Connection, Request, TYPES} = require('tedious');
const config = require('./config.json')

var connection = new Connection(config);

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

module.exports.sqlConnection = connection
module.exports.startdb = startdb;

function insert(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [Dating].[User] (name, email, password, birthdate, zipCode, description, genderId, toothbrushId, genderPreference, agePreference) VALUES (@name, @email, @password, @birthdate, @zipcode, @description, @genderId, @toothbrushId, @genderPreference, @agePreference)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            };
        });
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


        request.on('requestCompleted', (row) => {
            console.log('User inserted! juhu', row)
            resolve('User inserted', row)
        });

        connection.execSql(request)
    });
}
module.exports.insert = insert;


function login (payload){
    console.log(payload)
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Dating.[User] WHERE email = @email AND password = @password'
        // Ændr password, så vi sender et hashed password og et salt. 
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
        });results.push(result);

      });
      request.on('doneProc', (rowCount) => {
             resolve(results) 
        });
    connection.execSql(request)
    });
};

module.exports.login = login;


function deleteProfile2 (payload){
    console.log(payload + "deleteProfile2 function")
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Dating.[User] WHERE name = @name'
    const request = new Request(sql, (err, rowcount) => {
        
        if (err) {
            return reject(err);
           
        } else if (rowcount == 0) {
            return reject({message: "user does not exist"})
        }else{
            return resolve({message: 'user deleted succesfully'})
        }
    });

    request.addParameter('name', TYPES.VarChar, payload.name);

    request.on('row', (columns) => {
        console.log(columns)
        resolve(columns)
    })
    connection.execSql(request)
    });
};

    


module.exports.deleteProfile2 = deleteProfile2;


// Fjern promise, "return" resultatet istedet for at resolve. Brug syntax fra "get staff from first letter"
function getUsers (){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Dating.[User] WHERE roleId = 1'
        const request = new Request(sql, (err, rowcount) => {
            if (err) {
                reject(err);
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: "user does not exist"})
            };
        });

        connection.execSql(request)

        let results = [];
            request.on('row', async function(columns)  {
            let result = {};
            await columns.forEach(column => {
            result[column.metadata.colName] = column.value;
        });results.push(result);

      });
      request.on('doneProc', (rowCount) => {
             resolve(results) 
        });
    });
};

module.exports.getUsers = getUsers;



function update (payload){
    console.log(payload + JSON.stringify(payload) + "update function")
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Dating.[User] SET name=@name, email=@email, password=@password, birthdate=@birthdate, zipCode=@zipCode, description=@description, genderId=@genderId, toothbrushId=@toothbrushId, genderPreference=@genderPreference, agePreference=@agePreference WHERE userId = @userId'
    const request = new Request(sql, (err, rowcount) => {
        
        if (err) {
            return reject(err);
           
        } else if (rowcount == 0) {
            return reject({message: "user does not exist"})
        }
    });

    console.log(payload.userId)

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
    connection.execSql(request)
    });
};

module.exports.update = update;




function like(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [Dating].[Like] (currentUserId, otherUserId) VALUES (@currentUserId, @otherUserId)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            };
        });
        request.addParameter('currentUserId', TYPES.Int, payload.currentUserId);
        request.addParameter('otherUserId', TYPES.Int, payload.otherUserId);


        request.on('requestCompleted', (row) => {
            console.log('Like inserted! juhu', row)
            resolve('User inserted', row)
        });

        connection.execSql(request)
    });
}
module.exports.like = like;


function matches (payload){
    return new Promise((resolve, reject) => {
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

        request.addParameter('currentUserId', TYPES.Int, payload.currentUserId);

        connection.execSql(request)

        let results = [];
            request.on('row', async function(columns)  {
            let result = {};
            await columns.forEach(column => {
            result[column.metadata.colName] = column.value;
        });results.push(result);

      });
      request.on('doneProc', (rowCount) => {
             resolve(results) 
        });
    });
};

module.exports.matches = matches;




function deleteMatch123 (payload){
    console.log(payload)
    return new Promise((resolve, reject) => {
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

    request.addParameter('currentUserId', TYPES.Int, payload.currentUserId);
    request.addParameter('otherUserId', TYPES.Int, payload.otherUserId);


    request.on('row', (columns) => {
        console.log(columns)
        resolve(columns)
    })
    connection.execSql(request)
    });
};

module.exports.deleteMatch123 = deleteMatch123;



// BAD REQUEST
function notification(payload){
    console.log(payload + "---------------------")
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Dating.[Like] WHERE currentUserId = @currentUserId AND matchYN = 'Y'`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            };
        });
        request.addParameter('currentUserId', TYPES.Int, payload.currentUserId);

        let results = [];
        request.on('row', async function(columns)  {
        let result = {};
        await columns.forEach(column => {
        result[column.metadata.colName] = column.value;
    });results.push(result);

  });
  request.on('doneProc', (rowCount) => {
         resolve(results) 
    });

        connection.execSql(request)
    });
}
module.exports.notification = notification;


function adminLogin (payload){
    console.log(payload)
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Dating.[User] WHERE email = @email AND password = @password'
        // Ændr password, så vi sender et hashed password og et salt. 
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
        // console.log(result[column.metadata.colName.roleId], "--------------")
        //if(result[column.metadata.colName.roleId])
        results.push(result);
        if(results[0].roleId === 2){
            request.on('doneProc', (rowCount) => {
                resolve(results) 
           });
        } else {
            reject({message: "user does not exist"})
        }
      });
    connection.execSql(request)
    });
};

module.exports.adminLogin = adminLogin;



function adminGetMatches (){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Dating.[Like] WHERE matchYN = 'Y'`
        const request = new Request(sql, (err, rowcount) => {
            if (err) {
                reject(err);
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: "user does not exist"})
            };
        });

        connection.execSql(request)

        let results = [];
            request.on('row', async function(columns)  {
            let result = {};
            await columns.forEach(column => {
            result[column.metadata.colName] = column.value;
        });results.push(result);

      });
      request.on('doneProc', (rowCount) => {
             resolve(results) 
        });
    });
};

module.exports.adminGetMatches = adminGetMatches;



function getUserById (){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Dating.[User] WHERE roleId = 1'
    const request = new Request(sql, (err, rowcount) => {
        if (err) {
            reject(err);
            console.log(err)
        } else if (rowcount == 0) {
            reject({message: "user does not exist"})
        }
    });

    let results = [];
            request.on('row', async function(columns)  {
            let result = {};
            await columns.forEach(column => {
            result[column.metadata.colName] = column.value;
        });results.push(result);

        console.log(results)

      });
      request.on('doneProc', (rowCount) => {
             resolve(results) 
        });
    connection.execSql(request)
    });
};
module.exports.getUserById = getUserById;