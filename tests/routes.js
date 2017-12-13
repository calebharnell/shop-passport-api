const request = require('supertest');
const app = require('../server.js');
const User = require('../models/User');
const Product = require('../models/Product');
const chai = require('chai');
const should = chai.should();

let token
let adminToken
let currentProduct

describe('Test routes', () => {
  it('Should return a 404 for an invalid URL', (done) => {
    request(app)
      .get('/nothing-to-see-here')
      .expect(404, done)
  })

  it('Should register a user', (done) => {
    request(app)
      .post('/auth/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@doe.com',
        password: 'password123'
      })
      .expect(200, done)
  })

  it('Should log a user in', (done) => {
    request(app)
      .post('/auth')
      .send({
        email: 'jane@doe.com',
        password: 'password123'
      })
      .expect(200)
      .then((response) => {
        token = response.body.token;
        done()
      })
  })

  it('Should log an admin in', (done) => {
    request(app)
      .post('/auth')
      .send({
        email: 'admin@admin.com',
        password: 'admin123'
      })
      .expect(200)
      .then((response) => {
        adminToken = response.body.token;
        done()
      })
  })

  it('Should require correct credentials', (done) => {
    request(app)
      .post('/auth')
      .send({
        email: 'beep@boop.com',
        password: 'derp'
      })
      .expect(401, done)
  })

  it('Should not let a random through to /admin', (done) => {
    request(app)
      .get('/admin')
      .expect(401, done)
  })

  // Products CRUD

  // CREATE
  it('Should require a token to CREATE products', (done) => {
    request(app)
      .post('/products')
      .expect(401, done)
  })

  it('Should allow creation of products to admin token bearers', (done) => {
    request(app)
      .post('/products')
      .set('Authorization', 'Bearer ' + adminToken)
      .send({
        brandName: 'Wild Rhino',
        name: 'Booties'
      })
      .expect(200)
      .then((response) => {
        // Make sure the response is an array
        response.body.should.be.an('object')
        currentProduct = response.body
        done()
      })
  })

  // READ
  it('Should require a token to view products', (done) => {
    request(app)
      .get('/products')
      .expect(401, done)
  })

  it('Should display products to token bearers', (done) => {
    request(app)
      .get('/products')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .then((response) => {
        // Make sure the response is an array
        response.body.should.be.an('array')
        done()
      })
  })

  // UPDATE
  it('Should require a token to UPDATE products', (done) => {
    request(app)
      .patch('/products')
      .expect(401, done)
  })

  it('Should allow UPDATING of products to token bearers', (done) => {
    request(app)
      .patch('/products')
      .set('Authorization', 'Bearer ' + adminToken)
      .send({
        _id: currentProduct._id,
        brandName: 'Wild Rhino 2',
        name: 'Booties'
      })
      .expect(200)
      .then((response) => {
        // Make sure the response is an array
        response.body.should.be.an('object')
        done()
      })
  })

  // DELETE
  it('Should require a token to DELETE products', (done) => {
    request(app)
      .delete(`/products/${currentProduct._id}`)
      .expect(401, done)
  })

  it('Should allow DELETING of products to token bearers', (done) => {
    request(app)
      .delete(`/products/${currentProduct._id}`)
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(200)
      .then((response) => {
        // Make sure the response is an array
        response.body.should.be.an('object')
        done()
      })
  })

  // Clean up

  after(() => {
    User.remove({ email: 'jane@doe.com' }).then(() => {
      console.log('Cleaned test user from the database!')
    })
  })
})
