// This variable links to the db.js file, and this is where the db functions is called.
const db = require("../shared/db")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // A switch statement is made here to define the different cases. 
    // If the case is able to be executed, it is executed. Else the default case is executed.
switch (req.method) {
        // this delete case, calls the deleteProfile1 function on line 33
        case 'DELETE':
            await deleteProfile1(context, req);
            break;
        
        default:
            context.res = {
                body: "please delete"
            }
            break;
        }
}

// This function is called at line 18, and is calling the deleteProfile2 function from db.js, containing the payload.
// Th payload here is the request from the frontend, containing the name of the user that should be deleted. 
async function deleteProfile1 (context, req){
    try {
        let payload = req.body;
        await db.deleteProfile2(payload);
        context.res = {
            body: {status: 'Succes(azurefunction), this user has been deleted: ' + JSON.stringify(payload)}

        }
    } catch (error){
        context.res = {
            status: 400,
            body: error.message
        }   
    }
};