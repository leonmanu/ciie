const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let googleId = "1d-cWeBzIPIdpzgZUpYs_zlnllEkERVdEqRfgJ31DO3U"
let documento = new GoogleSpreadsheet(googleId)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet_get = documento.sheetsById[1287807919]
    sheet = documento.sheetsById[1731131025]
    return documento
}   

async function getCalificacion(){
    await obtenercredenciales()
    const registros =  await sheet_get.getRows()
    //console.log("SHEETS Calificaciones = ", registros)
    return registros
    
}

async function postCalificacion(objetoInterface) {
    await obtenercredenciales()
    const resultado = await sheet.addRow(objetoInterface)

    console.log("resultado postSheet: ",resultado)
}

async function put(pObjeto) {
    const documento = await obtenercredenciales()
    
    const sheet = documento.sheetsById[82786429]
    const rows = await sheet.getRows()

    console.log('lenght: ', rows.length)

    rows[5].Estudiante = 'Sergio el Bailador'
    await rows[5].save()

    for (let index = 0; index < rows.length; index++) {
        const element = rows[index].Estudiante;
        console.log('Registro: ', element)
    }

}

async function del(pObjeto) {
    const documento = await obtenercredenciales()

    const sheet = documento.sheetsById[82786429]
    await sheet.addRow(pObjeto)

    console.log(pObjeto)
}

module.exports = {
    getCalificacion: getCalificacion,
    postCalificacion: postCalificacion,
    put : put,
    del : del
}