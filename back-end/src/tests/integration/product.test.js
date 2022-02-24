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

describe('Route GET /product', () => {
  describe('when request returns all products', () => {
    let getProducts;

    before(async () => {
      try {
        await user.create(register);
        const { email } = register
        const userCreated = await user.findOne({ where: { email } });
  
        const { password: _password, ...userWithoutPassword } = userCreated;
  
        const fakeToken = generateToken(userWithoutPassword);
        
        getProducts = await chai.request(app)
          .get('/product')
          .set('authorization', fakeToken );

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns 200 - success', async () => {

      expect(getProducts).to.have.status(success);
    });

    it('request returns an array', async () => {

      expect(getProducts.body).to.be.a('array');
    });
  })

  describe('when request does not have a token', () => {
    let getProducts;

    before(async () => {
      try {
        getProducts = await chai.request(app)
          .get('/product')

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns an object', async () => {

      expect(getProducts.body).to.be.a('object');
    });

    it('request returns 401 - Unauthorized', async () => {

      expect(getProducts.body).to.have.property('message');
    });

    it('request returns a message with the text', async () => {

      expect(getProducts.body.message).to.be.equal('missing auth token');
    });

  })
  describe('when the token is invalid', () => {
    let getProducts;

    before(async () => {
      try {
        getProducts = await chai.request(app)
          .get('/product')
          .set('authorization', 'fakeInvalidToken' );

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns an object', async () => {

      expect(getProducts.body).to.be.a('object');
    });

    it('request returns 401 - Unauthorized', async () => {

      expect(getProducts.body).to.have.property('message');
    });

    it('request returns a message with the text', async () => {

      expect(getProducts.body.message).to.be.equal('jwt malformed');
    });

  })
});
