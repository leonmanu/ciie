const { GoogleSpreadsheetRow } = require('google-spreadsheet')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let googleId = "11qQmgCDP1yTlF1ccOhOMKhXVe23SxoWBOYPnCs7-X8U"
let documento = new GoogleSpreadsheet(googleId)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsById[1487805616]
    return documento
}

async function get(){
    await obtenercredenciales()
    const registros =  await sheet.getRows()
    return registros
    
}

module.exports = {
    get:get
}