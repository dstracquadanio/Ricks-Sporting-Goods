const Sequelize = require('sequelize')
const db = require('../db')

const ShoppingCartItem = db.define('shoppingCartItem', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://dks.scene7.com/is/image/GolfGalaxy/16WILUJTVLTNXXXXXBKB?qlt=70&wid=600&fmt=pjpeg',
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  sport: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
})

module.exports = ShoppingCartItem
