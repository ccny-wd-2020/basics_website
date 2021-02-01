var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

/* Passport */
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var PORT = process.env.PORT || 8000;

var databaseConnection = require("./database/connection.js");

var pageRoutes = require('./routes/pages.js');
var apiRoutes = require('./routes/api.js')

require('./config/passport')(passport, databaseConnection);
var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

app.use(morgan('dev'));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
	secret: "secret",
	resave : true,
	saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static('./front-end'));

pageRoutes(app, path, databaseConnection);
apiRoutes(app, databaseConnection, passport);

app.listen(PORT, function(){
	console.log("Listening on PORT " + PORT);
});
