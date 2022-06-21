let usuarioSheet = require('../sheets/usuario.sheet')

module.exports = checkRegitrated = (req, res, next) => {
    const resultado = await usuarioSheet.getOneByEmail(req.user.email)
    if (resultado) {
        console.log("Registrado? x Sí: ",resultado)
        return next()
    }
    console.log("Registrado? x No: ", resultado)
    res.redirect("/usuarioAlta")
  }
