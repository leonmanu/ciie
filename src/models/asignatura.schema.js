const mongoose = require('mongoose')
const { Schema } = mongoose;

const cargoSchema = new Schema({
    id: {
        type: String
    },
    rol: {
        type: String
    }
})

module.exports = mongoose.model('cargo',cargoSchema)