const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let googleId = "1Pq0bh9zDZXtd1F0kAcikS_NYTquFQWYm5Dsggkkztng"
let documento = new GoogleSpreadsheet(googleId)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsById[932021048]
    return documento
}   

async function getValoracion(){
    await obtenercredenciales()
    const registros =  await sheet.getRows()
    //console.log("SHEETS Calificaciones = ", registros)
    return registros
    
}



module.exports = {
    getValoracion: getValoracion,
}