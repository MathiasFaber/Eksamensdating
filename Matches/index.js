// This variable links to the db.js file, and this is where the db functions is called.
const db = require('../shared/db')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startdb(); // start db connection

    } catch(error) {
        console.log("error1", error.message);
    }
    // A switch statement is made here to define the different cases. 
    // If the case is able to be executed, it is executed. Else the default case is executed.
    // This is smart when doing different request to the same endpoint
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

// The post function is called on a post request ot this azure functions endpoint. 
// The post function calls a function in the db.js file, that takes all matches from the database. 
async function post (context, req){
    try {
        let payload = req.body
        let user = await db.matches(payload)
        context.res = {
            body: user
        };

    } catch(error) {
        context.res = {
            status: 400,
            body: `no user - ${error.message}`
        }
    }
};

