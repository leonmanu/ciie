const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let documento = new GoogleSpreadsheet("15EeYZFK3W5ZMVLliSAd3mBydH4Xq8VH_Yaw7j-Rt6FY")
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsByTitle['db']
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

async function del(pObjeto) {
    const documento = await obtenercredenciales()

    const sheet = documento.sheetsById[82786429]
    await sheet

    console.log(pObjeto)
}

module.exports = {
    get,
    post,
    del
}