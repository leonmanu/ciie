const mongoose = require('mongoose')
const { Schema } = mongoose;

const cargoSchema = new Schema({
    id: {
        type: String
    },
    cupof: {
        type: String
    },
    rol: {
        type: Schema.Types.ObjectId, ref: 'rol'
    },
    curso: {
        type: Schema.Types.ObjectId, ref: 'curso'
    }
})

module.exports = mongoose.model('cargo',cargoSchema)