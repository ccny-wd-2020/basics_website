var mysql = require('mysql');

module.exports = () => {
  let connection;
  if(process.env.APP_ENV == "local"){
    connection = {
    	user: 'root',
    	password: '',
    	database: 'basics_website',
    	host: 'localhost',
    	port: 3306
    }
  } else if (process.env.APP_ENV == "dev"){
    connection = process.env.JAWSDB_URL;
  }
  var databaseConnection = mysql.createConnection(connection);

  return databaseConnection;
}
