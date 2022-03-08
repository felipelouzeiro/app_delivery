const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../api/app');
const { success } = require('../../utils/dictionary');

const md5 = require('md5');
const { user } = require('../../database/models');
const { generateToken } = require('../../utils/JWTServices');

const hash = md5("test123");
const register = {
  name: "Testing User",
  email: "test@email.com",
  password: hash,
  role: "customer",
};

describe('Route GET /user', () => {
  describe('when request returns all Users', () => {
    let getUsers;

    before(async () => {
      try {
        await user.create(register);
        const { email } = register
        const userCreated = await user.findOne({ where: { email } });
  
        const { password: _password, ...userWithoutPassword } = userCreated;
  
        const mockToken = generateToken(userWithoutPassword);
        
        getUsers = await chai.request(app)
          .get('/user')
          .set('authorization', mockToken );

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns 200 - success', async () => {

      expect(getUsers).to.have.status(success);
    });

    it('request returns an array', async () => {

      expect(getUsers.body).to.be.a('array');
    });
  })

  describe('when request does not have a token', () => {
    let getUsers;

    before(async () => {
      try {
        getUsers = await chai.request(app)
          .get('/user')

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns an object', async () => {

      expect(getUsers.body).to.be.a('object');
    });

    it('request returns 401 - Unauthorized', async () => {

      expect(getUsers.body).to.have.property('message');
    });

    it('request returns a message with the text', async () => {

      expect(getUsers.body.message).to.be.equal('missing auth token');
    });

  })
  describe('when the token is invalid', () => {
    let getUsers;

    before(async () => {
      try {
        getUsers = await chai.request(app)
          .get('/user')
          .set('authorization', 'fakeInvalidToken' );

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns an object', async () => {

      expect(getUsers.body).to.be.a('object');
    });

    it('request returns 401 - Unauthorized', async () => {

      expect(getUsers.body).to.have.property('message');
    });

    it('request returns a message with the text', async () => {

      expect(getUsers.body.message).to.be.equal('jwt malformed');
    });

  })
});
