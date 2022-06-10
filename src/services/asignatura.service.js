const req = require('express/lib/request')
const asignaturaSheet =  require("../sheets/asignatura.sheet")


const getPorId = async (req) => {
    const registros = await asignaturaSheet.getTodo()
    console.log("asignatura.service getPorId: ", req.params.asignatura)
    const resultado = registros.filter(row => row.idAsignatura === req.params.asignatura)
    console.log("asignatura.service getPorId: ", resultado[0])
    return resultado[0]
}

module.exports = {
    getPorId : getPorId
} 