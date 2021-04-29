const db = require('../shared/db')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startdb(); // start db connection

    } catch(error) {
        console.log("error1", error.message);
    }
switch (req.method) {
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

async function post (context, req){
    try {
        let payload = req.body
        let user = await db.matches(payload)
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

