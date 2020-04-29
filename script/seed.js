'use strict'

const db = require('../server/db')
const {User, Item, Cart, PurchasedItem} = require('../server/db/models')
const {
  names,
  prices,
  quantities,
  imageUrls,
  sports,
  descriptions,
} = require('./seedInfo')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const [cody, murphy, admin] = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Banks',
      address: '123 Main Street',
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Smith',
    }),
    User.create({
      email: 'admin@email.com',
      password: 'admin',
      firstName: 'Big Admin Man',
      isAdmin: true,
    }),
    User.create({
      email: 'bigdog@email.com',
      password: 'hotdog',
      firstName: 'Joe',
      lastName: 'Shmoe',
      isAdmin: false,
    }),
    User.create({
      email: 'smartdude@email.com',
      password: 'e=mc^2',
      firstName: 'Brian',
      lastName: 'Brains',
      isAdmin: false,
    }),
    User.create({
      email: 'jetsfan@email.com',
      password: 'jetsjetsjets',
      firstName: 'Samantha',
      lastName: 'Clark',
      isAdmin: false,
    }),
    User.create({
      email: 'datguy@email.com',
      password: 'FOOD',
      firstName: 'Guy',
      lastName: 'Fieri',
      isAdmin: false,
    }),
    User.create({
      email: 'materialUIExpert@material.com',
      password: 'materialFTW',
      firstName: 'Andrew',
      lastName: 'Chang',
      isAdmin: true,
    }),
    User.create({
      email: 'bonzai@email.com',
      password: 'yatta',
      firstName: 'Mary',
      lastName: 'Bloom',
      isAdmin: false,
    }),
  ])

  const [hoop, helmet, football, basketball, glove] = await Promise.all(
    names.map((item, i) => {
      return Item.create({
        name: names[i],
        price: prices[i],
        quantity: quantities[i],
        imageUrl: imageUrls[i],
        sport: sports[i],
        description: descriptions[i],
      })
    })
  )

  // let seedingTimes = 7
  // for (let i = 0; i < seedingTimes; i++) {
  //   for (let j = 0; j < names.length; j++) {
  //     Item.create({
  //       name: names[j],
  //       price: prices[j],
  //       quantity: quantities[j],
  //       imageUrl: imageUrls[j],
  //       sport: sports[j],
  //     })
  //   }
  // }

  const Carts = await Promise.all([
    Cart.create({
      name: 'Basketball Hoop',
      price: 10.0,
      quantity: 2,
      imageUrl:
        'https://www.anthem-sports.com/media/extendware/ewimageopt/media/inline/b0/c/bison-pro-tech-competition-breakaway-basketball-goal-ba35--eeb.jpg',
      sport: 'basketball',
      itemId: hoop.id,
      userId: cody.id,
    }),
    Cart.create({
      name: 'Football Helmet',
      price: 30.0,
      quantity: 1,
      imageUrl:
        'https://cdn.vox-cdn.com/thumbor/Ck7EIuSSZBpSn7QIkFZHpAhGuS0=/26x136:1026x803/1200x800/filters:focal(26x136:1026x803)/cdn.vox-cdn.com/uploads/chorus_image/image/30673345/speedflex_quarter_view_lr__2_.0.jpg',
      sport: 'football',
      itemId: helmet.id,
      userId: cody.id,
    }),
    Cart.create({
      name: 'Football',
      price: 25.0,
      quantity: 1,
      imageUrl:
        'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-football-college.png&w=288&h=288&transparent=true',
      sport: 'football',
      itemId: football.id,
      userId: murphy.id,
    }),
    Cart.create({
      name: 'Basketball',
      price: 30.0,
      quantity: 2,
      sport: 'basketball',
      itemId: basketball.id,
      userId: murphy.id,
    }),
    Cart.create({
      name: 'Baseball Glove',
      price: 40.0,
      quantity: 2,
      sport: 'baseball',
      itemId: glove.id,
      userId: admin.id,
    }),
  ])

  console.log(`ITEMS: ${hoop}`)
  // console.log(`seeded ${users.length} users`)
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
