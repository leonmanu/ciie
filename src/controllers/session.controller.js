let sheetUsuario = require('../sheets/usuario.sheet')

const siExisteUsuario = async (req, res) => {
    registros = await cursoSheet.get()
    res.render('pages/index', {registros})
}


module.exports = {
    siExisteUsuario : siExisteUsuario
} 