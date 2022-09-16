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
    const registros =  await sheet_get.getRows()
    //console.log("SHEETS Calificaciones = ", registros)
    return registros
    
}

async function getCalificacionCrudas(){
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

async function postCalificacion(objetoInterface) {
    await obtenercredenciales()
    const resultado = await sheet.addRow(objetoInterface)

    return null
    //console.log("resultado postSheet: ",resultado)
}

async function putCalificacion(objExistente, objNuevo) {
    var modificar = false //son distintos? true si son distintos
    var header = objExistente._sheet.headerValues
    header.forEach(r => {
        //console.log("header: foreach: ", r)
        if(objExistente[r] !== '' && typeof(objNuevo[r]) !== 'undefined' && objNuevo[r] !== ''&& objNuevo[r] !== null && objExistente[r] !== objNuevo[r]){
            modificar = true
            console.log(r+"**********objExistente[r]: "+objExistente[r] +  " <==> objNuevo[r]: " +objNuevo[r])
        }
        objExistente[r] = objNuevo[r]
    })
    if(modificar == true){
        resultado = await objExistente.save()
    }
    
    console.log("modifi ::   ", modificar)
    return modificar
}

async function modificablesArray(objExistente, objNuevo) {
    var modificar = false //son distintos? true si son distintos
    var header = objExistente._sheet.headerValues
    header.forEach(r => {
        //console.log("header: foreach: ", r)
        if(objExistente[r] !== '' && typeof(objNuevo[r]) !== 'undefined' && objNuevo[r] !== ''&& objNuevo[r] !== null && objExistente[r] !== objNuevo[r]){
            modificar = true
            console.log(r+"**********objExistente[r]: "+objExistente[r] +  " <==> objNuevo[r]: " +objNuevo[r])
        }
        objExistente[r] = objNuevo[r]
    })
    if(modificar == true){
        return objExistente
    }
    else{
        return null
    }
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
    get:get,
    getCalificacion: getCalificacion,
    getCalificacionCruda: getCalificacionCrudas,
    postCalificacion: postCalificacion,
    put : put,
    del : del,
    putCalificacion: putCalificacion,
    getOrdenado:getOrdenado,
    modificablesArray:modificablesArray,
    putArray:putArray,
}