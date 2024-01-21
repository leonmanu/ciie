const req = require('express/lib/request')
const capacitacionSheet =  require("../sheets/cursante.sheet")
const utilidadesService = require('./utilidades.service')
const cursanteSheet = require('../sheets/cursante.sheet')

const get = async () => {
    registros = await cursanteSheet.get()
    return registros
}

const getPorCampo = async (campoClave, cohorte) => {
   console.log("COHORTE -- > " + cohorte)
    const cursantes = await get();
    const filtrados = await cursantes.filter(cursante => cursante.Apto == 'TRUE' && cursante['Seleccione su/s curso/s'].includes(campoClave) && cursante['Seleccione su/s curso/s'].toLowerCase().includes('|$'+cohorte.toLowerCase()))

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

module.exports = {
    get,
    getPorCampo,
    put,
} 