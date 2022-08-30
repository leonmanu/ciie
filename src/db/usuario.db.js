const { json } = require('body-parser')
const usuarioSchema = require('../models/usuario.schema')
const cargoSchema = require('../models/cargo.schema')
const rolSchema = require('../models/rol.schema')


async function getTodos(){
    var registros = usuarioSchema
    .find()
    .populate(
        {
            path: 'cargo',
            model: cargoSchema,
            populate: {
                path: 'rol',
                model: rolSchema
              } 
        }
    )
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