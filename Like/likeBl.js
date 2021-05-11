// This file contatins the business logic of likes - index.js 
const db = require('../shared/db')
// Same logic as index.js but separated for testing
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
module.exports = post