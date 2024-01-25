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
  btnOpenModal.on('click', async function () {
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

    alert(head.length)
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
}); 
