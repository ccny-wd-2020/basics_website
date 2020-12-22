var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var PORT = process.env.PORT || 8000;

var databaseConnection = require("./database/connection.js")();

//TODO create router controller
var pageRoutes = require('./routes/pages.js');
var apiRoutes = require('./routes/api.js')

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

app.use(express.static('./front-end'));

pageRoutes(app);
apiRoutes(app);

databaseConnection.connect();

app.listen(PORT, function(){
	console.log("Listening on PORT " + PORT);
});
