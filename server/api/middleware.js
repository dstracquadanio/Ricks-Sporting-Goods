const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user
  console.log('USER INFO:', req.user.isAdmin)
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error('Access Denied! Not an Admin!')
    next(error)
  }
}

const isCurrentUserMiddleware = (req, res, next) => {
  const currentUser = req.session.passport.user
  if (currentUser === req.currentUser.dataValues.id) {
    next()
  } else {
    const error = new Error('Access Denied! Not current User!')
    next(error)
  }
}

module.exports = {
  isAdminMiddleware,
  isCurrentUserMiddleware,
}
