var express = require('express')
var consultaBoletinRoute = express.Router()

//var resultados = [];
consultaBoletinRoute.route('/consulta')
    .get(async function(req,res){
        console.log("Lo que se manda por URL:: " + req.query.id)
        var fnExterna = require("../model/getCalificaciones.js")
        const promesa = new Promise((resolve, reject)=>{
            var resultados =  fnExterna(req.query.id);
            console.log("1. entró a la promesa ");
            resolve(resultados);
            reject(resultados);
        })
        
        promesa.then(r =>{
            console.log("curso prueba    " + r[0][4]);
            console.log("2. fin promesa");
            res.render('pages/db', {resultados});
        })
        .catch(error =>{
            console.log("error en  ROUTE" + error);
            res.render('pages/error');
        })

    })

    module.exports = consultaBoletinRoute;
    