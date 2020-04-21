const router = require('express').Router()
const {User, ShoppingCartItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
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
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const userId = req.body.userId
    const itemArray = req.body.shoppingCart
    for (let item of itemArray) {
      await ShoppingCartItem.destroy({
        where: {
          userId: userId,
          id: item.id,
        },
      })
    }
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
