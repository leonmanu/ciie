$(document).ready(function () {
  var slcRol = $('#inputRol');
  var slcRevista = $('#inputRevista');
  var slcCurso = $('#inputCurso');
  var slcAsignatura = $('#inputAsignatura');
  var btnAlta = $('#btnDocenteCargoAlta')


  
  //Cuando se tocal el botón de alta de usuario [+]
  btnAlta.on('click', async function () {
    btnAlta.prop("disabled", true);
    slcRol.empty();
    slcRol.append("<option value='' selected='' disabled=''>Seleccione un rol</option>\ ");
    $('#lblFormAlta').show('slow')
    $("#waitIconLblAltaCargo").css("display", "block");
    //Inicio función cargar roles
    $.ajax({
      url: '/rol',
      contentType: 'application/json',
      method: 'POST',
      dataType: 'text',
      success: await function (response) {  
        var jsonResponser = JSON.parse(response);
        slcAsignatura.attr('selected', false);

        jsonResponser.forEach(function (m) {
          if (m.codigo == "Pf") {
            slcRol.append("<option value='"+m.id+"' selected> " + m.nombre + " </option>\ ");
          } else {
            slcRol.append("<option value='"+m.id+"' > " + m.nombre + " </option>\ ");
          }
          
            console.log(m.nombre);
        })

      }
      
    });

//Rellena input revista
    $.ajax({
      url: '/revista',
      contentType: 'application/json',
      method: 'POST',
      dataType: 'text',
      success: await function (response) {
        var jsonResponser = JSON.parse(response);


        jsonResponser.forEach(function (m) {

          slcRevista.append("<option value='" + m.id + "' > " + m.nombre + " </option>\ ");

          console.log(m.nombre);
        })

        $('#divFormAlta').show('slow');
        $("#waitIconLblAltaCargo").css("display", "none");
      }

    });
    
    
    //fin función cargar roles
    //carga de cursos

    //carga curso cuando se carga la vista el rol
//   $.ajax({
//     url: '/curso',
//     contentType: 'application/json',
//     method: 'POST',
//     data: JSON.stringify({ id: selector }),
//     dataType: 'text',
//     success: function (response) {
//         var jsonResponser = JSON.parse(response);
//         //var slcCurso = $('#inputCurso');
//         slcCurso.html('');
//         slcCurso.removeAttr('disabled');
//        slcCurso.attr('selected', false);
//        slcCurso.append("<option value='' selected='' disabled=''>Seleccione un curso</option>\ ");
        
//         jsonResponser.forEach(function (m) {
//           slcCurso.append("<option value='"+m.idCurso+"' > " + m.clave + " - " + m.turnoNombre + " </option>\ ");
//             console.log(m.nombre);
//         })
//         slcCurso.removeAttr('disabled')
//         $("#waitIconCurso").css("display", "none");
//     }
// });

  })

  //Botón limpiar
  $('#btnLimpar').on('click', function(){

    slcRol.val("");

    slcRevista.val("");
    slcRevista.attr('selected', false);
    slcRevista.prop("disabled", true);

    slcCurso.val("");
    slcCurso.attr('selected', false);
    slcCurso.prop("disabled", true);

    slcAsignatura.val("");
    slcAsignatura.attr('selected', false);
    slcAsignatura.prop("disabled", true);
  })

  //Botón cancelar
  $('#btnCancelar').on('click', function(){
    $('#divFormAlta').hide('slow');
    $('#lblFormAlta').hide('slow')
    btnAlta.prop("disabled", false);
  })

  //carga curso cuando se selecciona el rol
  $('#inputRol').on('change', function () {
    var selector = $(this).val();
    slcRevista.removeAttr('disabled');
    if (selector == 6) {
      $("#waitIconCurso").css("display", "block");
      $('#inputAsignatura').val("");
      $('#inputAsignatura').prop("disabled", true);
      
      slcCurso.removeAttr('disabled');
      $("#waitIconCurso").css("display", "none");

    } else {
      
      $("#waitIconAsignatura").css("display", "block");
      slcCurso.val("");
      slcCurso.prop("disabled", true);
      $.ajax({
        url: '/cargo/rol',
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({ idRol: selector }),
        dataType: 'text',
        success: function (response) {
          console.log("RESPONSE",response)
          var jsonResponser = JSON.parse(response);
          var slcAsignatura = $('#inputAsignatura');
          
          slcAsignatura.html('');
          $('#inputAsignatura').removeAttr('disabled');
          slcAsignatura.attr('selected', false);
          slcAsignatura.append("<option value='' selected='' disabled=''>Seleccione un cargo</option>\ ");
          
          jsonResponser.forEach(function (m) {
            slcAsignatura.append("<option value='"+m.id+"' > " + m.asignatura + " </option>\ ");
              console.log(m.nombre);
          })
          $("#waitIconAsignatura").css("display", "none");
      }
      });

      var slcAsignatura = $('#inputAsignatura');

    }
  });

  //== CUANDO SE SELECCIONA CURSO  =========================================
  $('#inputCurso').on('change', function () {
      var idCurso = $(this).val();
      $("#waitIconAsignatura").css("display", "block");
      $.ajax({
          url: '/curso/'+idCurso+'/asignaturasAjax',
          contentType: 'application/json',
          method: 'GET',
          data: JSON.stringify({ idCurso }),
          dataType: 'text',
          success: function (response) {
              console.log("RESPONSE",response)
              var jsonResponser = JSON.parse(response);
              var slcAsignatura = $('#inputAsignatura');
              slcAsignatura.html('');
              $('#inputAsignatura').removeAttr('disabled');
              slcAsignatura.attr('selected', false);
              slcAsignatura.append("<option value='' selected='' disabled=''>Seleccione una asignatura</option>\ ");
              
              jsonResponser.forEach(function (m) {
                slcAsignatura.append("<option value='"+m.idAsignatura+"' > " + m.asignatura + " </option>\ ");
                  console.log(m.nombre);
              })
              $("#waitIconAsignatura").css("display", "none");
          }
      });
  });

  //== CUANDO SE SELECCIONA CARGO===============
  $('#inputAsignatura').on('change', function () {
    var selector = $(this).val();

    $("#waitIconAsignatura2").css("display", "block");
    $.ajax({
        url: '/docente/cargo/siDisponible/'+selector,
        contentType: 'application/json',
        method: 'GET',
        data: JSON.stringify({ cargo: selector }),
        dataType: 'text',
        success: function (response) { 

            //var jsonResponser = JSON.parse(response);
            if (response == 'Disponible') {
              $('#disponibleMsg').attr('class', 'text-success')
              $('#disponibleMsg').text('Cargo ' + response)
              $('#btnEnviar').removeAttr("disabled");
            } else {
              $('#disponibleMsg').attr('class', 'text-danger')
              $('#disponibleMsg').text('Cargo ocupado por: ' + response)
              $('#btnEnviar').prop("disabled", true);
            }
            
            $("#waitIconAsignatura2").css("display", "none");
        }
    });
});


  //prueba la concección con el js
    // $(document).ready(function(){
    //   $("button").click(function(){
    //     alert("hola");
    //     $.ajax({url: "demo_test.txt", success: function(result){
    //       $("#div1").html(result);
    //     }});
    //   });
    // });
}); 
