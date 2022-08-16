const { GoogleSpreadsheetRow } = require('google-spreadsheet')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciales = require('../json/credecialSheets.json')

let googleId = "1Pq0bh9zDZXtd1F0kAcikS_NYTquFQWYm5Dsggkkztng"
let documento = new GoogleSpreadsheet(googleId)

async function obtenercredenciales(){
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    return documento
}

async function get(){
    const documento = await obtenercredenciales()
    let sheet = documento.sheetsById[431811914]
    
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

async function getOneByEmail(email){
    const documento = await obtenercredenciales()
    let sheet = documento.sheetsById[431811914]

    console.log("Usuario.Sheet getById: ", email)
    const registros =  await sheet.getRows()
    const resultado = await registros.filter(row => row.email == email)
    try{
        //console.log("User sheet ok: ",resultado[0].email)
        var usuarioInterface = {
            id: resultado[0].id,
            rol: resultado[0].rol,
            idGoogle: resultado[0].idGoogle,
            email: resultado[0].email,
            apellido: resultado[0].apellido,
            nombre: resultado[0].nombre
        }
        //console.log("usuarioInterface ok: ",usuarioInterface)
        return usuarioInterface
        }catch(e){
            console.error(e.message," no se encontró objeto, devuelvo 'null' ");
        return resultado[0] = {email: null}
        }
    
}

async function getUsuarioById(id){
    const documento = await obtenercredenciales()
    let sheet = documento.sheetsById[431811914]

    console.log("Usuario.Sheet getById: ", id)
    const registros =  await sheet.getRows()
    console.log("Registros: ", registros)
    const resultado = registros.filter(row => row.id == id)
    console.log("Usuario.Sheet lenght: " + resultado.length)
    resultado.forEach(element => {
        console.log("Usuario: " + element.email)
    });
    return resultado.lengths
    
}

async function post(req, res) {
    const documento = await obtenercredenciales()
    const sheet = documento.sheetsById[431811914]

    var usuario = this.getOneByEmail(req.body.email)
    if (req.body.email == usuario) {
        return null
    } else {
        var usuarioInterface = {
            id: sheet.rowCount,
            idGoogle: req.body.idGoogle,
            email: req.body.email,
            apellido: req.body.apellido,
            nombre: req.body.nombre,
            cuil: req.body.cuil,
            fechanac: req.body.fechanac
        }
    
        await sheet.addRow(usuarioInterface)
        return usuarioInterface
    }
    

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
    getUsuarioById:getUsuarioById,
    post: post,
    put : put,
    del : del,
    getOneByEmail:getOneByEmail
}