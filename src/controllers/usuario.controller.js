const usuarioService = require('../services/usuario.service')
let usuarioSheet = require('../sheets/usuario.sheet')

const getTodos = async (req, res) => {
    registros = await usuarioService.getTodosDb()
    
    await res.render('pages/usuario/usuariosTodos', registros)
}

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
    if(req.user._json.domain === 'abc.gob.ar'){
        if(req.user.email == resultado.email){
            res.render('pages/index', {user: req.user._json})
       } else {
            res.redirect("/usuarioAlta")
       }
    }
     else {
        req.logout(function(err) {
            if (err) { return next(err) }
            req.app.locals.usuario = null
            res.redirect('/')
          })
    }
    
    
   }



const getOneByEmail = async (email, req, res) => {
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
    getTodos: getTodos,
    getOne : getOne,
    post: post,
    getOneByEmail: getOneByEmail,
    siExisteUsuario: siExisteUsuario
} 