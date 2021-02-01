var mysql = require('mysql');

let connection;
if(process.env.APP_ENV == "local"){
  connection = process.env.BASICS_WEBSITE;
} else if (process.env.APP_ENV == "dev"){
  connection = process.env.JAWSDB_URL;
}
var databaseConnection = mysql.createConnection(connection);

databaseConnection.connect();
module.exports = databaseConnection;
