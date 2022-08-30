const { json } = require('body-parser')
const usuarioSchema = require('../models/usuario.schema')

async function getTodos(){
    registros = usuarioSchema
    .find()
    .populate('cargo')
    .exec()
    .then(docs => {
        return docs
    })
    .catch(err => {
        console.log("Error: ", err)
    });

}


module.exports = {
    getTodos: getTodos
}