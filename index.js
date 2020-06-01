const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

var fnExterna = require("./javascript/ajax/dirveApi/getCursos.js");
var cursos = fnExterna.cursos;
//console.log("||=> " + cursos);
////////////////////

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index", { cursos }))
  .listen(PORT, () => console.log(`Listening on ${PORT}}`));

function nada() {
  console.log("||=> " + cursos);
}
