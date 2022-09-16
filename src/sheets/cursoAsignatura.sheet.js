const { GoogleSpreadsheetRow } = require('google-spreadsheet')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let googleId = "1Pq0bh9zDZXtd1F0kAcikS_NYTquFQWYm5Dsggkkztng"
let documento = new GoogleSpreadsheet(googleId)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsById[1307028253]
    return documento
}

async function getTodo(){
    await obtenercredenciales()

    const registros =  await sheet.getRows()
    return registros
}

async function getAsignaturaCurso(){
    await obtenercredenciales()
    sheet = documento.sheetsById[1307028253]
    const registros =  await sheet.getRows()
    return registros
}

module.exports = {
    getTodo: getTodo,
    getAsignaturaCurso: getAsignaturaCurso,
}