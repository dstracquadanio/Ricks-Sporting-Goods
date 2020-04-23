const router = require('express').Router()
const {User, Cart, PurchasedItem} = require('../db/models')
module.exports = router

const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.session.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error('Access Denied!')
    error.status(401)
    next(error)
  }
}

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

// add or update shopping cart:
// Expecting the new total quantity of the cart. (Not incrementing)
router.put('/:userId', async (req, res, next) => {
  try {
    const itemId = req.body.id
    const userId = req.params.userId
    await Cart.addOrUpdateItemToCart(userId, itemId, req.body)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart/', async (req, res, next) => {
  try {
    // const cart = User.getShoppingCartItem()

    const cart = await Cart.findAll({
      where: {
        userId: req.params.userId,
      },
      order: [['name', 'ASC']],
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// MAKE INTO A DELETE ROUTE
// USE CLASS METHODS AND MAKE SHORTER
router.delete('/:userId/checkout', async (req, res, next) => {
  //middleware: security
  //TESTS
  try {
    const purchased = await Cart.findAll({
      where: {
        userId: req.params.userId,
      },
    })
    const newOrderNum = await PurchasedItem.newOrderNumber()
    for (let item of purchased) {
      item.dataValues.orderNumber = newOrderNum
      await PurchasedItem.create(item.dataValues)
    }
    await Cart.destroy({
      where: {
        userId: req.params.userId,
      },
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
