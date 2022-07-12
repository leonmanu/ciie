const req = require('express/lib/request')
const estudianteService = require('../services/estudiante.service')
const asignaturaService = require('../services/asignatura.service')
const cursoService = require('../services/curso.service')
const calificacionService = require('../services/calificacion.service')
const calificacionCodigoService = require('../services/calificacionCodigo.service')

const getCursoYAsignatura = async (req, res) => {
    const curso = await cursoService.getPorClave(req.params.curso)
    const asignatura = await asignaturaService.getPorId(req.params.asignatura)
    const estudiantesPorCurso = await estudianteService.getPorCurso(req.params.curso)
    const estudiantesPorCalificaciones = await calificacionService.getEstudiantePorAsignatura(req.params.asignatura, req.params.curso)
    const calificacionCodigos = await calificacionCodigoService.getTodo()
    console.log("CURSO == ", curso)

    res.render('pages/estudiante/calificacion', {user: req.user._json, curso, asignatura, estudiantesPorCurso, estudiantesPorCalificaciones, calificacionCodigos})
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

const postCalificacion = async (req, res) => {
    jsonStringfy = JSON.stringify(req.body.arr)
    jsonParse = JSON.parse(jsonStringfy)
    console.log("Json: ", jsonParse)
    
    resultado = await calificacionService.postCalificacion(jsonParse)

    return "Hola"
}

//-------------esta servía
// const postCalificacion = async (req, res) => {
//     const calificacion = await calificacionService.postCalificacion(req)
//     console.log("Calificción == ", calificacion)

//     res.send(calificacion)
// }

module.exports = {
    getEstudiantePorAsignatura_controller: getEstudiantePorAsignatura,
    getCursoYAsignatura_controller :getCursoYAsignatura,
    postCalificacion_controller: postCalificacion,
    getCursoAsignaturaInforme: getCursoAsignaturaInforme,
    getPorCursoAsignatura:getPorCursoAsignatura,
} 