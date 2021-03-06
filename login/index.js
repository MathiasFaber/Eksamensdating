// This variable links to the db.js file, and this is where the db functions is called.
const db = require('../shared/db.js')

module.exports = async function (context, req) {
    try{
        await db.startdb(); // start db connection

    } catch(error) {
        console.log("error1", error.message);
    }
    // A switch statement is made here to define the different cases. 
    // If the case is able to be executed, it is executed. Else the default case is executed.
        // This is smart when doing different request to the same endpoint
switch (req.method) {
        // This POST case calls the post function later in this file
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
 
// this post function calls the login function in the db.js file. 
// The payload contains the request, which is the login information tyoped in by the user in the frontend. 
async function post (context, req){
    try {

        let payload = req.body;
        let user = await db.login(payload);
        context.res = {
            body: user,
            status: 200
        }
    } catch (error){
        context.res = {
            status: 400,
            body: error.message
        }   
    }
};
