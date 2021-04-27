const db = require("../shared/db")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startdb(); // start db connection

    } catch(error) {
        console.log("error1", error.message);
    };
switch (req.method) {
    case 'PUT':
        await get(context, req);
        break;
        
        default:
            context.res = {
                body: "please put"
            }
            break;
        };
};
 
async function get (context, req){
    try {
        let user = await db.getUsers()
        // req 
        context.res = {
            body: {
                user: user
            }
        };
        console.log(JSON.stringify(context.res) + "index.js123")

    } catch(error) {
        context.res = {
            status: 400,
            body: `no user - ${error.message}`
        }
    }
};