$(document).ready(function () { 
  var btnOpenModal = $('#btnFechaEncuentros');
  var btnBaja = $('#btnDocenteCargoBaja');
  var mdlFenc = $('#modalFechaEcuentros');
  var campoClave = $('#campoClave').text();
  var cohorteClave = $('#cohorteClave').text();
  var selectAll = $('.slcChange')
  selectAll.each(function( index ) {
    slcCss($( this ))
  });

  //Cuando se tocal el botón de fechaEncuentros
  btnOpenModal.on('click', async function () { //abre el modal del formulario de la fecha
    btnOpenModal.prop("disabled", true);
    //mdlFenc.show()
    $('#lblFormAlta').show('slow')
    $('.modal').show()
    //$("#waitIconFecha").css("display", "block");
    //Inicio función que trae la fecha de los encuentros
    /* lo comento por si lo necesite más adelante
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
      */
  })

   //Cuando se tocal el botón de envío del formulario
   
   $("#idForm").submit( async function (e) { //envía el formulario
    await e.preventDefault();
    var form = await $(this);
    var actionUrl = await form.attr('action');
    var data = await form.serialize()
    var encuentros = $('.encuentro')

    $("#waitIconFecha").css("display", "block");
    //Inicio función que trae la fecha de los encuentros
    
    $.ajax({
      url: actionUrl,
      method: 'POST',
      data: data,
      success: await function (response) {  
        
        if (response.success) {
          let encuentros = $('#encuentros'); // Asumiendo que encuentros es un elemento jQuery
          let fechaFormateada, encuetroText, fechaCorta;
  
            // encuetroText = encuentros.eq(0).text().substring(0, 2);
            // fechaCorta = response.objeto.encuentro1.substring(5, 10);
            // alert(encuentros.eq(0).text())
            // alert(encuetroText + " : " + fechaCorta + '*')
            // encuentros.eq(0).text(encuetroText + " : " + fechaCorta + '*');
  

            // fechaFormateada = response.objeto.encuentro2;
            // encuetroText = encuentros.eq(0).text().substring(0, 2);
            // fechaCorta = response.objeto.encuentro2.substring(5, 10);
            // encuentros.eq(1).text(encuetroText + " : " + fechaCorta + '*');


            // fechaFormateada = response.objeto.encuentro3;
            // encuetroText = encuentros.eq(0).text().substring(0, 2);
            // fechaCorta = response.objeto.encuentro2.substring(5, 10);
            // encuentros.eq(2).text(encuetroText + " : " + fechaCorta + '*');

            // fechaFormateada = response.objeto.encuentro4;
            // encuetroText = encuentros.eq(0).text().substring(0, 2);
            // fechaCorta = response.objeto.encuentro2.substring(5, 10);
            // encuentros.eq(3).text(encuetroText + " : " + fechaCorta + '*');

            // fechaFormateada = response.objeto.encuentro5;
            // encuetroText = encuentros.eq(0).text().substring(0, 2);
            // fechaCorta = response.objeto.encuentro2.substring(5, 10);
            // encuentros.eq(4).text(encuetroText + " : " + fechaCorta + '*');
    
        //   btnOpenModal.prop('disabled', false);
        // $('.modal').hide()
        // $('#waitIconFecha').css("display", "none"); 
        } else {
          $('#efRowNumber').val(0)
          location.reload();
        }
        
        location.reload();
        
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

  $("th").click(async function (event) {
    event.preventDefault();
    var row = $(this).parent();
    var col = $(this);
    var colIndex = col.index() + 1
    var tdIndex = colIndex + 3
    var head = col.text()
    var td = $("td")
    var tdParent = td.parent();
    var ocultable = $('.ocultable')
    var ocultable2 = $('.ocultable2')
    var cantCol = ($("td").length) / ($("tr").length - 2) - 1

    switch (head.toString().substring(0,2)) {
      case "1°": case "2°": case "3°": case "4°" : case "5°" :
          ocultable.hide() 
          
          $('td:nth-child('+tdIndex+')').show()
          $('th:nth-child('+colIndex+')').show()
          col.prepend('<<- ')
        break;
      case ("Va"):
        ocultable.hide() 
        $('td:nth-child(7),th:nth-child(4)').show();
        col.prepend('<<- ')
        break;
        case ("<<"):
          ocultable.show()
          ocultable2.show()
          var nuevoContenido = col.text().replace("<<- ", "");
          col.html(nuevoContenido);
        break;
      
    }
    
  });

  $("table button.btnChange").click(async function (event) {
    event.preventDefault();
    
    var button = $(this);
    var tr = button.closest('tr');
    
    // Obtén el valor actual del botón y cambia al estado contrario
    var isPresente = button.hasClass('w3-border-indigo');
    button.removeClass('w3-border-indigo w3-border-red');
    
    if (isPresente) {
      button.addClass('w3-border-red').html('Ausente');
    } else {
      button.addClass('w3-border-indigo').html('<strong>Presente</strong>');
    }

    // También puedes realizar otras acciones aquí, como guardar el estado en algún lugar.

    // Ejemplo de obtener la información de la fila
    var rowNumber = tr.attr('rowNumber');
    //var rowNumber = tr.find("td:eq(0)").html();
    await  tr.find(".modified").html('true')
    var encuentros = [];
    $('.btn_save').prop('disabled', false)
    $('.btn_save').addClass('btn-outline-success')
  });


  function slcCss(select){
    switch (select.val()) {
      case "aprobado":
        select.removeClass('w3-border-red w3-border-orange').addClass('w3-border-green');
        break;
      case "ausente":
        select.removeClass('w3-border-blue w3-border-orange').addClass('w3-border-red');
        break;
      case "desaprobado":
        select.removeClass('w3-border-red w3-border-blue').addClass('w3-border-orange');
        break;
    }
  }

  $("table select.slcChange").change(async function (event) {
    event.preventDefault();
    
    var select = $(this);
    var tr = select.closest('tr');
    
    var rowNumber = tr.attr('rowNumber');
    //var rowNumber = tr.find("td:eq(0)").html();
    slcCss(select)
    await  tr.find(".modified").html('true')
    var encuentros = [];
    $('.btn_save').prop('disabled', false)
  $('.btn_save').addClass('btn-outline-success')
  });


  //--->save whole row entery > start	
  $(document).on('click', '.btn_save',async function(event) 
  {
    event.preventDefault();
    $('.btn_save').attr('disabled','disabled');
    $('#waitIconAsignatura').css("display", "block");
    var arrayJson = []
    $("table > tbody > tr").each(async function () {
      //await  tr.find(".modified").html('true')
      if ($(this).find(".modified").html() == 'true') {

        let rowNumber = $(this).attr('rowNumber');
        
        let arr = {};
        $(this).find('.row_data').each(function(index, val) {   
          let col_name = $(this).attr('col_name')
          let col_val = ($(this).val() || $(this).text())

          // Utiliza switch para mapear los valores
          switch (col_val) {
              case "Presente":
                  arr[col_name] = 'TRUE';
                  break;
              case "Ausente":
                  arr[col_name] = 'FALSE';
                  break;
              case "Seleccione":
                  arr[col_name] = '';
                  break;
              default:
                  // Otros casos, asigna el valor tal cual
                  arr[col_name] = col_val;
                  break;
    }
      });
        
        $.extend(arr, {rowNumber: rowNumber-2})

        arrayJson.push(arr)

      }			
    })
    $.ajax({
      
      url: '/cursante/put',
      contentType: 'application/json',
      method: 'PUT',
      data: JSON.stringify({arrayJson}),
      dataType: 'text',
      
      success: function (response) {  
        $('#waitIconAsignatura').css("display", "none");
        $('.btn_save').prop('disabled', false);
        $('#myModal').modal('show')
        $('#cant').html(arrayJson.length);
      }
      
      });
      $(document).ajaxStop(function(){
      window.location.reload();
    });


  });

  //////////////////


    //== CUANDO SE SELECCIONA COHORTE ===============
    $('#cohorteClave').on('change', function () {

        var cohorteClave = $(this).val();
        var campoClave = $('#efCampo').val();
      $("#waitIconAsignatura3").css("display", "block");
      $.ajax({
          url: '/encuentroFecha/getAjax',
          contentType: 'application/json',
          method: 'GET',
          data: {
            campoClave: campoClave,
            cohorteClave: cohorteClave
        },
        dataType: 'json',
          success: function (response) { 
              // alert("nroEncuentros: " + response.cohorte.nroEncuentros )
              
              $("#waitIconAsignatura3").css("display", "none");
          }
      });
      filtrarCursantes();
  });



  /////////////////

    // Filtrar cursantes al cargar la página
   filtrarCursantes();
   ocultarPresents3encuentros()
  
 
    function filtrarCursantes() {
      var cohorteSeleccionada = $("#cohorteClave").val().toLowerCase();
      var contadorFila = 0;
      var contadorCursantesFiltrados = 0;
      var spnNroCursantes = $("#spnNroCursantes")
      
      $("tr[rowNumber]").each(function(index, fila) {
        var cursoCursante = $(fila).find("td:nth-child(10)").text().toLowerCase();
        
        if (cursoCursante.includes(cohorteSeleccionada)) {
          $(fila).show();
          contadorFila++;
          contadorCursantesFiltrados++;
          $(fila).find("td:nth-child(2)").text(contadorFila + ' | ' + $(fila).find("td:nth-child(2)").text().split(' | ')[1]);
          
          if (contadorFila % 2 === 0) {
            $(fila).css("background-color", "#f2f2f2");
          } else {
            $(fila).css("background-color", "#ffffff");
          }
        } else {
          $(fila).hide();
        }

      });
      
      spnNroCursantes.text(contadorCursantesFiltrados);
    }

    function ocultarPresents3encuentros() {
      var cohorteParaFiltrar = '1ch';
  
      $("tr[rowNumber]").each(function(index, fila) {
          var cursoCursante = $(fila).find("td:nth-child(10)").text().toLowerCase();
  
          if (cursoCursante.includes(cohorteParaFiltrar.toLowerCase())) {
              // Ocultar los botones de presente/ausente para los encuentros 4 y 5
              $(fila).find("td:nth-child(7) button, td:nth-child(8) button").hide();
          }
      });
  }
  
  /////////////////////////////

  $(document).ready(function() {
    $("#copyEmailsBtn").click(function() {
        var emails = [];
        // Itera sobre las filas visibles y agrega los correos electrónicos a la lista
        $("tr:visible").each(function() {
            var email = $(this).find("td:last-child").text().trim();
            if (email !== "") {
                emails.push(email);
            }
        });

        // Convierte la lista de correos electrónicos en una cadena separada por comas
        var emailsStr = emails.join(", ");

        // Copia la cadena al portapapeles
        var tempInput = $("<input>");
        $("body").append(tempInput);
        tempInput.val(emailsStr).select();
        document.execCommand("copy");
        tempInput.remove();

        // Muestra un mensaje de éxito
        alert(emails.length + " correos electrónicos han sido copiados al portapapeles.");
    });
});




}); 
