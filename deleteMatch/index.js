// This variable links to the db.js file, and this is where the db functions is called.
const db = require("../shared/db")

module.exports = async function (context, req) {

    // A switch statement is made here to define the different cases. 
    // If the case is able to be executed, it is executed. Else the default case is executed.
    switch (req.method) {
        // This delete case, calls the deleteMatch function on line 28
        case 'DELETE':
            await deleteMatch(context, req);
            break;
        
        default:
            context.res = {
                body: "please delete"
            }
            break;
    }
}

// This function calls the deleteMatch function from db.js, containing the data from the request(sent from the frontend)
async function deleteMatch (context, req){
    try {
        let payload = req.body;
        await db.deleteMatch(payload);
        context.res = {
            body: {status: JSON.stringify(payload)}

        }
    } catch (error){
        context.res = {
            status: 400,
            body: error.message
        }   
    }
};