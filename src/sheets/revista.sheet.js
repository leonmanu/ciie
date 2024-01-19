const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let documento = new GoogleSpreadsheet(process.env.SPREADSHEET_ID)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsByTitle['revista']
    return documento
}

async function get(){
    await obtenercredenciales()
    const registros =  await sheet.getRows()

    return registros
}

async function revistaGetTodos(){
    await obtenercredenciales()
    
    const registros =  await sheet.getRows()
    return registros
}

module.exports = {
    get,
    revistaGetTodos: revistaGetTodos
}