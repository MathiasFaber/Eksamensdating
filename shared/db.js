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
        const sql = `INSERT INTO [Dating].[user] (name, email, birthdate, genderID, toothbrushColorID, password) VALUES (@name, @email, @birthdate, @genderID, @toothbrushColorID, @password)`
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err)
                console.log(err)
            };
        });
        request.addParameter('name', TYPES.VarChar, payload.name);
        request.addParameter('email', TYPES.VarChar, payload.email);
        request.addParameter('birthdate', TYPES.Date, payload.birthdate);
        request.addParameter('genderID', TYPES.Int, payload.genderID);
        request.addParameter('toothbrushColorID', TYPES.Int, payload.toothbrushColorID);
        request.addParameter('password', TYPES.VarChar, payload.password);



        request.on('requestCompleted', (row) => {
            console.log('User inserted! juhu', row)
            resolve('User inserted', row)
        });

        connection.execSql(request)
    });
}
module.exports.insert = insert;


function select(name){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [Dating].[user] where name = @name'
    const request = new Request(sql, (err, rowcount) => {
        if (err) {
            reject(err);
            console.log(err)
        } else if (rowcount == 0) {
            reject({message: "user does not exist"})
        }
    });

    request.addParameter('name', TYPES.VarChar, name);

    request.on('row', (columns) => {
        resolve(columns)
    })
    connection.execSql(request)
    })
}

module.exports.select = select;
