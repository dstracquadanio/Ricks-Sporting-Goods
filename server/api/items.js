const router = require('express').Router()
const {Item} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll({
      order: [['name', 'ASC']],
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.get('/:itemId', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.itemId)
    res.json(item)
  } catch (err) {
    next(err)
  }
})

// purchasing an item (reducing quantity)
router.put('/checkout', async (req, res, next) => {
  try {
    // example input:
    // req.body: {
    //  userId: 1,
    //  cart: [{id: 1, quantity: 2}, {id: 2 quantity: 3}]
    //    }
    for (let item of req.body /* .cart */) {
      const currentItem = await Item.findByPk(item.itemId)
      await currentItem.updateQuantities(item.quantity)
    }
    // vv Delete this vv
    const updatedItems = await Item.findAll()
    res.json(updatedItems)
    //res.sendStatus(2??)
  } catch (err) {
    next(err)
  }
})
