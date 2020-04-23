'use strict'

const db = require('../server/db')
const {User, Item, Cart} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const [cody, murphy, admin] = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({
      email: 'admin@email.com',
      password: 'admin',
      name: 'Big Admin Man',
      isAdmin: true,
    }),
  ])

  const [
    hoop,
    helmet,
    football,
    basketball,
    glove,
    cam_photo,
    anderson_mouse,
    darren_basketball,
    fieldgoal_posts,
    monitor,
    home_plate,
  ] = await Promise.all([
    Item.create({
      name: 'Basketball Hoop',
      price: 10.0,
      quantity: 9,
      imageUrl:
        'https://www.anthem-sports.com/media/extendware/ewimageopt/media/inline/b0/c/bison-pro-tech-competition-breakaway-basketball-goal-ba35--eeb.jpg',
      sport: 'basketball',
    }),
    Item.create({
      name: 'Football Helmet',
      price: 30.0,
      quantity: 5,
      imageUrl:
        'https://cdn.vox-cdn.com/thumbor/Ck7EIuSSZBpSn7QIkFZHpAhGuS0=/26x136:1026x803/1200x800/filters:focal(26x136:1026x803)/cdn.vox-cdn.com/uploads/chorus_image/image/30673345/speedflex_quarter_view_lr__2_.0.jpg',
      sport: 'football',
    }),
    Item.create({
      name: 'Football',
      price: 25.0,
      quantity: 2,
      imageUrl:
        'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-football-college.png&w=288&h=288&transparent=true',
      sport: 'football',
    }),
    Item.create({
      name: 'Basketball',
      price: 30.0,
      quantity: 4,
      sport: 'basketball',
    }),
    Item.create({
      name: 'Baseball Glove',
      price: 40.0,
      quantity: 7,
      imageUrl:
        'https://target.scene7.com/is/image/Target/GUEST_6c6b3561-8fbb-4019-8e2d-7a7eb00ee749?wid=325&hei=325&qlt=80&fmt=webp',
      sport: 'baseball',
    }),
    Item.create({
      name: 'Signed Cam Ratliff Photo',
      price: 1000.0,
      quantity: 1,
      imageUrl:
        'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png',
      sport: 'basketball',
    }),
    Item.create({
      name: 'Signed Anderson Chan mouse',
      price: 1000.0,
      quantity: 1,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/61hzuoXwjqL._AC_SX466_.jpg',
      sport: 'eSports',
    }),
    Item.create({
      name: 'Signed Darren Hu Basketball',
      price: 1000.0,
      quantity: 1,
      imageUrl:
        'https://bloximages.newyork1.vip.townnews.com/swnewsmedia.com/content/tncms/assets/v3/editorial/0/f6/0f69af9a-968e-5723-b868-ac1412842cf3/58b4414eb0a84.image.png?resize=400%2C319',
      sport: 'basketball',
    }),
    Item.create({
      name: 'Field Goal Posts',
      price: 2000.0,
      quantity: 1,
      imageUrl:
        'https://www.rogersathletic.com/media/3425/410353_main_stadium_pro_portable_goal_post.jpg',
      sport: 'football',
    }),
    Item.create({
      name: 'Computer Monitor',
      price: 80.0,
      quantity: 4,
      imageUrl:
        'https://www.staples-3p.com/s7/is/image/Staples/m001440649_sc7?wid=512&hei=512',
      sport: 'eSports',
    }),
    Item.create({
      name: 'Home Plate',
      price: 100.0,
      quantity: 2,
      imageUrl:
        'https://previews.123rf.com/images/toddtaulman/toddtaulman1511/toddtaulman151100007/48690694-baseball-home-plate-with-dirt-and-chalk-lines.jpg',
      sport: 'baseball',
    }),
  ])
  const Carts = await Promise.all([
    Cart.create({
      name: 'basketball hoop',
      price: 10.0,
      quantity: 2,
      imageUrl:
        'https://www.anthem-sports.com/media/extendware/ewimageopt/media/inline/b0/c/bison-pro-tech-competition-breakaway-basketball-goal-ba35--eeb.jpg',
      sport: 'basketball',
      itemId: hoop.id,
      userId: cody.id,
    }),
    Cart.create({
      name: 'football helmet',
      price: 30.0,
      quantity: 1,
      imageUrl:
        'https://cdn.vox-cdn.com/thumbor/Ck7EIuSSZBpSn7QIkFZHpAhGuS0=/26x136:1026x803/1200x800/filters:focal(26x136:1026x803)/cdn.vox-cdn.com/uploads/chorus_image/image/30673345/speedflex_quarter_view_lr__2_.0.jpg',
      sport: 'football',
      itemId: helmet.id,
      userId: cody.id,
    }),
    Cart.create({
      name: 'football',
      price: 25.0,
      quantity: 1,
      imageUrl:
        'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-football-college.png&w=288&h=288&transparent=true',
      sport: 'football',
      itemId: football.id,
      userId: murphy.id,
    }),
    Cart.create({
      name: 'basketball',
      price: 30.0,
      quantity: 2,
      sport: 'basketball',
      itemId: basketball.id,
      userId: murphy.id,
    }),
    Cart.create({
      name: 'Home Plate',
      price: 100.0,
      quantity: 2,
      sport: 'baseball',
      itemId: home_plate.id,
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
