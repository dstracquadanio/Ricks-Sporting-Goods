const router = require('express').Router()
const {Item} = require('../db/models')
const {isAdminMiddleware, isCurrentUserMiddleware} = require('./middleware')
module.exports = router

//GET ALL ITEMS
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll({
      order: [['id', 'ASC']],
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})

//SERVES REQ.CURRENTITEM FOR EVERY ROUTE THAT HAS /:itemId
router.param('itemId', async (req, res, next, itemId) => {
  try {
    req.currentItem = await Item.findByPk(itemId)
    if (!req.currentItem) throw new Error()
    next()
  } catch (err) {
    res.status(404).send(`Error at router.param: Item at id: ${itemId}`)
    next(err)
  }
})

//GET ITEM BY ID
router.get('/:itemId', (req, res, next) => {
  res.json(req.currentItem)
})

//UPDATE ITEM QUANTITIES ON CHECKOUT(reducing quantities in Item table)
router.put('/checkout', async (req, res, next) => {
  try {
    // example input:
    // req.body: {
    //  cart: [{id: 1, quantity: 2}, {id: 2 quantity: 3}]
    //    }
    for (let item of req.body) {
      const currentItem = await Item.findByPk(item.itemId)
      await currentItem.updateQuantities(item.quantity)
    }
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

//ADMIN ONLY - POST A NEW ITEM TO INVENTORY
router.post('/', isAdminMiddleware, async (req, res, next) => {
  //need is isAdmin middleware here
  try {
    res.json(await Item.create(req.body))
    // right now we don't actually make use of the response in our store
  } catch (err) {
    next(err)
  }
})

//ADMIN ONLY - DELETE AN ITEM FROM INVENTORY
router.delete('/:itemId', isCurrentUserMiddleware, async (req, res, next) => {
  //need is isAdmin middleware here
  try {
    await req.currentItem.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//ADMIN ONLY - EDIT ITEM INFORMATION
router.put('/:itemId', isAdminMiddleware, async (req, res, next) => {
  //need is isAdmin middleware here
  try {
    res.status(200)
    res.json(await req.currentItem.update(req.body))
    // const itemId = req.params.itemId
    // const [, item] = await Item.update(req.body, {
    //   where: {
    //     id: itemId,
    //   },
    //   returning: true,
    //   plain: true,
    // })
  } catch (error) {
    next(error)
  }
})
