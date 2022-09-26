const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let googleId = "1Pq0bh9zDZXtd1F0kAcikS_NYTquFQWYm5Dsggkkztng"
let documento = new GoogleSpreadsheet(googleId)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet_get = documento.sheetsById[1287807919]
    sheet_getOrdenado = documento.sheetsById[1658063790]
    sheet = documento.sheetsById[1731131025]
    return documento
}

const get = async () => {
    await obtenercredenciales()
    const registros =  await sheet.getRows()
    return registros
}

async function getCalificacion(){
    await obtenercredenciales()
    const registros =  await sheet.getRows()
    //console.log("SHEETS Calificaciones = ", registros)
    return registros
    
}

async function getOrdenado(){
    await obtenercredenciales()
    const registros =  await sheet_getOrdenado.getRows()
    //console.log("SHEETS Calificaciones = ", registros)
    return registros
    
}

async function post(elemento) {
    await obtenercredenciales()
    const resultado = await sheet.addRow(elemento,(err) => {
        if (err) rej(err);
        else res(true);
      })
    console.log("Resultado: ", resultado)
    return resultado
    //console.log("resultado postSheet: ",resultado)
}

async function postCalificacion(objetoInterface) {
    await obtenercredenciales()
    const resultado = await sheet.addRow(objetoInterface)

    return null
    //console.log("resultado postSheet: ",resultado)
}

async function save(elemento) {
    resultado = await elemento.save((err) => {
        if (err) rej(err);
            else res(true);
        })
    
    return resultado
}

async function modificablesArray(objExistente, objNuevo) {
    var header = objExistente._sheet.headerValues
    header.forEach(r => {
        objExistente[r] = objNuevo[r]
    })
    return objExistente
}

async function putArray(array) {
    array.forEach(r => {
        r.save()
    })
    
    return array.length
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
        //console.log('Registro: ', element)
    }

}

async function del(pObjeto) {
    const documento = await obtenercredenciales()

    const sheet = documento.sheetsById[82786429]
    await sheet.addRow(pObjeto)

    console.log(pObjeto)
}

module.exports = {
    get:get,
    getCalificacion: getCalificacion,
    post:post,
    postCalificacion: postCalificacion,
    put : put,
    del : del,
    getOrdenado:getOrdenado,
    modificablesArray:modificablesArray,
    putArray:putArray,
    save:save,
}