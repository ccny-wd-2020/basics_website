var path = require('path');
var db = require('./../database/connection.js')();

module.exports = (app) => {
  app.post('/api/questions', function(req,res){
    var requestObject = JSON.parse(req.body);

    db.query("INSERT INTO questions (name, question) VALUES ('"+requestObject.name+"', '"+requestObject.question+"')", function(err, result) {
    	if(err){
    		throw new Error(err)
    	}
      res.json({success: true, message: "record added"})
    });
  });
}
