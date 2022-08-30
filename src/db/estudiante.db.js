const { json } = require('body-parser')
const estudianteSchema = require('../models/estudiante.schema')

async function getTodos(){
    registros = await estudianteSchema
    .find()
    .then((data) => {
        
        return data
    })
    .catch((err) => {
        return err
    })
    return registros
}


module.exports = {
    getTodos: getTodos
}