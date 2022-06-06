$(document).ready(function () {

  console.log("entro a dISTRITOS.js");
  $('#inputCurso').on('change', function () {
      var selector = $(this).val();
      $("#waitIcon").css("display", "block");
      $.ajax({
          url: '/cargo/'+selector,
          contentType: 'application/json',
          method: 'GET',
          data: JSON.stringify({ name: selector }),
          dataType: 'text',
          success: function (response) {
              console.log("RESPONSE",response)
              var jsonResponser = JSON.parse(response);
              var slcAsignatura = $('#inputAsignatura');
              slcAsignatura.html('');
              $('#inputAsignatura').removeAttr('disabled');
              slcAsignatura.attr('selected', false);
              slcAsignatura.append("<option value='' selected='' disabled=''>Seleccionar</option>\ ");
              
              jsonResponser.forEach(function (m) {
                slcAsignatura.append("<option value='"+m.id+"' > " + m.asignatura + " </option>\ ");
                  console.log(m.nombre);
              })
              $("#waitIcon").css("display", "none");
          }
      });
  });




  //prueba la concección con el js
    $(document).ready(function(){
      $("button").click(function(){
        alert("hola");
        $.ajax({url: "demo_test.txt", success: function(result){
          $("#div1").html(result);
        }});
      });
    });
}); 
