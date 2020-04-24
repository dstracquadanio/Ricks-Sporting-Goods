/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Item = db.model('item')
const PurchasedItem = db.model('purchasedItems')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    let joe
    let testItem1
    let testItem2

    beforeEach(async () => {
      joe = await User.create({
        email: codysEmail,
      })
      testItem1 = await Item.create({
        name: 'toilet paper',
        price: '1000.00',
        quantity: 10,
        sport: 'baseball',
      })
      testItem2 = await Item.create({
        name: 'paper towel',
        price: '900.00',
        quantity: 3,
        sport: 'basketball',
      })
      await joe.createCartItem({
        ...testItem1.dataValues,
        itemId: testItem1.id,
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app).get('/api/users').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
    it('GET /api/users/:userId/cart', async () => {
      const res = await request(app).get(`/api/users/${joe.id}/cart`)
      expect(res.body[0].name).to.be.equal('toilet paper')
    })
    it("PUT /api/users/:userId adds items that aren't on cart", async () => {
      await request(app)
        .put(`/api/users/${joe.id}`)
        .send({
          ...testItem2.dataValues,
          itemId: testItem2.id,
        })
        .expect(201)
      const res = await request(app).get(`/api/users/${joe.id}/cart`)
      expect(res.body[0].name).to.be.equal('toilet paper')
      expect(res.body[1].name).to.be.equal('paper towel')
    })
    it('PUT /api/users/:userId changes the quantity when the item was already on cart', async () => {
      const cart = await request(app).get(`/api/users/${joe.id}/cart`)
      expect(cart.body[0].quantity).to.be.equal(10)
      await request(app)
        .put(`/api/users/${joe.id}`)
        .send({
          ...testItem1.dataValues,
          quantity: 12, //change the quantity of cart from 10 to 12
          itemId: testItem1.id,
        })
        .expect(201)
      const updatedCart = await request(app).get(`/api/users/${joe.id}/cart`)
      expect(updatedCart.body[0].quantity).to.be.equal(12)
    })
    it('DELETE /api/users/:userId/checkout clears the cart', async () => {
      await request(app).delete(`/api/users/${joe.id}/checkout`)
      const clearedCart = await request(app).get(`/api/users/${joe.id}/cart`)
      expect(clearedCart.body[0]).to.be.equal(undefined)
    })
    it('DELETE /api/users/:userId/checkout adds purchases to PurchasedItem history', async () => {
      await request(app).delete(`/api/users/${joe.id}/checkout`)
      const purchasedItem = await PurchasedItem.findByPk(1)
      expect(purchasedItem.name).to.be.equal('toilet paper')
      expect(purchasedItem.quantity).to.be.equal(10)
      expect(purchasedItem.orderNumber).to.be.equal(1)
      expect(purchasedItem.userId).to.be.equal(joe.id)
      expect(purchasedItem.itemId).to.be.equal(testItem1.id)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
