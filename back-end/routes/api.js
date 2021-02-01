var sendMail = require("./../config/mail.js");
var mailHtml = require("./../html/mail.js");

module.exports = (app, db, passport) => {
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

  /* Social Network Stuff */

  app.get('/api/sign-up', function(req,res){
    if(req.user){
      res.json({message: 'signed-in', user_id: req.user.id});
    }
  });

  app.get('/api/sign-in', function(req,res){
    if(req.user){
      res.json({message: 'signed-in', user_id: req.user.id});
    }
  });

  app.post('/api/sign-up', function(req,res,next){
    passport.authenticate('local-signup', function(err, user, info){
      if (err) {
        return next(err);
      } else {
        res.json({user: user, info: info})
      }
    })(req, res, next);
  });

  app.post('/api/sign-in', function(req,res,next){
    passport.authenticate('local-signin', function(err, user, info){
        if (err) {
            return next(err);
        }
        if (!user) {
          return res.json({ success : false, message : 'authentication failed', info: info });
        }
        req.login(user, function(err){
        if(err){
          return next(err);
        }
          return res.status(200).json({ success : true, message : 'authentication succeeded', user : user });
      });
    })(req, res, next);
  });

  app.get('/api/signed-in', (req,res) => {
    if(req.user){
      res.json({message: 'signed-in', user: req.user});
    }
  })

  app.delete('/api/logout-user', function (req, res) {
    req.session.destroy(function(out){
      res.json({loggedOut: true})
    });
  });

  app.post('/api/user-bio', function(req, res){
    let profileQueryString = "INSERT INTO profile (bio, picture_link, favorite_song, favorite_movie, favorite_pizza, user_id) VALUES ";
    profileQueryString += "(";
    profileQueryString += "'"+req.body.shortBio+"',"
    profileQueryString += "'"+req.body.pictureLink+"',"
    profileQueryString += "'"+req.body.song+"',"
    profileQueryString += "'"+req.body.movie+"',"
    profileQueryString += "'"+req.body.pizza+"',"
    profileQueryString += req.user.id
    profileQueryString += ")";
    db.query(profileQueryString, function(err, data){
      if(err){
        throw new Error(err)
      }
      res.json(req.user)
    })
  });
}
