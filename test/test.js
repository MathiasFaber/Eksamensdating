/*
var server = require('../Like/index');
var chai = require('chai');
var chaiHTTP = require('chai-http');

//assertion style
chai.should()
chai.use(chaiHTTP);
var expect = require('chai').expect;


describe('GET', function (){
    it('It should post a new like', (done) => {
        
        let Like = {
            currentUserId: 3,
            otherUserId: 2
        }
        
        chai
        .request('http://localhost:7071/api')
        .get('/getUsersAdmin')
        //.send(Like)
        .end((err, res) => {
            
            res.should.have.status(200);
            res.body.should.be.a("array")
            
            
            res.should.be.a('object');
            expect(50).to.be.a('Integer');
            expect({ currentUserId: 50 }).to.be.an('object');
            

            done()
        });
    });
});


describe("Get users", () => {
    it("should get all users", (done) => {
        chai
            .request("http://localhost:7071/api")
            .get("/getUsersAdmin")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                done()
            });
    });
});
*/

const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.use(chaiHttp)
const should = chai.should()
const httpFunction = require("../login/index")

describe("/POST users", () => {

	it("should return an object", async () => {
    	let res = await chai
        	const request = {
                email: "hulk@mail.dk",
                password: "Hulk123"
            }
            await httpFunction(context,request);

            //expect(context.status).to.equal(200);

            expect(context.res.body).to.equal('object');

            //res.should.be.a("object");
        //res.should.have.status(200)
    	//expect(res.status).to.equal(200)
	});
});