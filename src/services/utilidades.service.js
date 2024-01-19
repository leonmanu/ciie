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
};

module.exports = {
    convertToJson: convertToJson,
};
