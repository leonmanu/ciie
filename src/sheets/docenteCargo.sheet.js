const req = require('express/lib/request')
const { GoogleSpreadsheetRow } = require('google-spreadsheet')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let googleId = "1d-cWeBzIPIdpzgZUpYs_zlnllEkERVdEqRfgJ31DO3U"
let documento = new GoogleSpreadsheet(googleId)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsById[483612079]
    return documento
}

async function getCargosTodos(){
    await obtenercredenciales()
    
    const registros =  await sheet.getRows()
    return registros
}

async function postDocenteCargo(objetoInterface) {
    console.log("postDocenteCargo: Antes: ", objetoInterface)
    await obtenercredenciales()

    const objetoSalvado = await sheet.addRow(objetoInterface)
    console.log("postDocenteCargo: Después: ", objetoSalvado)
    return objetoSalvado
}

module.exports = {
    getCargosTodos: getCargosTodos,
    postDocenteCargo:postDocenteCargo
}