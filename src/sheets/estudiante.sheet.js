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

async function get(){
    const documento = await obtenercredenciales()
    const registros =  await sheet.getRows()
    //const resultados = registros.filter(row => row ['apellido'] === 'Carruega')
    // registros.map((registro)=>{

    // })

    return registros
    
}

async function getPorCurso(curso){
    const documento = await obtenercredenciales()
    const registros =  await sheet.getRows()
    const resultados = registros.filter(row => row ['apellido'] === 'Carruega')
    registros.map((registro)=>{

    })

    return registros
    
}

async function getOne(id){
    const documento = await obtenercredenciales()

    const registros =  await sheet.getRows()
    const resultado = registros.filter(row => row.idEstudiante === id)
    const estudiate = registros.
    // registros.map((registro)=>{

    // })
    console.log(resultado[0])

    return resultado
    
}

async function post(pObjeto) {
    const documento = await obtenercredenciales()

    const sheet = documento.sheetsById[82786429]
    await sheet.addRow(pObjeto)

    console.log(pObjeto)
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
    get: get,
    getOne: getOne,
    getPorCurso:getPorCurso,
    post: post,
    put : put,
    del : del
}