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


async function getPorCursoAsignatura(req){
    console.log("getPorCurso: ", req.params.curso)
    const registros =  await estudianteSheet.getTodo()
    const resultados = registros.filter(row => row.curso === req.params.curso && row.idAsignatura == req.params.asignatura )

    return resultados
}

async function getPorCurso(curso){
    console.log("CURSO::: >> ", curso)
    const registros =  await estudianteSheet.getTodoPorCurso()
    const resultados = await registros.filter(row => row.cursoClave === curso)
    const resultadoJson = await utilidadesService.convertToJson(resultados)
    //console.log('GET-POR-CURSO_-_-_-> ',resultadoJson)
    return resultadoJson
    
}
module.exports = {
    getTodos : getTodos,
    getPorCursoAsignatura: getPorCursoAsignatura,
    getPorCurso:getPorCurso
} 