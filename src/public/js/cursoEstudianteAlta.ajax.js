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
   
    $('#divFormAlta').show('slow');
   
  })

  //Botón cancelar
  $('#btnCancelar').on('click', function(){
    $('#divFormAlta').hide('slow');
    $('#lblFormAlta').hide('slow')
    btnAlta.prop("disabled", false);
  })

}); 
