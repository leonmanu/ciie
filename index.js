const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

//var fnExterna = require("./javascript/ajax/dirveApi/getCursos.js");
//var id = '1N1PPMOm3SN-tnkjWCY5gVFQPX1hnXdD6'
//var resultados = fnExterna(id);

//console.log("||=> " + cursos);
////////////////////
var app = express();
var routerCurso = 	require('./routes/routeCursoAsignaturas');
var routerBoletin = 	require('./routes/consultaBoletinRoute');
//resultados.forEach(result => console.log('*' + result.nombre))
express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  //.get("/",  (req, res) => res.render("pages/index", { resultados }))
  .get('/', (req, res) => res.render('pages/index'))
  .use("/curso", routerCurso)
  .use("/boletin", routerBoletin)
  .listen(PORT, () => console.log(`Listening on ${PORT}}`));
