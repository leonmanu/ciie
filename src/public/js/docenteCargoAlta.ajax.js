$(document).ready(function () {
  var slcRol = $('#inputRol');
  var slcRevista = $('#inputRevista');
  var slcCurso = $('#inputCurso');
  var slcAsignatura = $('#inputAsignatura');
  var btnAlta = $('#btnDocenteCargoAlta');
  var btnBaja = $('.btnDocenteCargoBaja');


  
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
    
    //carga cargos cuando se selecciona el rol
  
      $.ajax({
        url: '/cargo/rol',
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({ idRol: 5 }),
        dataType: 'text',
        success: function (response) {
          
          var jsonResponser = JSON.parse(response);
          var slcAsignatura = $('#inputAsignatura');
          
          slcAsignatura.html('');
          $('#inputAsignatura').removeAttr('disabled');
          slcAsignatura.attr('selected', false);
          slcAsignatura.append("<option value='' selected='' disabled=''>Seleccione un campo</option>\ ");
          
          jsonResponser.forEach(function (cargo) {
            slcAsignatura.append("<option value='"+cargo.id+"' > " + cargo.campo + " </option>\ ");
          })
          $("#waitIconAsignatura").css("display", "none");
      }
      });

      var slcAsignatura = $('#inputAsignatura');

  
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

  

  //== CUANDO SE SELECCIONA CARGO===============
  $('#inputAsignatura').on('change', function () {
    var jsonObjet = {
      idCargo: $(this).val(),
      idCurso: $('#inputCurso').val(),
      idRol: $('#inputRol').val()
    }
   // alert("idCargo: " + jsonObjet.idCargo + ", idCurso: " + jsonObjet.idCurso + ", idRol: " + jsonObjet.idRol)
    $("#waitIconAsignatura2").css("display", "block");
    $.ajax({
        url: '/docente/cargo/siDisponible/',
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({ jsonObjet }),
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


  //Cuando se tocal el botón de baja de usuario [-]
  btnBaja.on('click', async function () {
    btnBaja.prop("disabled", true);
    var nombreCargo = $(this).data('clave');

    // Mostrar cuadro de diálogo de confirmación
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro que desea desvincularse del cargo *' + nombreCargo +'* ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, realiza la solicitud AJAX
        await darDeBajaUsuario();
      } else {
        // Si el usuario cancela, reactiva el botón de baja
        btnBaja.prop("disabled", false);
      }
    });
  });
}); 
