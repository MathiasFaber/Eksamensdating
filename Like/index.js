// This variable links to the db.js file, and this is where the db functions is called.
const db = require('../shared/db')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // A switch statement is made here to define the different cases. 
    // If the case is able to be executed, it is executed. Else the default case is executed.
    switch (req.method) {
        // This POST case calls the post function later in this file
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

// The post function calls the like function from db.js. 
// This request contains an id on the user liking and the user that has been liked. 
// The response shows whether the user logged in, has had any new matches after liking a person, which is why the response is called 'match'
async function post (context, req){
    try {
        let payload = req.body;
        let match = await db.like(payload);
        context.res = {
            body: match

        }
    } catch (error){
        context.res = {
            status: 400,
            body: error.message
        }
    }
};