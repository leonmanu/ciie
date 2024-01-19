const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let documento = new GoogleSpreadsheet(process.env.SPREADSHEET_ID)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsByTitle['cargo']
    return documento
}

async function get(){
    await obtenercredenciales()
    const registros =  await sheet.getRows()
    return registros
}

async function getTodos(){//esta hace lo mismo que get
    await obtenercredenciales()
    
    const registros =  await sheet.getRows()
    return registros
}

module.exports = {
    get:get,
    getTodos: getTodos
}