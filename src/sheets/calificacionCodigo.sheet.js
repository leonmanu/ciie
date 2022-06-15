const req = require('express/lib/request')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let googleId = "1d-cWeBzIPIdpzgZUpYs_zlnllEkERVdEqRfgJ31DO3U"
let documento = new GoogleSpreadsheet(googleId)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsById[818310680]
    return documento
}

async function getTodos(){
    await obtenercredenciales()
    
    const registros =  await sheet.getRows()
    return registros
}


module.exports = {
    getTodos: getTodos
}