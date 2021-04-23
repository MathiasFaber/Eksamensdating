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
                body: "please get or post"
            }
            break;
        }
}

async function get (context, req){
    try {
        let payload = req.body
        console.log(JSON.stringify(payload) + "index.js")
        let user = await db.getUsers(payload)
        context.res = {
            body: user
        };
        console.log(JSON.stringify(context.res) + "index.js123")

    } catch(error) {
        context.res = {
            status: 400,
            body: `no user - ${error.message}`
        }

    }
};