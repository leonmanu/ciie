$(document).ready(function () {
  var btnOpenModal = $('#btnFechaEncuentros');
  var btnBaja = $('#btnDocenteCargoBaja');
  var mdlFenc = $('#modalFechaEcuentros');
  var campoClave = $('#campoClave').text();
  var cohorteClave = $('#cohorteClave').text();
  //Cuando se tocal el botón de fechaEncuentros
  btnOpenModal.on('click', async function () {
    btnOpenModal.prop("disabled", true);
    //mdlFenc.show()
    $('#lblFormAlta').show('slow')
    $("#waitIconFecha").css("display", "block");
    //Inicio función cargar roles
    $.ajax({
      url: '/encuentroFecha/get',
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify({ campoClave: campoClave, cohorteClave: cohorteClave }),
      dataType: 'text',
      success: await function (response) {  
        if (response) {
        var jsonResponser = JSON.parse(response);

        $('#efRowNumber').val(jsonResponser._rowNumber)

        let fechaFormateada = formatDate(jsonResponser.encuentro1)
        $('#encuentro1').val(fechaFormateada)

        fechaFormateada = formatDate(jsonResponser.encuentro2)
        $('#encuentro2').val(fechaFormateada)

        fechaFormateada = formatDate(jsonResponser.encuentro3)
        $('#encuentro3').val(fechaFormateada)

        fechaFormateada = formatDate(jsonResponser.encuentro4)
        $('#encuentro4').val(fechaFormateada)

        fechaFormateada = formatDate(jsonResponser.encuentro5)
        $('#encuentro5').val(fechaFormateada)

        } else {
          $('#efRowNumber').val(0)
          alert("nulaso")
        }
        
        btnOpenModal.prop('disabled', false);
        $('.modal').show()
        $('#waitIconFecha').css("display", "none");
        
      }
      
    });
        
  })
  
  function formatDate(fecha) {
    // Convierte la cadena de fecha a un objeto Date de JavaScript
    const fechaJavaScript = new Date(fecha);
  
    // Obtiene las partes de la fecha (año, mes, día)
    const anio = fechaJavaScript.getUTCFullYear();
    const mes = ('0' + (fechaJavaScript.getUTCMonth() + 1)).slice(-2); // Suma 1 al mes porque en JavaScript los meses van de 0 a 11
    const dia = ('0' + fechaJavaScript.getUTCDate()).slice(-2);
    
    // Forma la cadena de fecha en el formato 'YYYY-MM-DD'
    const fechaFormateada = `${anio}-${mes}-${dia}`;
  
    return fechaFormateada;
  }

  //Botón cancelar
  $('#btnCancelar').on('click', function(){

    $('.modal').hide()
    btnOpenModal.prop("disabled", false);

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
