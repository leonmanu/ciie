const req = require('express/lib/request')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let documento = new GoogleSpreadsheet(process.env.SPREADSHEET_ID)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsByTitle['encuentroFecha']
    return documento
}

async function get(){
    await obtenercredenciales()
    const registros =  await sheet.getRows()
    return registros
}

async function post(objeto) {
    await obtenercredenciales()
    await sheet.addRow(objeto)

    return objeto
}

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
    post,
    put,
}