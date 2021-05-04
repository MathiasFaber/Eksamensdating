// This variable links to the db.js file, and this is where the db functions is called.
const db = require("../shared/db")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startdb(); // start db connection

    } catch(error) {
        console.log("error1", error.message);
    };
    // A switch statement is made here to define the different cases. 
    // If the case is able to be executed, it is executed. Else the default case is executed.
switch (req.method) {
    case 'GET':
        await get(context, req);
        break;
        
        default:
            context.res = {
                body: "please get or post"
            }
            break;
        };
};
 
// This get function is made for the admin to be able to get alle matches in the system. 
// It calls the function adminGetMatches in db.
async function get (context, req){
    try {
        let user = await db.adminGetMatches()
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