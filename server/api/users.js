const router = require('express').Router()
const {User, ShoppingCartItem} = require('../db/models')
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
//expects an item in request body with an itemId
router.put('/:userId', async (req, res, next) => {
  try {
    const itemId = req.body.itemId
    const userId = req.params.userId
    const [instance, wasCreated] = await ShoppingCartItem.findOrCreate({
      where: {
        userId,
        itemId,
      },
      defaults: req.body,
    })
    if (wasCreated === false) {
      await instance.update(req.body)
    }
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart/', async (req, res, next) => {
  try {
    const cart = await ShoppingCartItem.findAll({
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

router.put('/:userId/checkout', async (req, res, next) => {
  try {
    const userId = req.body.userId
    const itemArray = req.body.shoppingCart
    for (let item of itemArray) {
      await ShoppingCartItem.destroy({
        where: {
          userId: userId,
          itemId: item.id,
        },
      })
    }
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
