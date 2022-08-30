const mongoose = require('mongoose')
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    idGoogle: {
        type: String
    },
    email: {
        type: String
    },
    apellido: {
        type: String
    },
    nombre: {
        type: String
    },
    cuil: {
        type: String
    },
    fechanac: {
        type: Date
    },
    cargo: [{
        type: Schema.Types.ObjectId,
        ref: 'cargo'
    }]
})

module.exports = mongoose.model('usuario',usuarioSchema)