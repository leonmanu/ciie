let sheet = require('../sheets/estudiante.sheet')
let cursoSheet = require('../sheets/curso.sheet')
const estudianteService = require('../services/estudiante.service')
const estudianteSchema = require('../models/estudiante.schema')
const cursoService = require('../services/curso.service')
const estudianteCursoService = require('../services/estudianteCurso.service')



const get = async (req, res) => {
   // registros = await cursoSheet.get()
   if (req.user) {
    res.render('pages/index', {user: req.user._json})
   } else {
    res.render('pages/index', {user: null})
   }
}

const getTodos = async (req, res) => {
    registros = await estudianteService.getTodosDb()
    
    await res.render('pages/estudiante/estudiantesTodos', registros)
} 

const getPorCursoAsignatura = async (req,res) =>{
    registros = await estudianteService.getPorCursoAsignatura(req,res)
    //console.log("ESTUDIANTE_CONTROLLER -> GetPorCurso: ", registros)
    res.render('pages/estudiante/estudiantesTodos', {user: req.user._json, registros})
}

//acá consultamos al service por id de estudiante y abrimos la vista Editar
const getPorId = async (req, res) => {
    registro = await estudianteService.getUno(req.params.id)
    estudiante = registro
    //console.log("Estudiante:: ", estudiante)
    res.render('pages/estudiante/estudianteEditar', {estudiante, user: req.user._json})
}

const getTodosLista = async (req, res) => {
    const estudiantesArray = []
    const cursos = await cursoService.get()
    const estudiantes = await estudianteService.get()
    const estudianteCursos = await estudianteCursoService.get()
    await estudiantes.forEach(estudiante=>{
        estudianteCursos.forEach(estudianteCurso=>{
            if (estudianteCurso.estudiante == estudiante.id && estudianteCurso.fechaBaja == null) {
                estudiantesArray.push({estudiante: estudiante,estudianteCurso: estudianteCurso})
            }
        })
    })
   // console.log("estudianteCursos: ", estudiantesArray[0])

    res.render("pages/estudiante/todosLista", {user: req.user, estudiantesArray,cursos})
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
    getTodos: getTodos,
    getOne : getOne,
    getInforme: getInforme,
    pintarForm : pintarForm,
    post : post,
    put : put,
    getPorCursoAsignatura: getPorCursoAsignatura,
    getPorId: getPorId,
    getTodosLista: getTodosLista
} 