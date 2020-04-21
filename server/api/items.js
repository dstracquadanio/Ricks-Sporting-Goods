const router = require('express').Router()
const {Item} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
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
router.put('/', async (req, res, next) => {
  try {
    // example input:
    // req.body: {
    //  items: [{id: 1, quantity: 2}, {id: 2 quantity: 3}]
    //    }
    for (let item of req.body.items) {
      await Item.update(
        {
          quantity: item.quantity,
        },
        {
          where: {
            id: item.id,
          },
        }
      )
    }
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
