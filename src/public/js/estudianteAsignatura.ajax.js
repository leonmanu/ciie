$( window ).on( "load", function() {
	var spncurso = $('#spnCurso').html();
	var idAsignatura = $('#spnIdAsignatura').val();
	//AJAX	obtener estudiantes///////////////////////
	var tbl = '';

 
	//--->save whole row entery > start	
	$(document).on('click', '.btn_save',async function(event) 
	{
		event.preventDefault();
		$('.btn_save').attr('disabled','disabled');
		$('#waitIconAsignatura').css("display", "block");
		var arrayJson = []
		
		$("table > tbody > tr").each(async function () {
			let row_id = $(this).attr('row_id');
			let rowNumber = $(this).attr('rowNumber');
			let arr = {};
			$(this).find('.row_data').each(function(index, val) 
				{   
					let col_name = $(this).attr('col_name')
					let col_val  =  $(this).val()
					arr[col_name] = col_val
				})
			$.extend(arr, {estudiante: row_id, asignatura: idAsignatura, rowNumber: rowNumber})

			arrayJson.push(arr)
		})
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