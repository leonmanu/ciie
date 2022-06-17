const req = require('express/lib/request')
const { head } = require('request')
const estudianteSheet =  require("../sheets/estudiante.sheet")
const utilidadesService = require('./utilidades.service')



const getTodos = async (req, res) => {
    registros = await estudianteSheet.getTodoEstudiante_sheet()
    resultado = []
    await registros.forEach( registro => {
        resultado.push({ 
            id: registro.id,
            nombre: registro.nombre,
            codigo: registro.codigo,
            jerarquia: registro.jerarqui
        })
    })
    return resultado
}

async function getUno(id){
    const registros =  await estudianteSheet.getTodo()
    const resultado = registros.filter(row => row.id == id)
    const resultadoJson = await utilidadesService.convertToJson(resultado)
    //console.log(resultadoJson[0])

    return resultadoJson[0]
    
}

async function getPorCursoAsignatura(req){
    console.log("getPorCurso: ", req.params.curso)
    const registros =  await estudianteSheet.getTodo()
    const resultados = registros.filter(row => row.curso === req.params.curso && row.idAsignatura == req.params.asignatura )

    return resultados
}

async function getPorCurso(curso){
    const registros =  await estudianteSheet.getTodoPorCurso()
    const resultados = await registros.filter(row => row.cursoClave === curso)
    const resultadoJson = await utilidadesService.convertToJson(resultados)
    //console.log('GET-POR-CURSO_-_-_-> ',resultadoJson)
    return resultadoJson
    
}
module.exports = {
    getTodos : getTodos,
    getUno: getUno,
    getPorCursoAsignatura: getPorCursoAsignatura,
    getPorCurso:getPorCurso
} 