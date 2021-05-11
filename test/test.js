var chai = require('chai');
var post = require('../Like/likeBL')
const db = require('../shared/db')
const sinon = require('sinon')
var expect = require('chai').expect;

//using only, so the system is prepated for running multiple unittests 
describe.only('API', function (){
    let likeStub 
// Using likeStub in sinon to wrap the existing function so that the original one is not called
// Beneficial due to the business logic nature of the test
    beforeEach(()=>{
        likeStub = sinon.stub(db, 'like').callsFake(()=>{
            return Promise.resolve({match: 1})
        })
    })
    afterEach(()=>{
        likeStub.restore();
    })
    //using only, so the system is prepated for running multiple unittests 
    it.only('It should post a new like', async() => {
// Sending the responese
        const context = {
            res:{}
          };
          
          const req = {
            body:'test'
          }
        await post(context, req)
        console.log(context)
        expect(context.res.body.match).to.be.equal(1)

    });
});