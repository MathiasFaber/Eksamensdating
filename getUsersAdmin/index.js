// This variable links to the db.js file, and this is where the db functions is called.
const db = require("../shared/db")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // A switch statement is made here to define the different cases. 
    // If the case is able to be executed, it is executed. Else the default case is executed.
switch (req.method) {
        // This get case, calls the function get on line 30
        case 'GET':
            await get(context, req);
            break;
        
        default:
            context.res = {
                body: "-------------"
            }
            break;
        }
}

// This function calls the getUserById function from db.js. 
// This is a get request, which is why there is not sent any data along with the request. 
async function get (context, req){
    try {
        let user = await db.getUserById();
        context.res = {
            body: user
        }
    } catch (error){
        context.res = {
            status: 400,
            body: error.message
        }   
    }
};
