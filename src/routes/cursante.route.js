const {Router} = require('express')
const passport = require('passport')
const router = Router()

const { get,
    getPorCapacitacion,
    getPorCapacitacionCursantesDatos,
    putArray,
    getListaAsistenciaTodas,
    getListaAsistencia,
    getConstancia,
    getConstanciaPorCursante,
    getActaVolante,
    getCertificado,
    getCertificadoBlanco,
    getActaRetiro
} = require('../controllers/cursante.controller')
var sessionMiddelware = require('../middelware/session.middelware')

router
    .get('/', get)
    .get('/listaAsistencia', getListaAsistenciaTodas)
    .get('/listaAsistencia/:campoClave', getListaAsistencia)
    .get('/actaVolante/:campoClave?', getActaVolante)
    .get('/constancia/:campoClave/:dni?', getConstancia)
    .get('/certificado', getCertificado)
    .post('/certificado', getCertificado)
    .get('/certificado/actaRetiro', getActaRetiro)
    .post('/certificado/actaRetiro', getActaRetiro)
    //.get('/constancia/:campoClave/:dni', getConstanciaPorCursante)
    .get('/:campoClave', getPorCapacitacion)
    .get('/:campoClave/cursantesDatos', getPorCapacitacionCursantesDatos)
    .put('/put', putArray)
 
module.exports = router 