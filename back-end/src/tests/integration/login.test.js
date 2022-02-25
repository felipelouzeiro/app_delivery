const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { user } = require('../../database/models');
const md5 = require('md5');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../api/app');
const { unauthorized, badRequest, success } = require('../../utils/dictionary');

describe('Route POST /login', () => {
  describe('when login is succeed', () => {
    let login;
    
    before(async () => {

      try {
        const hash = md5("test123");
        const register = {
          name: "Testing User",
          email: "test@email.com",
          password: hash,
          role: "customer",
        };
        
        await user.create(register)
        
        login = await chai.request(app)
          .post('/login')
          .send({
            email: "test@email.com",
            password: "test123",
          })

      } catch (error) {
        console.error(error.message);
      }
    });
 
    it('returns 200 - OK', async () => {
      expect(login).to.have.status(success);
    });

    it('return a token attribute', async () => {
      expect(login.body).to.be.a('object');
    });

    it('return a token attribute', async () => {
      expect(login.body).to.have.property('token');
    });    
  })

  describe('when email is invalid', () => {
    let login;
    
    before(async () => {
      try {
    
        login = await chai.request(app)
          .post('/login')
          .send({
            email: "test@emailcom",
            password: "test123",
          })

      } catch (error) {
        console.error(error.message);
      }
    });
 
    it('returns 401 - Unauthorized', async () => {
      expect(login).to.have.status(unauthorized);
    });

    it('return a object', async () => {
      expect(login.body).to.be.a('object');
    });

    it('return a message attribute', async () => {
      expect(login.body).to.have.property('message');
    });   

    it('verify message text is expected', async () => {
      expect(login.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('when email is not exists', () => {
    let login;
    
    before(async () => {
      try {
    
        login = await chai.request(app)
          .post('/login')
          .send({
            password: "test123",
          })

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns 401 - Unauthorized', async () => {
      expect(login).to.have.status(unauthorized);
    });

    it('return a object', async () => {
      expect(login.body).to.be.a('object');
    });

    it('return a message attribute', async () => {
      expect(login.body).to.have.property('message');
    });   

    it('verify message text is expected', async () => {
      expect(login.body.message).to.be.equal('\"email\" is required');
    });
  })

  describe('when email is empty', () => {
    let login;
    
    before(async () => {
      try {
    
        login = await chai.request(app)
          .post('/login')
          .send({
            email: "",
            password: "test123",
          })

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns 401 - Unauthorized', async () => {
      expect(login).to.have.status(unauthorized);
    });

    it('return a object', async () => {
      expect(login.body).to.be.a('object');
    });

    it('return a message attribute', async () => {
      expect(login.body).to.have.property('message');
    });   

    it('verify message text is expected', async () => {
      expect(login.body.message).to.be.equal('\"email\" is not allowed to be empty');
    });
  })

  describe('when password is invalid', () => {
    let login;
    
    before(async () => {
      try {
    
        login = await chai.request(app)
          .post('/login')
          .send({
            email: "test@emailcom",
            password: "123",
          })

      } catch (error) {
        console.error(error.message);
      }
    });
 
    it('returns 401 - Unauthorized', async () => {
      expect(login).to.have.status(unauthorized);
    });

    it('return a object', async () => {
      expect(login.body).to.be.a('object');
    });

    it('return a message attribute', async () => {
      expect(login.body).to.have.property('message');
    });   

    it('verify message text is expected', async () => {
      expect(login.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('when password not exists', () => {
    let login;
    
    before(async () => {
      try {
    
        login = await chai.request(app)
          .post('/login')
          .send({
            email: "test@email.com",
          })

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns 401 - Unauthorized', async () => {
      expect(login).to.have.status(unauthorized);
    });

    it('return a object', async () => {
      expect(login.body).to.be.a('object');
    });

    it('return a message attribute', async () => {
      expect(login.body).to.have.property('message');
    });   

    it('verify message text is expected', async () => {
      expect(login.body.message).to.be.equal('\"password\" is required');
    });
  })

  describe('when password is empty', () => {
    let login;
    
    before(async () => {
      try {
    
        login = await chai.request(app)
          .post('/login')
          .send({
            email: "test@email.com",
            password: "",
          })

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns 401 - Unauthorized', async () => {
      expect(login).to.have.status(unauthorized);
    });

    it('return a object', async () => {
      expect(login.body).to.be.a('object');
    });

    it('return a message attribute', async () => {
      expect(login.body).to.have.property('message');
    });   

    it('verify message text is expected', async () => {
      expect(login.body.message).to.be.equal('\"password\" is not allowed to be empty');
    });
  })
})