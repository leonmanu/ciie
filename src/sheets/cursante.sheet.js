const { GoogleSpreadsheetRow } = require('google-spreadsheet')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let documento = new GoogleSpreadsheet(process.env.SPREADSHEET_FORM_ID)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsByTitle['Respuestas']
    return documento
}

async function get(){
    await obtenercredenciales()
    const registros =  await sheet.getRows()
    return registros
    
}
/*
async function put(objeto) {
    let i = objeto.rowNumber - 2
    const registros = await get()
    registros[i].cohorte = ""
    registros[i].campoClave = ""
    registros[i].Encuentro1 = true
    await registros[i].save()
    
    console.log("registros[i]: ", objeto.rowNumber)
    //console.log('lenght: ', registros.length)
    return i
}
*/
async function put(objeto) {
    try {
        await objeto.save();
        console.log("Modificación exitosa");
        return "Modificación exitosa";
    } catch (error) {
        console.error("Error al modificar:", error);
        throw new Error("Error al modificar");
    }
}



module.exports = {
    get,
    put,
}