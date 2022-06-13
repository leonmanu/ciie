const convertToJson = async (resultados) => {
    var header = resultados[0]._sheet.headerValues
    i = 0
    var jsonArray = []
    resultados.forEach(s => {

        var varuser = {}

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