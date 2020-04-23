const router = require('express').Router()
const {User, Cart, PurchasedItem, Item} = require('../db/models')
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
router.param('userId', async (req, res, next, userId) => {
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
})

//GET THIS USER'S CART
// router.get('/:userId/cart/', async (req, res, next) => {
//   try {
//     const cart = await Cart.findAll({
//       where: {
//         userId: req.params.userId,
//       },
//       order: [['name', 'ASC']],
//     })
//     res.json(cart)
//   } catch (err) {
//     next(err)
//   }
// })
router.get('/:userId/cart/', (req, res, next) => {
  res.json(req.currentUser.CartItems)
})

//ADD ITEM TO CART, IF ALREADY THERE UPDATE ITEM IN CART
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

//DELETES USER'S CART ON CHECKOUT, AND ADDS THOSE ITEMS TO PURCHASED HISTORY IN DB
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
