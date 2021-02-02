$(document).ready(function(){

	$('#logout-button').on('click', function(e){
		e.preventDefault();

		$.ajax({
			method: 'DELETE',
			url: '/api/logout-user'
		}).then(function(res){
			window.location.href = "/social-network"
		});
	});

	$(".create-bio").on('click', function(){
		$('#bio-modal').modal('toggle')
	})

	$("#bio-form").on('submit', function(e){
		e.preventDefault();

		const inputs = {
			shortBio: $("#bio-input").val(),
			pictureLink: $("#picture-input").val(),
			movie: $("#movie-input").val(),
			song: $("#song-input").val(),
			pizza: $("#pizza-input").val()
		}

		$.ajax({
			method: 'POST',
			url: '/api/user-bio',
			dataType: 'json',
			data: JSON.stringify(inputs),
			contentType: 'application/json',
			error: function (err) {
				console.log(err);
			}
		}).then(function(res){
			window.location.href = "/social-network/profile/" + res.username;
		})
	});

	$('.glyphicon-edit').click(function(){
		$('#edit-modal').modal('toggle');
		$(".update-field").text($(this).attr("field"));
		$("#edit-input").val($(this).attr("current-value"));
	});

	$("#edit-form").submit(function(e){
		e.preventDefault();

		const field = $(".update-field").eq(0).text();
		const updatedValue = $("#edit-input").val();

		const body = {
			field: field,
			updatedValue: updatedValue
		}

		$.ajax({
			method: 'POST',
			url: '/api/edit-bio',
			dataType: 'json',
			data: JSON.stringify(body),
			contentType: 'application/json',
			error: function (err) {
				console.log(err);
			}
		}).then(function(res){
			$("#"+res.field+"-text").text(res.updatedValue);
			$("#"+res.field+"-edit").attr("current-value", res.updatedValue);
			$('#edit-modal').modal('toggle');
		})

	})

});
