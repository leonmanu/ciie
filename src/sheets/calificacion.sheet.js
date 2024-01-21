const req = require('express/lib/request')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let documento = new GoogleSpreadsheet(process.env.SPREADSHEET_ID)
let sheet

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    sheet = documento.sheetsByTitle['calificacion']
    return documento
}

async function get(){
    await obtenercredenciales()
    const registros =  await sheet.getRows()
    return registros
}

async function put(objeto) {
    const rows = await get()
    let i = objeto.rowNumber
    rows[i] = objeto
    await rows[i].save()
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

module.exports = {
    get,
    put
}