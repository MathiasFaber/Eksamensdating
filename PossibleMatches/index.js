// This variable links to the db.js file, and this is where the db functions is called.
const db = require("../shared/db")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // A switch statement is made here to define the different cases. 
    // If the case is able to be executed, it is executed. Else the default case is executed.
switch (req.method) {
    case 'POST':
        await get(context, req);
        break;
        
        default:
            context.res = {
                body: "please get or post"
            }
            break;
        };
};
 
// This get function starts a function in db.js, which gets all the users from the database and sends them back as the response. 
async function get (context, req){
    try {
        let payload = req.body
        let user = await db.getUsers(payload)
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