var server = require('../shared/db').like;
var chai = require('chai');
var chaiHTTP = require('chai-http');

//assertion style
chai.should()
chai.use(chaiHTTP);
var expect = require('chai').expect;

describe('API', function (){
    it('It should post a new like', (done) => {
        let Like = {
            currentUserId: 3,
            otherUserId: 2
        }
        chai.request(server)
        .post('http://localhost:7071/api/Like')
        .send(Like)
        .end((err,response)=> {
            response.expect.to.have.status(200);
            /*
            response.should.be.a('object');
            expect(50).to.be.a('Integer');
            expect({ currentUserId: 50 }).to.be.an('object');
            */

            done()
        });
    });
});
