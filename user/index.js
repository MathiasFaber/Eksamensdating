// This variable links to the db.js file, and this is where the db functions is called.
const db = require('../shared/db')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startdb(); // start db connection

    } catch(error) {
        console.log(error.message);
    }
    // A switch statement is made here to define the different cases. 
    // If the case is able to be executed, it is executed. Else the default case is executed.
switch (req.method) {
    case 'POST':
        await post(context, req);
        break;
    
    default:
        context.res = {
            body: "please get or post"
        }
        break;
    }
}

// This post function calls the insert function in db.js, which creates a new user in the database. 
async function post (context, req){
    try {
        let payload = req.body;
        await db.insert(payload);
        context.res = {
            // The response is just the payload here, as we dont need an answer from the database. 
            // we only need to send data to the database in order to create a new user. 
            body: JSON.stringify(payload)

        }
    } catch (error){
        context.res = {
            status: 400,
            body: error.message
        }   
    }
};

