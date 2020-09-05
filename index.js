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
//resultados.forEach(result => console.log('*' + result.nombre))
express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  //.get("/",  (req, res) => res.render("pages/index", { resultados }))
  .get("/", (req, res) => res.redirect("/curso/cursoAsignaturas1UTapDMpbXqAHS6F0RN7Yrh4u3g4voRui"))
  .use("/curso", routerCurso)
  .listen(PORT, () => console.log(`Listening on ${PORT}}`));
