const req = require('express/lib/request')
const estudianteService = require('../services/estudiante.service')
const asignaturaService = require('../services/asignatura.service')
const cursoService = require('../services/curso.service')
const calificacionService = require('../services/calificacion.service')
const calificacionCodigoService = require('../services/calificacionCodigo.service')
const estudianteCursoService = require('../services/estudianteCurso.service')
const utilidadesService = require('../services/utilidades.service')
const cursoAsignaturaService = require('../services/cursoAsignatura.service')

const getCursoYAsignatura = async (req, res) => {
    const curso = await cursoService.getPorClave(req.params.curso)
    const asignatura = await asignaturaService.getPorId(req.params.asignatura)
    const estudiantes = await estudianteService.getPorIdCurso(curso.idCurso)
    const calificaciones = await calificacionService.getEstudiantePorAsignatura(req.params.asignatura, req.params.curso)
    const calificacionCodigos = await calificacionCodigoService.getTodo()

    res.render('pages/estudiante/calificacion', {user: req.user._json, curso, asignatura, estudiantes, calificaciones, calificacionCodigos})
}

const getCursoAsignaturaInforme = async (req, res) => {
    const curso = await cursoService.getPorClave(req.params.curso)
    const asignatura = await asignaturaService.getPorId(req.params.asignatura)
    const estudiantesPorCurso = await estudianteService.getPorCurso(req.params.curso)
    const estudiantesPorCalificaciones = await calificacionService.getEstudiantePorAsignatura(req.params.asignatura, req.params.curso)
    const calificacionCodigos = await calificacionCodigoService.getTodo()
    console.log("CURSO <<<<<<==>>>>>> ", curso)

    res.render('pages/estudiante/calificacionInforme', {user: req.user._json, curso, asignatura, estudiantesPorCurso, estudiantesPorCalificaciones, calificacionCodigos})
}

const getEstudianteValoracion = async (req, res) => {// Inconcluso
    const asignatura = await asignaturaService.getPorId(req.params.asignatura)
    const estudiantesPorCurso = await estudianteService.getPorCurso(req.params.curso)
    const estudiantesPorCalificaciones = await calificacionService.getEstudiantePorAsignatura(req.params.asignatura, req.params.curso)
    const calificacionCodigos = await calificacionCodigoService.getTodo()
    console.log("CURSO <<<<<<==>>>>>> ", curso)

    res.render('pages/estudiante/calificacionInforme', {user: req.user._json, curso, asignatura, estudiantesPorCurso, estudiantesPorCalificaciones, calificacionCodigos})
}

const getEstudiantePorAsignatura = async (req, res) => {
    console.log(`Curso: ${req.body.curso} Asignatura: ${req.body.idAsignatura}`)
    const registros = await estudianteService.getPorCurso(req.params.curso)
    const asignatura = await asignaturaService.getPorId(req.params.idAsignatura)
    const resultado = []
    console.log("EstudianteRegistro: ", registros)
    await registros.forEach(async registro => {
        const estudiante = await estudianteService.getUno(registro.estudiante)
        console.log("estudiante: ", estudiante)
        resultado.push(estudiante)
    } )
    // await registros.forEach( registro => {
    //     estudiante = calificacionService.getEstudiantePorAsignatura(registro.estudiante, req.body.idAsignatura)
    //     if(estudiante){
            
    //         resultado.push(estudiante)
    //         console.log("controller.Calificacion entró", estudiante)
    //     }else{
    //         resultado.push(registro)
    //     }
           
    // })

    console.log("controller.Calificacion entró")

    res.send(resultado)
}

const getPorCursoAsignatura = async (req, res) => {
    const asignatura = req.params.asignatura.toString()
    const clave = req.params.clave
    const calificiones = await calificacionService.getPorCursoAsignaturaOrden(asignatura, clave)
    console.log("CALIFACAS--->", calificiones)

    res.render('pages/asignatura/asignaturaCalificacion', {user: req.user._json, calificiones, clave})
}

const getInformesPorCurso = async (req, res) => {
    const clave = req.params.clave
    const calificiones = await calificacionService.getPorCursoAsignaturaOrden(asignatura, clave)
    console.log("CALIFACAS--->", calificiones)

    res.render('pages/asignatura/asignaturaCalificacion', {user: req.user._json, calificiones, clave})
}

const postCalificacion = async (req, res) => {
    jsonStringfy = req.body.arrayJson
    //jsonParse = JSON.parse(jsonStringfy)
    
    resultado = await calificacionService.postArray(jsonStringfy)
    //resultadoJson = await utilidadesService.convertToJson(resultado)
    //console.log("Resultados ")
    res.send(resultado.toString())
}

//-------------esta servía
// const postCalificacion = async (req, res) => {
//     const calificacion = await calificacionService.postCalificacion(req)
//     console.log("Calificción == ", calificacion)

//     res.send(calificacion)
// }

const getPorDni = async (req, res) => {//cambiar nombre de función
    const dni = req.query.dni

    //* calificacionService.getPorDni(dni) debería llamarse 'getPorEstudianteCursoCLectivo' o algo así
    //* debería estar dento de get EstudianteCurso o estudianteService
    //* debe devolver un sólo registro ya que solo debería haber una sola posiblidad estudiante-cLectivo
    
    const estudiante = await estudianteService.getPorDni(dni)
    const estudinateCurso = await estudianteCursoService.getUnoPorIdEstudiante(estudiante.id)
    const curso = await cursoService.getPorId(estudinateCurso.curso)
    const asignaturas = await asignaturaService.getPorIdCurso(curso.idCurso)
    const registros = await calificacionService.getCrudaPorIdEstudiante(estudiante.id)

    const user = null
    try{
        user = req.user._json
    } catch{
        console.log("No se inició sesión")
    }
    res.render('pages/boletin/boletin', {user, asignaturas, registros, estudiante, curso})
}

const getBoletinesPorCurso = async (req, res) => {//getBoletines PorCurso Este reemplaza a getBoletines() de curso.controller
    const clave = req.params.clave
    const curso = await cursoService.getPorClave(clave)
    const estudiantes = await estudianteService.getPorIdCurso(curso.idCurso)
    const calificaciones = await calificacionService.get()
    const asignaturas = await asignaturaService.getPorIdCurso(curso.idCurso)
    console.log("califacas: ", calificaciones)
    res.render("pages/boletin/boletinesCurso", {user: req.user, curso, estudiantes, calificaciones, asignaturas})
}

module.exports = {
    getEstudiantePorAsignatura_controller: getEstudiantePorAsignatura,
    getCursoYAsignatura_controller :getCursoYAsignatura,
    postCalificacion_controller: postCalificacion,
    getCursoAsignaturaInforme: getCursoAsignaturaInforme,
    getPorCursoAsignatura:getPorCursoAsignatura,
    getEstudianteValoracion:getEstudianteValoracion,
    getPorDni:getPorDni,
    getBoletinesPorCurso: getBoletinesPorCurso,
} 