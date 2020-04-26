const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.session.passport.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error('Access Denied!')
    next(error)
  }
}

const isCurrentUserMiddleware = (req, res, next) => {
  const currentUser = req.session.passport.user
  if (currentUser === req.body.userId) {
    next()
  } else {
    const error = new Error('Access Denied!')
    next(error)
  }
}

module.exports = {
  isAdminMiddleware,
  isCurrentUserMiddleware,
}
