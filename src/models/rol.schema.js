const mongoose = require('mongoose')
const { Schema } = mongoose;

const rolSchema = new Schema({
    id: {
        type: String
    },
    nombre: {
        type: String
    },
    nombre: {
        type: String
    },
    codigo: {
        type: String
    },
    jerarquia: {
        type: String
    }
})

module.exports = mongoose.model('rol',rolSchema)