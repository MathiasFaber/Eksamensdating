// This variable links to the db.js file, and this is where the db functions is called.
const db = require("../shared/db")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    /*
    try{
        await db.startdb(); // start db connection

    } catch(error) {
        console.log("error1", error.message);
    };*/
    // A switch statement is made here to define the different cases. 
    // If the case is able to be executed, it is executed. Else the default case is executed.
switch (req.method) {
    case 'PUT':
        await put(context, req);
        break;
        
        default:
            context.res = {
                body: "please put"
            }
            break;
        };
};
 
// this put function updates the information about a user in the database.
// it sends alle the updated data, including an ID as the payload, and the SQL query in db.js, updates the data on the user with the specified ID. 
async function put (context, req){
    try {
        let payload = req.body;
        let user = await db.update(payload)
        context.res = {
            body: {
                user: user
            }
        };

    } catch(error) {
        context.res = {
            status: 400,
            body: `no user - ${error.message}`
        }
    }
};