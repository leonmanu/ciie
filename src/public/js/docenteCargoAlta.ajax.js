$(document).ready(function () {


  //carga curso cuando se selecciona el rol
  $('#inputRol').on('change', function () {
    var selector = $(this).val();
    
    if (selector == 6) {
      $("#waitIconCurso").css("display", "block");
      var slcAsignatura = $('#inputAsignatura');
      slcAsignatura.html('');
      slcAsignatura.append("<option value='' selected='' disabled=''>Seleccione una asignatura</option>\ ");
      slcAsignatura.prop("disabled", true);
      $.ajax({
        url: '/curso',
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({ id: selector }),
        dataType: 'text',
        success: function (response) {
            var jsonResponser = JSON.parse(response);
            var slcCurso = $('#inputCurso');
            slcCurso.html('');
           // $('#inputCurso').removeAttr('disabled');
           slcCurso.attr('selected', false);
           slcCurso.append("<option value='' selected='' disabled=''>Seleccione un curso</option>\ ");
            
            jsonResponser.forEach(function (m) {
              slcCurso.append("<option value='"+m.idCurso+"' > " + m.clave + " - " + m.turnoNombre + " </option>\ ");
                console.log(m.nombre);
            })
            slcCurso.removeAttr('disabled')
            $("#waitIconCurso").css("display", "none");
        }
    });
    } else {
      
      $("#waitIconAsignatura").css("display", "block");
      var slcCurso = $('#inputCurso');
      slcCurso.prop("disabled", true);
      slcCurso.html('')
      slcCurso.append("<option value='' selected='' disabled=''>Seleccione un curso</option>\ ");
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


  $('#inputCurso').on('change', function () {
      var selector = $(this).val();
      $("#waitIconAsignatura").css("display", "block");
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
              slcAsignatura.append("<option value='' selected='' disabled=''>Seleccione una asignatura</option>\ ");
              
              jsonResponser.forEach(function (m) {
                slcAsignatura.append("<option value='"+m.id+"' > " + m.asignatura + " </option>\ ");
                  console.log(m.nombre);
              })
              $("#waitIconAsignatura").css("display", "none");
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
