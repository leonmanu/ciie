module.exports = checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("req.user.displayName ",req.user.displayName)
        console.log("isAuthenticated -> ", req.isAuthenticated())
        return next()
    }
    console.log("isAuthenticated -> ", req.isAuthenticated())
    res.redirect("/")
  }