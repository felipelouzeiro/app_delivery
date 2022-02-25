const chai = require('chai');
const chaiHttp = require('chai-http');

const { user } = require('../../database/models');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../api/app');
const { badRequest, created, unauthorized } = require('../../utils/dictionary');
const md5 = require('md5');

describe('Route POST /sales', () => {
  describe('if there is no token', () => {
    let postSales;

    before(async () => {
      try {
        await user.create({
          name: "henrique cursino",
          email: "cursino@email.com",
          password: "123456",
          role: "customer"
        })

        postSales = await chai.request(app)
          .post('/sales')
          .send({
            "sellerId": 2,
            "totalPrice": 50.00,
            "deliveryAddress": "exemplo de endereço",
            "deliveryNumber": "N° 500",
          });

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns 401 - Unauthorized', async () => {
      const { status } = postSales;

      expect(status).to.be.equals(unauthorized);
    });

    it('returns "totalPrice" is required', async () => {
      const { body: { message } } = postSales;

      expect(message).to.be.equals('missing auth token');
    });
  })

  describe('when the body passed is not valid', () => {
    let postSales;
    let token;

    before(async () => {
      try {
        await user.create({
          name: "henrique cursino",
          email: "cursino@email.com",
          password: "123456",
          role: "customer"
        })
        token = await chai.request(app)
          .post('/login')
          .send({
            email: "cursino@email.com",
            password: "123456",
          })
          .then((res) => res.body.token);

        postSales = await chai.request(app)
          .post('/sales')
          .send({
            "sellerId": 2,
            "deliveryAddress": "exemplo de endereço",
            "deliveryNumber": "N° 500",
          })
          .set('authorization', token);

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns 400 - Bad request', async () => {
      const { status } = postSales;

      expect(status).to.be.equals(badRequest);
    });

    it('returns "totalPrice" is required', async () => {
      const { body: { message } } = postSales;

      expect(message).to.be.equals('"totalPrice" is required');
    });
  })

  describe('when the body passed is valid', () => {
    let postSales;
    let token;

    before(async () => {
      try {
        const hash = md5('123456');
        await user.create({
          name: "henrique cursino",
          email: "cursino@email.com",
          password: hash,
          role: "customer"
        })
        token = await chai.request(app)
          .post('/login')
          .send({
            email: "cursino@email.com",
            password: "123456",
          })
          .then((res) => res.body.token);

        postSales = await chai.request(app)
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

      } catch (error) {
        console.error(error.message);
      }
    });

    it('returns 201 - Created', async () => {
      const { status } = postSales;

      expect(status).to.be.equals(created);
    });

    it('returns a message: "registered sale"', async () => {
      const { body: { message } } = postSales;

      expect(message).to.be.equals('registered sale');
    });
  })
})
