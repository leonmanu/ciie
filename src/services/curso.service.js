const req = require('express/lib/request')
const cursoSheet =  require("../sheets/curso.sheet")
const utilidadesService = require('./utilidades.service')

const get = async () => {
    registros = await cursoSheet.getTodos()
    
    return registros
}

const getTodos = async (req, res) => {
    registros = await cursoSheet.getTodos()
    resultado = []
    await registros.forEach( registro => {
        resultado.push({ idCurso: registro.idCurso, clave: registro.clave, turnoNombre: registro.turnoNombre})// esto me parece que está mal
    })
    return resultado
}

//voy a crear otro getTodos()  para mejorar la consulta

const getCursosTodos = async () => { //debería pasar la escuela por parámetro y filtrar los cursos de dicha escuela
    registros = await cursoSheet.getTodos()

    const resultadoJson = await utilidadesService.convertToJson(registros)
    //console.log("Cursos TODOS: ", resultadoJson)
    return resultadoJson
}

// const getPorClave = async (claveCurso) => {
//     const registros = await cursoSheet.getTodos()
//     const resultados = await registros.filter(row => row.clave === claveCurso)
//     const resultadoJson = await utilidadesService.convertToJson(resultados)
//     return resultadoJson[0]
// }

const getPorClave = async (clave) => { //tiene que quedar, es el nuevo
    const grado = clave.substr(0,1)
    const division = clave.substr(2,1)
    const registros = await cursoSheet.getTodos()
    const resultados = await registros.filter(row => row.grado == grado && row.division == division)
    //const resultadoJson = await utilidadesService.convertToJson(resultados)
    return resultados[0]
}

const getPorId = async (idCurso) => {
    const registros = await cursoSheet.getTodos()
    const resultados = await registros.filter(row => row.idCurso === idCurso)
    const resultadoJson = await utilidadesService.convertToJson(resultados)
    return resultadoJson[0]
}

module.exports = {
    get: get,
    getTodos : getTodos,
    getCursosTodos: getCursosTodos,
    getPorClave: getPorClave,
    getPorId:getPorId,
} 