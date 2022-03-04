const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../api/app');
const { badRequest, created } = require('../../utils/dictionary');

describe('Route POST /register', () => {
  describe('when the body passed is not valid', () => {
    let postRegister;

    before(async () => {
      try {
        postRegister = await chai.request(app)
          .post('/register')
          .send({
            name: "henrique",
            email: "cursino@email.com",
            password: "123456",
            role: "customer"
          });

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns 400 - Bad request', async () => {
      const { status } = postRegister;

      expect(status).to.be.equals(badRequest);
    });

    it('returns "name" must be at least 12 characters', async () => {
      const { body: { message } } = postRegister;

      expect(message).to.be.equals('"name" length must be at least 12 characters long');
    });
  })

  describe('when the body passed is valid', () => {
    let postRegister;
    before(async () => {
      try {
        postRegister = await chai.request(app)
          .post('/register')
          .send({
            name: "henrique cursino",
            email: "cursino@email.com",
            password: "123456",
            role: "customer"
          });

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns 201 - Created', async () => {
      const { status } = postRegister;

      expect(status).to.be.equals(created);
    });

    it('returns a token', async () => {
      const { body } = postRegister;

      expect(body).to.have.all.keys('email', 'name', 'role', 'token');
    });
  })
})
