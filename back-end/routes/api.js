var sendMail = require("./../config/mail.js");
var mailHtml = require("./../html/mail.js")

module.exports = (app, db) => {
  app.post('/api/questions', function(req,res){
    var requestObject = JSON.parse(req.body);

    db.query("INSERT INTO questions (name, question) VALUES ('"+requestObject.name+"', '"+requestObject.question+"')", function(err, result) {
    	if(err){
    		throw new Error(err)
    	}

      sendMail(mailHtml.questionSubmitted(requestObject), res);
    });
  });

  app.get('/api/questions', function(req,res){
    db.query("SELECT * FROM questions", function(err, result){
      if(err){
        throw new Error(err)
      }
      res.json({success: true, message: "records received", data: result})
    })
  });

  app.post('/api/answer', function(req, res){
    var requestObject = JSON.parse(req.body);

    db.query("INSERT INTO answers (name, answer, question_id) VALUES ('"+requestObject.name+"', '"+requestObject.answer+"','"+requestObject.questionId+"')", function(err, result) {
      if(err){
        throw new Error(err)
      }
      res.json({success: true, message: "record added"})
    });
  });
}
