const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let documento = new GoogleSpreadsheet(process.env.SPREADSHEET_ID)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsByTitle['campo']
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

async function put(cargo) {
    await obtenercredenciales()
    const rows = await sheet.getRows()

    rows[5].Estudiante = 'Sergio el Bailador'
    await rows[5].save()

    for (let index = 0; index < rows.length; index++) {
        const element = rows[index].Estudiante;
        //console.log('Registro: ', element)
    }

}

async function del(pObjeto) {
    const documento = await obtenercredenciales()

    const sheet = documento.sheetsById[82786429]
    await sheet

    console.log(pObjeto)
}

module.exports = {
    get,
    post,
    put,
    del
}