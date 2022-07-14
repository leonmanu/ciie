const req = require('express/lib/request')
const { head } = require('request')
const estudianteSheet =  require("../sheets/estudiante.sheet")
const estudianteCursoSheet =require("../sheets/estudianteCurso.sheet")
const cursoService = require('./curso.service')
const estudianteService = require('./estudiante.service')
const utilidadesService = require('./utilidades.service')

async function putUno(objeto){
    const curso = await cursoService.getPorId(objeto.curso)
    const registro =  await this.getUno(objeto.rowId)
    registro.estudianteNombre = null
    registro.cursoClave = null
    const registroNuevo = registro
    registro.fechaBaja = objeto.fechaBaja
    
    if (objeto.motivoBaja == 1 || objeto.motivoBaja == 3) {
        const ultimo = await this.getUltimo()
        
        registro.observacion = 'Pasó a ' + curso.clave
        
        await registro.save()

        registroNuevo.idEstudianteCurso = (parseInt(ultimo.idEstudianteCurso)+1).toString()
        registroNuevo.curso = objeto.curso
        registroNuevo.estudianteNombre = null
        registroNuevo.cursoClave = null
        registroNuevo.fechaAlta = objeto.fechaBaja
        registroNuevo.fechaBaja = null
        registroNuevo.observacion = null
        
        const objetoCreado = await this.post(registroNuevo)
        console.log("NUEVO:::::::: ", objetoCreado)
      } else {
        if (objeto.motivoBaja == 2) {
            registro.observacion = 'Salió a otra escuela'
        } else {
            registro.observacion = ''
        }
        registro.save()
      }
    
    // console.log("Resultado:: ", registro)
    // //const resultadoJson = await utilidadesService.convertToJson(resultado)
    // console.log("Objeto rowId: "+objeto.rowId)
    // console.log("Objeto fechaBaja: "+objeto.fechaBaja)
    // console.log("Objeto motivoBaja: "+objeto.motivoBaja)
    // console.log("Objeto curso: "+objeto.curso)
    
    return curso.clave
}


async function getUno(rowId){
    const registros =  await estudianteCursoSheet.get()
    const resultado = registros.filter(row => row.idEstudianteCurso === rowId)
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
    const objetoCreado =  await estudianteCursoSheet.post(objeto)

    return objetoCreado
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

    const estudianteCursoNuevo = await this.post(estudianteCurso)
    console.log("NUEVO:::::::: ", estudianteCursoNuevo)
    return estudianteCursoNuevo
}

module.exports = {
    getUno: getUno,
    putUno: putUno,
    getUltimo: getUltimo,
    post: post,
    postEstudianteCurso: postEstudianteCurso
} 