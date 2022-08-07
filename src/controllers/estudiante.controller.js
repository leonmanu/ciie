let sheet = require('../sheets/estudiante.sheet')
let cursoSheet = require('../sheets/curso.sheet')
const estudianteService = require('../services/estudiante.service')


const get = async (req, res) => {
   // registros = await cursoSheet.get()
   if (req.user) {
    res.render('pages/index', {user: req.user._json})
   } else {
    res.render('pages/index', {user: null})
   }
    
}

const getPorCursoAsignatura = async (req,res) =>{
    registros = await estudianteService.getPorCursoAsignatura(req,res)
    //console.log("ESTUDIANTE_CONTROLLER -> GetPorCurso: ", registros)
    res.render('pages/estudiante/estudianteAsignatura', {user: req.user._json, registros})
}

//acá consultamos al service por id de estudiante y abrimos la vista Editar
const getPorId = async (req, res) => {
    registro = await estudianteService.getUno(req.params.id)
    estudiante = registro
    console.log("Estudiante:: ", estudiante)
    res.render('pages/estudiante/estudianteEditar', {estudiante, user: req.user._json})
}

const getOne = async (req, res) => {
    registros = await cursoSheet.get()
    res.render('pages/index', {registros})
}

const getInforme = async (req, res) => {
    registros = await sheet.get()
    res.render('pages/informe', {registros})
}

const pintarForm = (req, res) => {
    res.render('pages/formulario')
}

const post = (req, res) => {
    sheet.post(req.body)
    res.redirect('/')
}

const put = async (req, res) => {
    var objNuevo = req.body
    var objExistente = await estudianteService.getPorId(objNuevo.id)
    var resultado = await estudianteService.put(objExistente, objNuevo)
    
    res.redirect('back');
}

const del = async (req, res) => {
    registros = await sheet.del()
}



module.exports = {
    get : get,
    getOne : getOne,
    getInforme: getInforme,
    pintarForm : pintarForm,
    post : post,
    put : put,
    getPorCursoAsignatura: getPorCursoAsignatura,
    getPorId: getPorId,
} 