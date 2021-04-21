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
    
        case 'POST':
            await post(context, req);
            break;

        case 'DELETE':
            await deleteProfile1(context, req);
            break;
        
        default:
            context.res = {
                body: "please get or post"
            }
            break;
        }
}

async function get (context, req){
    try {
        let payload = req.body
        let user = await db.login(payload)
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

async function post (context, req){
    try {
        let payload = req.body;
        await db.login(payload);
        context.res = {
            body: {status: 'Succes' + JSON.stringify(payload)}

        }
    } catch (error){
        context.res = {
            status: 400,
            body: error.message
        }   
    }
};

async function deleteProfile1 (context, req){
    try {
        let payload = req.body;
        await db.deleteProfile2(payload);
        context.res = {
            body: {status: 'Succes, this user has been deleted: ' + JSON.stringify(payload)}

        }
    } catch (error){
        context.res = {
            status: 400,
            body: error.message
        }   
    }
};