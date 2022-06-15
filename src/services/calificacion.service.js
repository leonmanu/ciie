const req = require('express/lib/request')
const calificacionSheet =  require("../sheets/calificacion.sheet")

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
    console.log("getSiExiteEstudianteAsignatura", resultado)
    return resultado
}

// const getEstudiantePorAsignatura = async (estudiante, asignatura) => {
//     console.log("getSiExiteEstudianteAsignatura")
//     registros = calificacionSheet.getCalificacion()
//     resultado = registros.filter( row => row.estudiante === estudiante && row.asignatura === asignatura)
//     return resultado
// }

const postCalificacion = async (req, res) => {
    console.log("calificacion.service:: ",req.body.arr)
    const objetoInterface = {
        estudiante: req.body.arr.row_id,
        valoracion1: req.body.arr.valoracion1,
        informe1: req.body.arr.informe1,
        asignatura: req.body.arr.asignatura,
    }
    const resultado = await calificacionSheet.postCalificacion(objetoInterface)
    return resultado
}




module.exports = {
    postCalificacion: postCalificacion,
    getEstudiantePorAsignatura: getEstudiantePorAsignatura
    // getCargosTodos : getCargosTodos,
    // getPorDocente: getPorDocente,
    
    // getPorDocenteCargoCurso: getPorDocenteCargoCurso
} 