const mongoose = require('mongoose')

const estudianteSchema = mongoose.Schema({
    idNum: {
        type: Number
    },
    apellido: {
        type: String
    },
    nombre: {
        type: String
    },
    dni: {
        type: String
    },
    nacionalidad: {
        type: String
    }
})

module.exports = mongoose.model('estudiante',estudianteSchema)