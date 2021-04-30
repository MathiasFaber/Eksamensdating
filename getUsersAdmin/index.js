const db = require("../shared/db")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startdb(); // start db connection

    } catch(error) {
        console.log("error1", error.message);
    }
switch (req.method) {
   
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
