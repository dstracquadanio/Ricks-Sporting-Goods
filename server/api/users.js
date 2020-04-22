const router = require('express').Router()
const {User, Cart, PurchasedItem} = require('../db/models')
module.exports = router

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
    // const [instance, wasCreated] = await Cart.findOrCreate({
    //   where: {
    //     userId,
    //     itemId,
    //   },
    //   defaults: req.body,
    // })
    // if (wasCreated === false) {
    //   await instance.update(req.body)
    // }
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
router.put('/:userId/checkout', async (req, res, next) => {
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
      await PurchasedItem.create({
        name: item.name,
        price: item.price,
        description: item.description,
        imageUrl: item.imageUrl,
        quantity: item.quantity,
        sport: item.sport,
        itemId: item.itemId,
        userId: item.userId,
        orderNumber: newOrderNum,
      })
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
