const router = require('express').Router()
const {User, Cart, PurchasedItem, Item} = require('../db/models')
const {isAdminMiddleware, isCurrentUserMiddleware} = require('./middleware')
module.exports = router

//GET ALL USERS
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//SERVES REQ.CURRENTUSER FOR EVERY ROUTE THAT HAS /:userId
router.param(
  'userId',
  isCurrentUserMiddleware,
  async (req, res, next, userId) => {
    try {
      req.currentUser = await User.findByPk(userId, {
        attributes: ['id', 'email'],
        include: [
          {
            model: Cart,
            as: 'CartItems',
          },
        ],
      })
      if (!req.currentUser) throw new Error()
      next()
    } catch (err) {
      res.status(404).send(`Error at router.param: User at id: ${userId}`)
      next(err)
    }
  }
)

//GET THIS USER'S CART
router.get('/:userId/cart/', (req, res, next) => {
  res.json(req.currentUser.CartItems)
})

//ADD ITEM TO CART, IF ALREADY THERE UPDATE ITEM IN CART
// Expecting the new total quantity of the cart. (Not incrementing)
router.put('/:userId', async (req, res, next) => {
  //Only current user should be allowed to do this?? idk if this is something to address
  try {
    //SECURITY ALERT
    const itemId = req.body.itemId
    const userId = req.params.userId
    await Cart.addOrUpdateItemToCart(userId, itemId, req.body)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

//DELETES USER'S CART ON CHECKOUT, AND ADDS THOSE ITEMS TO PURCHASED HISTORY IN DB
router.delete('/:userId/checkout', async (req, res, next) => {
  //middleware: security
  try {
    const cartArray = req.currentUser.CartItems
    const newOrderNum = await PurchasedItem.newOrderNumber()
    for (let item of cartArray) {
      item.dataValues.orderNumber = newOrderNum
      await PurchasedItem.create(item.dataValues)
    }
    await req.currentUser.removeItems(cartArray.map((item) => item.itemId))
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//REMOVE A CART ITEM
router.delete('/:userId/cart/:itemId', async (req, res, next) => {
  //SECURITY ALERT
  try {
    await Cart.destroy({where: {itemId: req.params.itemId}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
