const req = require('express/lib/request')

let cursoSheet = require('../sheets/curso.sheet')
let estudianteSheet = require('../sheets/estudiante.sheet')
const estudianteCursoSheet = require('../sheets/estudianteCurso.sheet')


const get = async (req, res) => {
    registros = await cursoSheet.get()
    res.render('pages/index', {registros})
}

 const getEstudiantes = async (id = req.param, res) => {
    const curso = id.params.id
    const resultados = []
    registros = await estudianteCursoSheet.getPorCurso(curso)
    estudiantes = await estudianteSheet.getPorCurso(curso)

    registros.map((registro) => {
        estudiantes.map((estudiante) => {
            if (registro.estudiante == estudiante.idEstudiante) {
                resultados.push(
                    estudiante
                )
            }
        })
      })
    //estudiante = await estudianteSheet.getOne()

    console.log("Resultado: ", resultados)
    res.render('pages/cursoEstudiantes', {resultados})
}



module.exports = {
    get : get,
    getEstudiantes: getEstudiantes
} 