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
    //  items: [{id: 1, quantity: 2}, {id: 2 quantity: 3}]
    //    }
    for (let item of req.body.shoppingCart) {
      const currentItem = await Item.findByPk(item.itemId)
      await Item.update(
        {
          quantity: currentItem.quantity - item.quantity,
        },
        {
          where: {
            id: item.itemId,
          },
        }
      )
    }
    const updatedItems = await Item.findAll()
    res.json(updatedItems)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  try {
    const createItem = Item.create(req.body)
    res.json(createItem)
  } catch (err) {
    next(err)
  }
})
