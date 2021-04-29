const db = require("../shared/db")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    console.log(req)
    try{
        await db.startdb(); // start db connection

    } catch(error) {
        console.log("error1", error.message);
    }
switch (req.method) {
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

async function deleteMatch (context, req){
    try {
        let payload = req.body;
        await db.deleteMatch123(payload);
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