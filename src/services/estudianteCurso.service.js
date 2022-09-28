const req = require('express/lib/request')
const { head } = require('request')
const estudianteSheet =  require("../sheets/estudiante.sheet")
const estudianteCursoSheet =require("../sheets/estudianteCurso.sheet")
const cursoService = require('./curso.service')
const estudianteService = require('./estudiante.service')
const utilidadesService = require('./utilidades.service')

async function get(){
    const registros =  await estudianteCursoSheet.get()

    return registros
}

async function putUno(objeto){
    const registro =  await this.getUno(objeto.rowId)
    const curso = registro.cursoClave
    let objetoEliminado
    registro.estudianteNombre = null
    registro.cursoClave = null
    const registroNuevo = registro
    registro.fechaBaja = objeto.fechaBaja
    
    if (objeto.motivoBaja == 1 || objeto.motivoBaja == 3) {
        const ultimo = await this.getUltimo()
        
        registro.observacion = 'Pasó a ' + curso.clave
        
        await registro.save()
        console.log("Después del save()")

        registroNuevo.idEstudianteCurso = (parseInt(ultimo.idEstudianteCurso)+1).toString()
        registroNuevo.curso = objeto.curso
        registroNuevo.estudianteNombre = null
        registroNuevo.cursoClave = null
        registroNuevo.fechaAlta = objeto.fechaBaja
        registroNuevo.fechaBaja = null
        registroNuevo.observacion = null
        
        const respuesta = await this.post(registroNuevo)
        console.log("NUEVO:::::::: ", respuesta)
      } else {
        if (objeto.motivoBaja == 2) {
            registro.observacion = 'Salió a otra escuela'
        } else {
            registro.observacion = ''
        }
        objetoEliminado = await registro.save()
        console.log("Después del save() callback: ", registro.estudianteNombre)
      }
    
    
    return {msj: 'Se eliminó el estudianteCurso: '+registro.estudianteNombre}
}

async function getPorIdCurso(idCurso){//devuelve todos registros por id de curso
    const registros = await estudianteCursoSheet.get()
    const filtrados = registros.filter(row => row.curso == idCurso)
    return filtrados
}

async function getUno(rowId){
    const registros =  await estudianteCursoSheet.get()
    const resultado = registros.filter(row => row._rowNumber === rowId)
    //const resultadoJson = await utilidadesService.convertToJson(resultado)
    //console.log(resultadoJson[0])

    return resultado[0]
}

async function getUnoPorIdEstudiante(id){
    const registros =  await estudianteCursoSheet.get()
    const resultado = registros.filter(row => row.idEstudianteCurso === id)
    //const resultadoJson = await utilidadesService.convertToJson(resultado)
    //console.log(resultadoJson[0])

    return resultado[0]
}

async function getUltimo(){
    const registros =  await estudianteCursoSheet.get()
    const indice = registros.length
    const resultado = registros[indice - 1]

    return resultado
}

async function post(objeto){
    const respuesta =  await estudianteCursoSheet.post(objeto)

    return respuesta
}

async function postEstudianteCurso(objeto){
    const estudianteNuevo =  await estudianteService.post(objeto)
    const curso = await cursoService.getPorClave(objeto.curso)

    const ultimo = await this.getUltimo()
    const idNuevo = (parseInt(ultimo.idEstudianteCurso)+1).toString()

    const estudianteCurso = {
        idEstudianteCurso: idNuevo,
        estudiante: estudianteNuevo.id,
        curso: curso.idCurso
    }

    const respuesta = await this.post(estudianteCurso)
    console.log("NUEVO::::::::  ", respuesta)
    console.log("Mensaje::::::::  ", respuesta)
    return respuesta
}

module.exports = {
    getUno: getUno,
    putUno: putUno,
    getUltimo: getUltimo,
    post: post,
    postEstudianteCurso: postEstudianteCurso,
    getUnoPorIdEstudiante:getUnoPorIdEstudiante,
    getPorIdCurso:getPorIdCurso,
    get:get,
} 