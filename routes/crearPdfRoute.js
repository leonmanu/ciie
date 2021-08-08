var express = require('express')
var crearPdfRoute = express.Router()
const fs = require('fs');
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const { options } = require('./routeCursoAsignaturas');

//var resultados = [];
crearPdfRoute.route('/crear')
    .get(async function (req, res) {
        console.log("Lo que se manda por URL:: " + req.query.id)
        var fnExterna = require("../model/getCalificaciones.js")
        const promesa = new Promise((resolve, reject) => {
            var resultados = fnExterna(req.query.id);
            console.log("1. entró a la promesa ");
            resolve(resultados);
            reject(resultados);
        })

        promesa.then(r => {
            const data = {
                font: {
                    "color": "green",
                    "include": "https://api.****.com/parser/v3/css/combined?face=Kruti%20Dev%20010,Calibri,DevLys%20010,Arial,Times%20New%20Roman"
                },
                testData: [
                    {
                        "name": "<p><span class=\"T1\" style=\"font-family:'DevLys 010'; margin: 2;\">0-06537 esa 5 dk LFkuh; eku gS&</span></p>"
                    }],
                students: { resultados }
            };
            const gethtmltopdf = async () => {
                try {

                    const filePathName = path.resolve(__dirname, "../views/pages", 'db.ejs');
                    const htmlString = fs.readFileSync(filePathName).toString();
                    let options = { format: 'A4' };
                    const ejsData = ejs.render(htmlString, data);
                    return await pdf.create(ejsData, options).toFile('generatedfile.pdf', (err, response) => {
                        if (err) return console.log(err);
                        return response;
                    });

                } catch (err) {
                    console.log("Error processing request: " + err);
                }


            }
            gethtmltopdf();
        })
    })



module.exports = crearPdfRoute;