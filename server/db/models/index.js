const User = require('./user')
const ShoppingCart = require('./shoppingCart')
const Item = require('./item')

/* ASSOCIATIONS */
// ShoppingCart.belongsTo(User)
// User.hasMany(ShoppingCart)
User.belongsToMany(ShoppingCart, {through: 'Order'})
ShoppingCart.belongsTo(Item)

module.exports = {
  User,
  Item,
  ShoppingCart,
}

//test
