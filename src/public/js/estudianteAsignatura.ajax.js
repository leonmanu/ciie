$( window ).on( "load", function() {
	var spncurso = $('#spnCurso').html();
	var idAsignatura = $('#spnIdAsignatura').val();
	//AJAX	obtener estudiantes///////////////////////
	var tbl = '';

 
	//--->save whole row entery > start	
	$(document).on('click', '.btn_save', function(event) 
	{
		event.preventDefault();
		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');
		var rowNumber = tbl_row.attr('rowNumber');

		tbl_row.find('.w3-select').prop("disabled", true);
		tbl_row.find('.w3-input').prop("disabled", true);

		//--->get row data > start
		var arr = {}; 
		tbl_row.find('.row_data').each(function(index, val) 
		{   
			var col_name = $(this).attr('col_name');  
			var col_val  =  $(this).val();
			arr[col_name] = col_val;
		});

		

		//--->get row data > end

		//use the "arr"	object for your ajax call
		$.extend(arr, {estudiante:row_id, asignatura:idAsignatura, rowNumber: rowNumber});

		//out put to show
		$('.post_msg').html( '<pre class="w3-green">'+JSON.stringify(arr, null, 2) +'</pre>')
		//alert(arr.rowNumber) 

		$.post(`/calificacion/post`,{
			arr
		},
		function (data, status) {
			//alert("Se envió la calificación")
		});
	});
	//--->save whole row entery > end


}); 