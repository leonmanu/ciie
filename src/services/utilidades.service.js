const convertToJson = async (resultados) => {

    i = 0
    var jsonArray = []
    try{
    var header = resultados[0]._sheet.headerValues
   } catch {
    console.log("Array vacío")
   }
    resultados.forEach(s => {

        var varuser = {}
        varuser['_rowNumber'] = resultados[i]._rowNumber //acá le guardo el número de fila en la sheet
        header.forEach(r => {
            varuser[r] = resultados[i][r]
        })
        jsonArray.push(varuser)
        i++
    })
    
    return jsonArray
}
module.exports = {
    convertToJson: convertToJson
} 