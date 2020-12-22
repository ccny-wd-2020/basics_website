var mysql = require('mysql');

module.exports = () => {
  var databaseConnection = mysql.createConnection({
  	user: 'root',
  	password: '',
  	database: 'basics_website',
  	host: 'localhost',
  	port: 3306
  });

  return databaseConnection;
}
