var express = require('express')
var routerCursoAsignaturas = express.Router()

//var resultados = [];
routerCursoAsignaturas.route('/cursoAsignaturas:id')
    .get(async function(req,res){
        //resultados = fnExterna('1N1PPMOm3SN-tnkjWCY5gVFQPX1hnXdD6');
        var fnExterna = require("../javascript/ajax/dirveApi/getCursos.js")
        const promesa = new Promise((resolve, reject)=>{
            var resultados =  fnExterna(req.params.id);
            console.log("1. entró a la promesa");
            resolve(resultados);
            reject(resultados);
        })
        
        promesa.then(r =>{
            console.log("curso prueba ROUTE" + resultados[0].name);
            console.log("2. fin promesa");
            res.render('pages/cursoAsignaturas', resultados);
        })
        .catch(error =>{
            console.log("error en  ROUTE" + error);
            res.render('pages/cursoAsignaturas');
        })

    })

    routerCursoAsignaturas.route('/bajarArchivo:id')
    .get(async function(req,res){
        console.log("Entró a bajar archivo | ID: "+req.params.id)
        var fnExterna = require("../javascript/ajax/dirveApi/dowFile.js")
        const promesa = new Promise((resolve, reject)=>{
            var resultados =  fnExterna(req.params.id);
            console.log("1. entró a la promesa2");
            resolve(resultados);
            reject(resultados);
        })
        
        promesa.then(r =>{
            console.log("curso prueba ROUTE" + resultados[0].name);
            console.log("2. fin promesa");
            res.render('pages/cursoAsignaturas', resultados);
        })
        .catch(error =>{
            console.log("error en  ROUTE" + error);
            res.render('pages/cursoAsignaturas');
        })
    })

    module.exports = routerCursoAsignaturas;
    