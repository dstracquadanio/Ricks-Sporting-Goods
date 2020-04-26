const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.session.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error('Access Denied!')
    error.status(401)
    next(error)
  }
}

const isCurrentUserMiddleware = (req, res, next) => {
  const currentUser = req.session.user
  if (currentUser === req.params.userId) {
    next()
  } else {
    const error = new Error('Access Denies!')
    error.status(401)
    next(error)
  }
}

module.exports = {
  isAdminMiddleware,
  isCurrentUserMiddleware,
}
