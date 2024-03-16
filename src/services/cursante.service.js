const req = require('express/lib/request')
const capacitacionSheet =  require("../sheets/cursante.sheet")
const utilidadesService = require('./utilidades.service')
const cursanteSheet = require('../sheets/cursante.sheet')

const get = async () => {
    registros = await cursanteSheet.get()
    return registros
}

const getPorDni = async (dni) => {
  const cursantes = await get();
  const filtrados = await cursantes.filter(cursante => cursante['Número de DNI'] == dni)
  
  return filtrados
}

const getPorCohorte = async (cohorte) => {
  const cursantes = await get();
    const filtrados = await cursantes.filter(cursante => cursante.Apto == 'TRUE' && cursante['Seleccione su/s curso/s'].toLowerCase().includes('|$'+cohorte.toLowerCase()))

    // Ordenar por apellido
    const resultados = await filtrados.sort((a, b) => {
      const apellidoA = a['Apellido/s'].toLowerCase();
      const apellidoB = b['Apellido/s'].toLowerCase();
  
      if (apellidoA < apellidoB) {
        return -1;
      } else if (apellidoA > apellidoB) {
        return 1;
      } else {
        return 0;
      }
    })
    
    // resultados.forEach(async result => {
    //   console.log("cursante: ", result['Apellido/s'])
    // } )
    return resultados;
}

const getPorCampo = async (campoClave, cohorte) => { //este antes buscaba también por ultima cohorte, lo cambié
   console.log("COHORTE -- > " + cohorte)
    const cursantes = await get();
    const filtrados = await cursantes.filter(cursante => cursante['Seleccione su/s curso/s'].includes(campoClave+' -') && cursante.Apto == 'TRUE' )
    // Ordenar por apellido
    const resultados = await filtrados.sort((a, b) => {
      const apellidoA = a['Apellido/s'].toLowerCase();
      const apellidoB = b['Apellido/s'].toLowerCase();
  
      if (apellidoA < apellidoB) {
        return -1;
      } else if (apellidoA > apellidoB) {
        return 1;
      } else {
        return 0;
      }
    })
    
    // resultados.forEach(async result => {
    //   console.log("cursante: ", result['Apellido/s'])
    // } )
    return resultados;
  };

  const getPorCampoCohorte = async (campoClave, cohorte) => {
    console.log("COHORTE -- > " + cohorte)
     const cursantes = await get();
     const filtrados = await cursantes.filter(cursante => cursante.Apto == 'TRUE' && cursante['Seleccione su/s curso/s'].includes(campoClave+' - |') && cursante['Seleccione su/s curso/s'].toLowerCase().includes('|$'+cohorte.toLowerCase()))
 
     // Ordenar por apellido
     const resultados = await filtrados.sort((a, b) => {
       const apellidoA = a['Apellido/s'].toLowerCase();
       const apellidoB = b['Apellido/s'].toLowerCase();
   
       if (apellidoA < apellidoB) {
         return -1;
       } else if (apellidoA > apellidoB) {
         return 1;
       } else {
         return 0;
       }
     })
     
     // resultados.forEach(async result => {
     //   console.log("cursante: ", result['Apellido/s'])
     // } )
     return resultados;
   };

  async function put(objeto) {
    resultado = await cursanteSheet.put(objeto)
    return resultado
  }

async function putEmparejar(json, cursante){
  if (json.length === 0) { //verifica eque arrayJson no esté vacío, si está vacío, es lo que devuelve
    return [];
  }
  headers = await utilidadesService.getHeaders(json)
  headers.forEach(head => {
    cursante[head] = json[head]
  })
  
  return cursante
  //resultado = await objExistente.save()
  //console.log("objExistente ::   ", objExistente)
  //return objExistente
}

const putArray = async (arrayJson) => {
  let resultado
  cursantes = await get()
  for (const json of arrayJson) {
    let rn = json.rowNumber;
    emparejado = await putEmparejar(json, cursantes[rn]);
    resultado = await cursanteSheet.put(emparejado);
  }
  
  //const resultado = await cursanteSheet.put(arrayJson[0])
  return resultado
}

const cambiarValores = async () => {
  registros = await cursanteSheet.get()
  return registros
}

module.exports = {
    get,
    getPorDni,
    getPorCampo,
    put,
    putArray,
    getPorCohorte,
} 