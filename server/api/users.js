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
// NEEDS TO BE UPDATE OR CREATE!!
router.post('/', async (req, res, next) => {
  try {
    await ShoppingCartItem.create(req.body)
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
