let usuarioSheet = require('../sheets/usuario.sheet')


const getOne = async (usuario, req, res) => {
    //console.log("usuario.getOne: ", usuario.usuario.email)
    const resultado = await usuarioSheet.getUsuarioById(usuario.usuario.id)
    console.log("Usuario:: ", resultado)
    return resultado
    //res.render('pages/index', {registros})
    
}

const siExisteUsuario = async (req, res) => {
   
    const resultado = await usuarioSheet.getOneByEmail(req.user.email)
    console.log("USUARIO: ",req.user.email)
    if (req.user.email == resultado.email) {// más adelante filtrar: provider abc.gob.ar
        req.app.locals.usuario = req.user._json
        res.redirect("/")
   } else {        
    res.redirect("/usuarioAlta")
    
   }

    // return resultado
    //res.render('pages/index', {registros})
}

const getOneByEmail = async (email, req, res) => {
    //console.log("usuario.getOne: ", usuario.usuario.email)
    const resultado = await usuarioSheet.getOneByEmail(email)
    console.log("Usuario.controller ", resultado)
    return resultado
    //res.render('pages/index', {registros})
    
}

const fromularioAlta = (req, res) => {
    res.render('pages/usuario/formularioAlta')
}

const post = (req, res) => {
    const resultado = usuarioSheet.post(req)
    res.redirect("/")
}


module.exports = {
    getOne : getOne,
    post: post,
    getOneByEmail: getOneByEmail,
    siExisteUsuario: siExisteUsuario
} 