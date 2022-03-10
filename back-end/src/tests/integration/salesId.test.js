const chai = require('chai');
const chaiHttp = require('chai-http');

const { user } = require('../../database/models');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../api/app');
const { unauthorized, success, notFound } = require('../../utils/dictionary');
const md5 = require('md5');      

const hash = md5('hardpassword123');
const register = {
  name: "Daenerys Louzeiro",
  email: "drogonbelive@email.com",
  password: hash,
  role: "customer"
};

describe('Route GET /sales/:id', () => {
  describe('when there is sales', () => {
    let getSale;
    let token;

    before(async () => {
      try {
        await user.create(register)
        token = await chai.request(app)
          .post('/login')
          .send({
            email: "drogonbelive@email.com",
            password: "hardpassword123",
          })
          .then((res) => res.body.token);

        await chai.request(app)
          .post('/sales')
          .send({
            "sellerId": 2,
            "totalPrice": 50.00,
            "deliveryAddress": "exemplo de endereço",
            "deliveryNumber": "N° 500",
            "products": [
              {
                "productId": 1,
                "quantity": 5
              },
              {
                "productId": 2,
                "quantity": 4
              }
            ]
          })
          .set('authorization', token);        
        getSale = await chai.request(app)
          .get('/sales/1')
          .set('authorization', token);

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns 200 - success', async () => {
      const { status } = getSale;

      expect(status).to.be.equals(success);
    });

    it('returns an object', async () => {
      const response = getSale;

      expect(response).to.be.an('object');
    });
  })

  describe('when request does not have a token', () => {
    let getSale;
    let token;

    before(async () => {
      try {
        await user.create(register)
        token = await chai.request(app)
          .post('/login')
          .send({
            email: "drogonbelive@email.com",
            password: "hardpassword123",
          })
          .then((res) => res.body.token);

        await chai.request(app)
          .post('/sales')
          .send({
            "sellerId": 2,
            "totalPrice": 50.00,
            "deliveryAddress": "exemplo de endereço",
            "deliveryNumber": "N° 500",
            "products": [
              {
                "productId": 1,
                "quantity": 5
              },
              {
                "productId": 2,
                "quantity": 4
              }
            ]
          })
          .set('authorization', token);        
        getSale = await chai.request(app)
          .get('/sales/1');

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns an object', async () => {

      expect(getSale.body).to.be.a('object');
    });

    it('request returns 401 - Unauthorized', async () => {

      expect(getSale.body).to.have.property('message');
    });

    it('request returns a message with the text', async () => {

      expect(getSale.body.message).to.be.equal('missing auth token');
    });
  })
  
  describe('when request does not have a token', () => {
    let getSale;
    let token;

    before(async () => {
      try {
        await user.create(register)
        token = await chai.request(app)
          .post('/login')
          .send({
            email: "drogonbelive@email.com",
            password: "hardpassword123",
          })
          .then((res) => res.body.token);

        await chai.request(app)
          .post('/sales')
          .send({
            "sellerId": 2,
            "totalPrice": 50.00,
            "deliveryAddress": "exemplo de endereço",
            "deliveryNumber": "N° 500",
            "products": [
              {
                "productId": 1,
                "quantity": 5
              },
              {
                "productId": 2,
                "quantity": 4
              }
            ]
          })
          .set('authorization', token);        
        getSale = await chai.request(app)
          .get('/sales/1')
          .set('authorization', 'invalid token');

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns an object', async () => {

      expect(getSale.body).to.be.a('object');
    });

    it('returns status 401', async () => {

      expect(getSale.status).to.be.equal(unauthorized);
    });

    it('request returns 401 - Unauthorized', async () => {

      expect(getSale.body).to.have.property('message');
    });

    it('request returns a message with the text', async () => {

      expect(getSale.body.message).to.be.equal('jwt malformed');
    });
  })

  describe('if the sale of the id does not exist', () => {
    let getSale;
    let token;

    before(async () => {
      try {
        await user.create(register)
        token = await chai.request(app)
          .post('/login')
          .send({
            email: "drogonbelive@email.com",
            password: "hardpassword123",
          })
          .then((res) => res.body.token);

        await chai.request(app)
          .post('/sales')
          .send({
            "sellerId": 2,
            "totalPrice": 50.00,
            "deliveryAddress": "exemplo de endereço",
            "deliveryNumber": "N° 500",
            "products": [
              {
                "productId": 1,
                "quantity": 5
              },
              {
                "productId": 2,
                "quantity": 4
              }
            ]
          })
          .set('authorization', token);        
        getSale = await chai.request(app)
          .get('/sales/9')
          .set('authorization', token);

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns 404 - not found', async () => {

      expect(getSale.status).to.be.equals(notFound);
    });

    it('returns an object', async () => {

      expect(getSale.body).to.be.a('object');
    });

    it('request returns a message with the text', async () => {

      expect(getSale.body.message).to.be.equal('sale not found');
    });
  })
})