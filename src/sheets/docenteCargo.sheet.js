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
    sheet_get = documento.sheetsById[1292811399]
    return documento
}

async function getCargosTodos(){
    await obtenercredenciales()
    
    const registros =  await sheet_get.getRows()
    //console.log("Cargo por docente::::::::::::.. ", registros)
    return registros
}

async function postDocenteCargo(objetoInterface) {
    console.log("postDocenteCargo: Antes: ", objetoInterface)
    await obtenercredenciales()

    const objetoSalvado = await sheet.addRow(objetoInterface)
    console.log("postDocenteCargo: Después: ", objetoSalvado)
    return objetoSalvado
}

async function putBajaDocenteCargo(rowNumber, fechaBaja) {
    console.log(fechaBaja, "postDocenteCargo: Antes: ", rowNumber)

    const registros = await sheet.getRows()
    registros[rowNumber - 2].fechaBaja = fechaBaja
    await registros[rowNumber - 2].save()
    
    console.log("postDocenteCargo: Después: ", registros[rowNumber - 2].asignatura)
    //console.log('lenght: ', registros.length)
    return rowNumber
}

module.exports = {
    getCargosTodos: getCargosTodos,
    postDocenteCargo:postDocenteCargo,
    putBajaDocenteCargo: putBajaDocenteCargo
}