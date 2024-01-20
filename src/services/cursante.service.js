const req = require('express/lib/request')
const capacitacionSheet =  require("../sheets/cursante.sheet")
const utilidadesService = require('./utilidades.service')
const cursanteSheet = require('../sheets/cursante.sheet')

const get = async () => {
    registros = await cursanteSheet.get()
    return registros
}

const getPorCampo = async (campoClave) => {
    const cursantes = await get();
    const filtrados = await cursantes.filter(cursante => cursante.campoClave === campoClave && cursante.Apto == 'TRUE')
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
    });
  
    //console.log("Resultado Ordenado :--> ", resultados);
    return resultados;
  };

module.exports = {
    get,
    getPorCampo,
} 