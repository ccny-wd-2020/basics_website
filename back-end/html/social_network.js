module.exports = (data) => {
	var str = "<html>";
	str += "<head><title>" + data.user.name + "'s Page</title>"
	str += "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>";
	str += '<link rel="stylesheet" type="text/css" href="../../../css/social_network/user_home.css"></head>'
	str += '<body><div class="container"><h1 id="hello">What\'s up ' + data.user.name + '</h1><br>';
	str += createProfile(data.profile)
	str += createNavButtons();
	str += createModal();
	str += "<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>";
	str += '<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>'
	str += "<script src='../../../js/social_network/user_home.js'></script>";
	str += "</body></html>";
	return str;
}

const createProfile = (profile) => {
	if(profile){
		let string = "<h1>Here is your Information</h1>";
		string += "<img src='"+profile.picture_link+"'/><br>"
		string += "<h3>Short Bio: <span class='unbold'>"+profile.bio+"</span></h3>";
		string += "<h3>Favorite Movie: <span class='unbold'>"+profile.favorite_movie+"</span></h3>";
		string += "<h3>Favorite Song: <span class='unbold'>"+profile.favorite_song+"</span></h3>";
		string += "<h3>Favorite Pizza: <span class='unbold'>"+profile.favorite_pizza+"</span></h3>";
		return string;
	} else {
		let htmlString = "<button class='btn btn-success create-bio'>Create Bio</button><br>";
		return htmlString;
	}
}

const createNavButtons = () => {
	let str = "";
	str += '<div class="btn-group" role="group" aria-label="Basic example">'
	str += '<a id="home-button" href="/social-network" type="button" class="btn btn-primary sign-buttons">';
	str += '<span class="glyphicon glyphicon-home" aria-hidden="true"></span>';
	str += '</a>';
	str += '<a id="logout-button" type="button" class="btn btn-danger sign-buttons">Logout</a>'
	str += '</div></div>';
	return str;
}

const createModal = () => {
	let str = "";
	str += '<div class="modal" id="bio-modal" tabindex="-1" role="dialog">';
	str += '<div class="modal-dialog" role="document">';
	str += 	'<div class="modal-content">';
	str += 		'<div class="modal-header">';
	str += 			'<h5 class="modal-title">Create Bio</h5>';
	str += 			'<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
	str += 				'<span aria-hidden="true">&times;</span>'
	str += 			'</button>'
	str += 		'</div>'
	str += 		'<div class="modal-body">'
	str +=			'<form id="bio-form">'
	str +=				'<label>Short Bio</label><br>'
	str +=  			'<textarea id="bio-input"></textarea><br>'
	str +=  			'<label>Bio Picture Link</label><br>'
	str +=				'<input type="text" id="picture-input"/><br>'
	str +=  			'<label>Favorite Movie</label><br>'
	str +=				'<input type="text" id="movie-input"/><br>'
	str +=				'<label>Favorite Song</label><br>'
	str +=				'<input type="text" id="song-input"/><br>'
	str +=				'<label>Favorite Pizza</label><br>'
	str +=				'<input type="text" id="pizza-input"/><br><br>'
	str +=				'<input class="btn btn-danger" type="submit">'
	str +=  		'</form>'
	str += 		'</div>'
	str += 		'<div class="modal-footer">'
	str += 			'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
	str += 		'</div></div></div></div>';
	return str;
}
