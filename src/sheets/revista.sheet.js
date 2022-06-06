const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let googleId = "1d-cWeBzIPIdpzgZUpYs_zlnllEkERVdEqRfgJ31DO3U"
let documento = new GoogleSpreadsheet(googleId)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsById[1219315028]
    return documento
}

async function revistaGetTodos(){
    await obtenercredenciales()
    
    const registros =  await sheet.getRows()
    return registros
}

module.exports = {
    revistaGetTodos: revistaGetTodos
}