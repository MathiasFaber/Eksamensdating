const db = require("../shared/db")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    console.log("--------",req)
    try{
        await db.startdb(); // start db connection

    } catch(error) {
        console.log("error1", error.message);
    }
switch (req.method) {
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