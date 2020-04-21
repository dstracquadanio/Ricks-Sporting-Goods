'use strict'

const db = require('../server/db')
const {User, Item, ShoppingCartItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
  ])

  const items = await Promise.all([
    Item.create({
      name: 'basketball hoop',
      price: 10.0,
      quantity: 9,
      sport: 'basketball',
    }),
    Item.create({
      name: 'football helmet',
      price: 30.0,
      quantity: 5,
      imageUrl:
        'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-football-college.png&w=288&h=288&transparent=true',
      sport: 'football',
    }),
    Item.create({
      name: 'football',
      price: 25.0,
      quantity: 2,
      imageUrl:
        'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-football-college.png&w=288&h=288&transparent=true',
      sport: 'football',
    }),
    Item.create({
      name: 'basketball',
      price: 5.0,
      quantity: 4,
      sport: 'football',
    }),
  ])

  const shoppingCartItems = await Promise.all([
    ShoppingCartItem.create({
      id: 1,
      name: 'basketball hoop',
      price: 10.0,
      quantity: 2,
      sport: 'basketball',
      userId: 1,
    }),
    ShoppingCartItem.create({
      id: 3,
      name: 'football',
      price: 25.0,
      quantity: 1,
      imageUrl:
        'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-football-college.png&w=288&h=288&transparent=true',
      sport: 'football',
      userId: 1,
    }),
    ShoppingCartItem.create({
      id: 2,
      name: 'football helmet',
      price: 30.0,
      quantity: 1,
      imageUrl:
        'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-football-college.png&w=288&h=288&transparent=true',
      sport: 'football',
      userId: 1,
    }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${items.length} users`)
  console.log(`seeded ${shoppingCartItems.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
