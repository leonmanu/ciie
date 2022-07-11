const req = require('express/lib/request')
const { head } = require('request')
const estudianteSheet =  require("../sheets/estudiante.sheet")
const estudianteCursoSheet =require("../sheets/estudianteCurso.sheet")
const cursoService = require('./curso.service')
const utilidadesService = require('./utilidades.service')

async function putUno(objeto){
    const registro =  await this.getUno(objeto.rowId)
    registro.estudianteNombre = null
    registro.cursoClave = null
    registro.fechaBaja = objeto.fechaBaja
    if (objeto.motivoBaja == 1 || objeto.motivoBaja == 3) {
        const curso = await cursoService.getPorId(objeto.curso)
        registro.observacion = 'Pasó a ' + curso.clave
      } else {
        if (objeto.motivoBaja == 2) {
            registro.observacion = 'Salió a otra escuela'
        } else {
            registro.observacion = ''
        }
      }
    registro.save()
    console.log("Resultado:: ", registro)
    //const resultadoJson = await utilidadesService.convertToJson(resultado)
    console.log("Objeto rowId: "+objeto.rowId)
    console.log("Objeto fechaBaja: "+objeto.fechaBaja)
    console.log("Objeto motivoBaja: "+objeto.motivoBaja)
    console.log("Objeto curso: "+objeto.curso)
    return registro
}

async function getUno(rowId){
    const registros =  await estudianteCursoSheet.get()
    const resultado = registros.filter(row => row.idEstudianteCurso === rowId)
    //const resultadoJson = await utilidadesService.convertToJson(resultado)
    //console.log(resultadoJson[0])

    return resultado[0]
}

module.exports = {
    getUno: getUno,
    putUno: putUno,
} 