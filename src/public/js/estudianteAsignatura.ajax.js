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
		await  $(this).find(".estudiante").addClass('text-success')
		await  $(this).find(".change").html('true')
		$('.btn_save').prop('disabled', false)
		$('.btn_save').addClass('btn-outline-success')
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
						let col_val  =  ""
						if ($(this).val()) {
							col_val = $(this).val()
						}
						arr[col_name] = col_val
					})
				
				$.extend(arr, {estudiante: estudiante_id, asignatura: idAsignatura, rowNumber: rowNumber})

				arrayJson.push(arr)

			}			
		})
		$.ajax({
			
			url: '/calificacion/post',
			contentType: 'application/json',
			method: 'POST',
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

		// $.post(`/calificacion/post`,{
		// 	arr
		// },
		// function (data, status) {
		// 	//alert("Se envió la calificación")
		// });
	});
	//--->save whole row entery > end


	$('.cuatri1').addClass('d-none')//invicibilizo el 1er cuatri
	$('.cierre').addClass('d-none')//invicibilizo el 1er cuatri
	//$('.cierre').addClass('d-none')//invicibilizo el 1er cuatri
	var tbl_row
	var numeroElementos
	var totalElementos = $('#totalElementos')

	$('.modalEdit').on('click', async function(event){
		event.preventDefault()
		tbl_row = await $(this).closest('tr')
		numeroElementos = $(this).closest('table').find('tr').length - 1
		totalElementos.html( numeroElementos )
		await rellenarInputModal(tbl_row)
	});

	$('.btn_form').on('click', async function(event){
		event.preventDefault();
		if ($('#form_change').html()=='true') {
		await actualizarTabla()
		}
	})

	$('#estudianteSiguiente').on('click', async function(event){
		event.preventDefault();
		tbl_row = await tbl_row.next()
		await rellenarInputModal(tbl_row)
	})

	$('#estudianteAnterior').on('click', async function(event){
		event.preventDefault();
		tbl_row = await tbl_row.prev()
		await rellenarInputModal(tbl_row)
	})

	$('.modal_data').change( async function(){
		$('#form_change').html('true')
	} )

	function actualizarTabla(){
		var arrayData = $('.data_inverse')
		var arrayRow = tbl_row.find('.clone_data')
		let j = 0

		arrayData.each(async function(callback){
		arrayRow[j].value = arrayData[j].value
		j++
		})
		tbl_row.find("td:eq(1)").addClass('text-success')
		$('.btn_save').prop('disabled', false)
		$('.btn_save').addClass('btn-outline-success')
		tbl_row.find("td:eq(0)").html('true')
		$('#form_change').html('false')
		rellenarInputModal(tbl_row)
	}

	function rellenarInputModal(tbl_row){
		
		var arrayRow = tbl_row.find('.clone_data')
		var arrayModal = $('.modal_data')
		var estudiante = $('#estudiante')
		var index = $('#index')

		estudiante.html(tbl_row.find('.estudiante').html())
		index.html(tbl_row.index()+1)

		if (index.html() == 1) {
		$('#estudianteAnterior').addClass('btn-disabled')
		$('#estudianteAnterior').removeClass('btn-info')
		$('#estudianteAnterior').attr('disabled', 'disabled');
		} else {
		$('#estudianteAnterior').addClass('btn-info')
		$('#estudianteAnterior').removeClass('btn-disabled')
		$('#estudianteAnterior').removeAttr('disabled');
		}

		if (index.html() == numeroElementos) {
		$('#estudianteSiguiente').addClass('btn-disabled')
		$('#estudianteSiguiente').removeClass('btn-info')
		$('#estudianteSiguiente').attr('disabled', 'disabled');
		} else {
		$('#estudianteSiguiente').addClass('btn-info')
		$('#estudianteSiguiente').removeClass('btn-disabled')
		$('#estudianteSiguiente').removeAttr('disabled');
		}

		let i = 0
		arrayRow.each(async function(){
		await arrayModal.html('')
		let valor = $(this).val()
		let clon = $(this).clone().appendTo(arrayModal.eq(i)).addClass('data_inverse')
		clon.val(valor)
		i++
		})
	}

	$('#slcMotivoBajaId').on('change', function () {
		var selector = $(this).val();
		if (selector == 1 || selector == 3) {
		$('#divCursoId').attr('hidden', false);
		$('#inputCurso').prop('required',true);
		} else {
		$('#inputCurso').val('').prop('required',false);
		$('#divCursoId').attr('hidden', true);
		}
	})

	$('#periodo1').on('click', async function(){
		$('.cuatri2').addClass('d-none')
		$('.cierre').addClass('d-none')
		$('.cuatri1').removeClass('d-none')
	})

	$('#periodo2').on('click', async function(){
		$('.cuatri1').addClass('d-none')
		$('.cierre').addClass('d-none')
		$('.cuatri2').removeClass('d-none')
	})

	$('#periodoFinal').on('click', async function(){
		$('.cuatri1').addClass('d-none')
		$('.cuatri2').addClass('d-none')
		$('.cierre').removeClass('d-none')
	})

	$('.valoracion3').on('change', async function(event){
		event.preventDefault()
		var currentRow = $(this).closest("tr")
		promedio2(currentRow)
	});

	$('.valoracion4').on('change', async function(event){
		event.preventDefault()
		var currentRow = $(this).closest("tr")
		promedio2(currentRow)
	});

	$('.valoracion5').on('change', async function(event){
		event.preventDefault()
		var currentRow = $(this).closest("tr")
		var val5 = currentRow.find(".valoracion5")
		var val6 = currentRow.find(".valoracion6")
		var val7 = currentRow.find(".valoracion7")
		var val8 = currentRow.find(".valoracion8")
		var num5 = parseInt(val5.val())
		if (num5 >= 7) {
			val6.val(0)
			val6.addClass('bg-secondary')
			val6.prop('disabled', true)

			val7.val(0)
			val7.addClass('bg-secondary')
			val7.prop('disabled', true)

			val8.val(num5)
		}
		else {
			val6.removeClass('bg-secondary')
			val6.prop('disabled', false)

			val7.removeClass('bg-secondary')
			val7.prop('disabled', false)

			val8.val(" ")
		}
	});

	$('.valoracion6').on('change', async function(event){
		event.preventDefault()
		var currentRow = $(this).closest("tr")
		var val6 = currentRow.find(".valoracion6")
		var val7 = currentRow.find(".valoracion7")
		var val8 = currentRow.find(".valoracion8")
		var num6 = parseInt(val6.val())
		if (num6 >= 4) {
			val7.val(0)
			val7.addClass('bg-secondary')
			val7.prop('disabled', true)

			val8.val(num6)
		}
		else {
			val7.removeClass('bg-secondary')
			val7.prop('disabled', false)

			val8.val(" ")
		}
	});

	$('.valoracion7').on('change', async function(event){
		event.preventDefault()
		var currentRow = $(this).closest("tr")
		var val7 = currentRow.find(".valoracion7")
		var val8 = currentRow.find(".valoracion8")
		var num7 = parseInt(val7.val())
		if (num7 >= 4) {
			val8.val(num7)
		}
		else {
			val8.val(" ")
		}
	});



	async function promedio2 (currentRow){
		var val3 = currentRow.find(".valoracion3")
		var val4 = currentRow.find(".valoracion4")
		var val5 = currentRow.find(".valoracion5")
		var val6 = currentRow.find(".valoracion6")
		var val7 = currentRow.find(".valoracion7")
		var val8 = currentRow.find(".valoracion8")
		var num3 = parseInt(val3.val())
		var num4 = parseInt(val4.val())
		var promedio
		if (val4.val() && val3.val()) {
			promedio = Math.ceil((num3 + num4)/2)
			val5.val(promedio)
			if (promedio >= 7) {
				val8.val(promedio)
				val6.val(0)
				val6.addClass('bg-secondary')
				val6.prop('disabled', true)

				val7.val(16)
				val7.addClass('bg-secondary')
				val7.prop('disabled', true)
			} else {
				val6.removeClass('bg-secondary')
				val6.prop('disabled', false)

				val7.removeClass('bg-secondary')
				val7.prop('disabled', false)

				val8.val(" ")
			}
		}

		
	}

	function openCity(evt, cityName) {
		var i, tablinks;
	  
		tabbtns = document.getElementsByClassName("tabbtn");
		for (i = 0; i < tabbtns.length; i++) {
		  tabbtns[i].className = tabbtns[i].className.replace(" active", "");
		}
		evt.currentTarget.className += " active";
		//evt.currentTarget.firstElementChild.className += " text-success";
	  }

});