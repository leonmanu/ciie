const req = require('express/lib/request')
const calificacionSheet =  require("../sheets/calificacion.sheet")
const utilidadesService = require('./utilidades.service')

// const getCargosTodos = async (req, res) => {
//     resultado = await cargoSheet.getCargosTodos()
//     return resultado
// }

// const getPorDocente = async (req, res) => {
//     const registros = await cargoSheet.getCargosTodos()
    
//     const resultados = registros.filter(row => row ["idGoogleUsuario"] === req.user.id)
//         registros.map((registro)=>{
//     })
//     //console.log("REQ: ", resultados)
//     return resultados
// }

// const getPorDocenteCargoCurso = async (req, res) => {
//     const registros = await cargoSheet.getCargosTodos()
//     const resultados = registros.filter(row => row ["idGoogleUsuario"] === req.user.id && row.rol === "Pf")
//         registros.map((registro)=>{
//     })
//     //console.log("REQ: ", resultados)
//     return resultados
// }

// * Tengo que agregar el cLectivo

const getEstudiantePorAsignatura = async (asignatura, curso) => {
    
    registros = await calificacionSheet.getCalificacion()
    resultado = await registros.filter( row => row.asignatura === asignatura && row.curso === curso)

    return resultado
}

// const getEstudiantePorAsignatura = async (estudiante, asignatura) => {
//     console.log("getSiExiteEstudianteAsignatura")
//     registros = calificacionSheet.getCalificacion()
//     resultado = registros.filter( row => row.estudiante === estudiante && row.asignatura === asignatura)
//     return resultado
// }

const postCalificacion = async (req, res) => {

    jsonStringfy = JSON.stringify(req.body.arr)
    jsonParse = JSON.parse(jsonStringfy)
    if ( jsonParse.rowNumber > 1) {
        console.log("EXISTE:: ",jsonParse.rowNumber)
        const resultado = await calificacionSheet.putCalificacion(jsonParse)
        return resultado
    } else {
        console.log("NO existe:: ",jsonParse.rowNumber)
        console.log("ESTUDIANTE: ",jsonParse)
        const resultado = await calificacionSheet.postCalificacion(jsonParse)
        return resultado
    }
    //console.log("calificacion.service:: ",jsonParse)
    
    //resultadoJson = utilidadesService.convertToJson(req.body.arr)
    
    
}




module.exports = {
    postCalificacion: postCalificacion,
    getEstudiantePorAsignatura: getEstudiantePorAsignatura
    // getCargosTodos : getCargosTodos,
    // getPorDocente: getPorDocente,
    
    // getPorDocenteCargoCurso: getPorDocenteCargoCurso
} 