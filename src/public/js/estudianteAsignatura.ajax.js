$( window ).on( "load", function() {
	var spncurso = $('#spnCurso').html();
	var idAsignatura = $('#spnIdAsignatura').val();
	//AJAX	obtener estudiantes///////////////////////
	var tbl = '';


	$("table > tbody > tr").change(async function (event) {
		event.preventDefault();
		var tbl_row = await $(this).closest('tbody > tr');
		//var row_id = tbl_row.attr('row_id');
   		var row_estudiante = await  $(this).find(".estudiante").html()
		await  $(this).find(".estudiante").css('font-weight', 'bold')
		await  $(this).find(".change").html('true')
    	var row_cLectivo = tbl_row.find("td:eq(3)").html()
    	var row_estudianteNombre = tbl_row.find("td:eq(0)").find('div').html()
	});  


	//--->save whole row entery > start	
	$(document).on('click', '.btn_save',async function(event) 
	{
		event.preventDefault();
		$('.btn_save').attr('disabled','disabled');
		$('#waitIconAsignatura').css("display", "block");
		var arrayJson = []
		
		$("table > tbody > tr").each(async function () {
			if ($(this).find(".change").html() == 'true') {
				let estudiante_id = $(this).attr('estudiante_id');
				let rowNumber = $.trim($(this).find('.rowNumber').html()) ;
				let arr = {};
				$(this).find('.row_data').each(function(index, val) 
					{   
						let col_name = $(this).attr('col_name')
						let col_val  =  $(this).val()
						arr[col_name] = col_val
					})
				
				$.extend(arr, {estudianteId: estudiante_id, asignatura: idAsignatura, rowNumber: rowNumber})

				arrayJson.push(arr)
				alert(arr.estudianteId)
			}			
		})
		alert(arrayJson)
		//tbl_row.find('.waitIconAsignatura').css("display", "none");
		$.ajax({
			
			url: '/calificacion/post',
			contentType: 'application/json',
			method: 'POST',
			data: JSON.stringify({arrayJson}),
			dataType: 'text',
			
			success: function (response) {  
				$('#waitIconAsignatura').css("display", "none");
				$('.btn_save').prop('disabled', false);
				alert("Se modificaron las calificaciones de "+ response + " estudiante/s")
			}
			
		  });


		// $.post(`/calificacion/post`,{
		// 	arr
		// },
		// function (data, status) {
		// 	//alert("Se envió la calificación")
		// });
	});
	//--->save whole row entery > end


}); 