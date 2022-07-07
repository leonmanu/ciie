const { GoogleSpreadsheetRow } = require('google-spreadsheet')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let googleId = "1d-cWeBzIPIdpzgZUpYs_zlnllEkERVdEqRfgJ31DO3U"
let documento = new GoogleSpreadsheet(googleId)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsById[0]
    return documento
}

async function getTodo(){
    await obtenercredenciales()
    const registros =  await sheet.getRows()

    return registros
    
}

async function getTodoPorCurso(){
    const documento = await obtenercredenciales()
    sheet = documento.sheetsById[1585615507] // acá usé la query ordenada: EstudianteCurso_get
    const registros =  await sheet.getRows()

    return registros
}

async function post(pObjeto) {
    const documento = await obtenercredenciales()

    const sheet = documento.sheetsById[82786429]
    await sheet.addRow(pObjeto)

    console.log(pObjeto)
}

async function put(cargo) {
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
    await sheet.

    console.log(pObjeto)
}

module.exports = {
    getTodo: getTodo,
    getTodoPorCurso: getTodoPorCurso,
    post: post,
    put : put,
    del : del
}