module.exports = checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.user.additionalValue = "Valor adicional";
        console.log("req.user.additionalValue ", req.user.additionalValue);
        console.log("req.user.displayName ",req.user.displayName)
        console.log("isAuthenticated -> ", req.isAuthenticated())
        return next()
    }
    console.log("isAuthenticated -> ", req.isAuthenticated())
    res.redirect("/")
  }