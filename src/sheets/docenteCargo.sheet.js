const req = require('express/lib/request')
const { GoogleSpreadsheetRow } = require('google-spreadsheet')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let documento = new GoogleSpreadsheet(process.env.SPREADSHEET_ID)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsByTitle['docenteCargo']
    return documento
}

async function get(){
    await obtenercredenciales()
    const registros =  await sheet.getRows()

    return registros
}

async function postDocenteCargo(objetoInterface) {
    console.log("postDocenteCargo: Antes: ", objetoInterface)
    await obtenercredenciales()

    const objetoSalvado = await sheet.addRow(objetoInterface)
    //console.log("postDocenteCargo: Después: ", objetoSalvado)
    return objetoSalvado
}

async function putBajaDocenteCargo(rowNumber, fechaBaja) {
    console.log(fechaBaja, "postDocenteCargo: Antes: ", rowNumber)
    const index = rowNumber - 2
    const registros = await sheet.getRows()
    registros[index].fechaBaja = fechaBaja
    await registros[index].save()
    
    console.log("postDocenteCargo: Después: ", registros[index].asignatura)
    //console.log('lenght: ', registros.length)
    return rowNumber
}

module.exports = {
    get:get,
    postDocenteCargo:postDocenteCargo,
    putBajaDocenteCargo: putBajaDocenteCargo
}