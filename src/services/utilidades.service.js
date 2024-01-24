const { v4: uuidv4 } = require('uuid');

const convertToJson = async (resultados) => {
    try {
        if (!resultados[0] || !resultados[0]._sheet || !resultados[0]._sheet.headerValues) {
            throw new Error('Array vacío o falta información de cabecera');
        }

        const header = resultados[0]._sheet.headerValues;

        return resultados.map((result) => {
            const varuser = {
                _rowNumber: result._rowNumber,
                ...header.reduce((acc, key) => {
                    acc[key] = result[key];
                    return acc;
                }, {}),
            };

            return varuser;
        });
    } catch (error) {
        console.log(`Error en convertToJson: ${error.message}`);
        return [];
    }
}

async function getUltimo(registros){
    const indice = registros.length
    const resultado = registros[indice - 1]

    return resultado
}

const getHeaders = async (json) => {
  if (json.length === 0) { // Verifica si el arreglo no está vacío
    return [];
  }
  const headers = Object.keys(json);// Obtiene las claves del primer objeto del arreglo (suponiendo que todos los objetos tienen las mismas claves)
  console.log("header : " + headers)
  return headers;
}

async function emparejar(nuevo, anterior){
    if (nuevo.length === 0) { //verifica eque arrayJson no esté vacío, si está vacío, es lo que devuelve
      return [];
    }
    headers = await getHeaders(nuevo)
    headers.forEach(head => {
        anterior[head] = nuevo[head]
    })
    
    return anterior
  }

async function crearId(){
    let nuevoId = uuidv4()
    return nuevoId
}

module.exports = {
    convertToJson: convertToJson,
    getUltimo,
    getHeaders,
    emparejar,
    crearId,
};
