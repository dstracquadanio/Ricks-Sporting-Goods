/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Item = db.model('item')
const Cart = db.model('cart')
const User = db.model('user')

describe('Item routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/items/', () => {
    let joe
    let pretendCart
    const itemData = [
      {
        name: 'Toilet Paper',
        price: 90.0,
        quantity: 6,
        sport: 'basketball',
      },
      {
        name: 'Paper Towel',
        price: 22.0,
        quantity: 9,
        sport: 'basketball',
      },
      {
        name: 'Detergent',
        price: 10.0,
        quantity: 2,
        sport: 'basketball',
      },
    ]
    beforeEach(async () => {
      joe = await User.create({
        email: 'something@email.com',
      })
      const createdItems = await Item.bulkCreate(itemData)
      const storedItems = createdItems.map((item) => item.dataValues)
      const cartItem = await Cart.create({
        //toilet paper
        ...storedItems[0],
        quantity: 2,
        userId: joe.id,
        itemId: storedItems[0].id, //1
      })
      const cartItem2 = await Cart.create({
        //paper towel
        ...storedItems[1],
        quantity: 1,
        userId: joe.id,
        itemId: storedItems[1].id, //2
      })
      pretendCart = [cartItem, cartItem2]
    })

    it('GET /api/items gets all items', async () => {
      const allItems = await request(app).get('/api/items')
      expect(allItems.body).to.be.an('array')
    })
    it('GET /api/items gets all items in alphabetical order', async () => {
      const allItems = await request(app).get('/api/items')
      expect(allItems.body[0].name).to.be.equal('Detergent')
      expect(allItems.body[2].name).to.be.equal('Toilet Paper')
    })
    it('GET /api/items/:itemId gets by Id', async () => {
      const item = await request(app).get(`/api/items/1`)
      expect(item.body.name).to.be.equal('Toilet Paper')
    })
    it('PUT /api/items/checkout updates quantities of Items in inventory', async () => {
      await request(app).put('/api/items/checkout').send(pretendCart)
      //changed item quantities
      const updatedItem = await request(app).get('/api/items/1')
      const updatedItem2 = await request(app).get('/api/items/2')
      expect(updatedItem.body.quantity).to.be.equal(4)
      expect(updatedItem2.body.quantity).to.be.equal(8)
      //unchanged item
      const notUpdatedItem = await request(app).get('/api/items/3')
      expect(notUpdatedItem.body.quantity).to.be.equal(2)
    })
  })
})