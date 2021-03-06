const pagesHtml = require('../html/pages.js');
var socialNetworkHtml = require('./../html/social_network.js');

module.exports = (app, path, db) => {
  app.get('/', function(req,res){
  	res.sendFile(path.join(__dirname, '../../front-end/html/index.html'));
  });

  app.get('/javascript/running-front-end', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/running_javascript/running_javascript_front_end.html'));
  });

  app.get('/javascript/running-back-end', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/running_javascript/running_javascript_back_end.html'));
  });

  app.get('/node/npm-install', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/node/npm_install.html'));
  });

  app.get('/github/cloning', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/github/cloning_empty_github_repository.html'));
  });

  app.get('/github/creating-repository-with-readme', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/github/creating_github_with_readme.html'));
  });

  app.get('/github/creating-repository-without-readme', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/github/creating_github_without_readme.html'));
  });

  app.get('/github/syncing-repository-with-readme', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/github/syncing_github_with_readme.html'));
  });

  app.get('/github/syncing-repository-without-readme', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/github/syncing_github_without_readme.html'));
  });

  app.get('/heroku/pushing', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/hosting/pushing_to_heroku.html'));
  });

  app.get('/paid-hosting/pushing', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/hosting/pushing_to_host.html'));
  });

  app.get('/questions', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/questions_answers/questions.html'))
  });

  app.get('/ask-question', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/questions_answers/ask_a_question.html'))
  });

  app.get('/questions/:id', function(req, res){
    var questionId = req.params.id;
    if(Number.isInteger(parseInt(questionId))){
      db.query("SELECT * FROM questions where id=" + questionId, function(questionErr, questionResult){
        if(questionErr){
          throw new Error(questionErr)
        }
        if(questionResult.length == 0){
          const errorHtml = pagesHtml.getQuestionError(questionId);

          res.set('Content-Type', 'text/html');
          res.status(404).send(errorHtml);
        } else {
          db.query("SELECT * FROM answers where question_id=" + questionId, function(answersErr, answersResult){
            if(answersErr){
              throw new Error(answersErr)
            }
            const question = questionResult[0].question
            const getQuestionSuccessHtml = pagesHtml.getQuestionSuccess(questionId, question, answersResult);

            res.set('Content-Type', 'text/html');
            res.status(200).send(getQuestionSuccessHtml);
          });
        }
      });
    } else if (questionId == "submitted") {
      var questionSubmittedSuccessHtml = pagesHtml.questionSubmittedSuccess();

      res.set('Content-Type', 'text/html');
      res.status(200).send(questionSubmittedSuccessHtml);
    }
  });

  app.get('/answer-question/:id', function(req, res){
    var answerId = req.params.id;
    if(Number.isInteger(parseInt(answerId))){
      db.query("SELECT * FROM questions where id=" + answerId, function(questionErr, questionResult){
        if(questionErr){
          throw new Error(questionErr)
        }
        var answerQuestionHtml = pagesHtml.answerQuestion(questionResult[0].question, answerId)

        res.set('Content-Type', 'text/html');
        res.send(answerQuestionHtml);
      })
    } else if (answerId == "submitted") {
      var answerSubmittedSuccessfullyHtml = pagesHtml.answerSubmittedSuccessfully()

      res.set('Content-Type', 'text/html');
      res.status(200).send(answerSubmittedSuccessfullyHtml);
    }

  });

  app.get('/social-network', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/social_network/main_page.html'))
  });

  app.get('/social-network/sign-up', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/social_network/sign_up.html'));
  });

  app.get('/social-network/sign-in', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/social_network/sign_in.html'));
  });

  app.get('/social-network/profile/:username', (req,res) => {
    if(req.user){
      if(req.user.username == req.params.username){
        var userInfo = [];
        var query = `SELECT name FROM users WHERE id=${req.user.id}`;
        var profileArr = [];
        db.query(query, (error,queryRes) => {
          var userArr = [];
          if(error){
            res.json({error: error})
          } else {
            userArr.push(queryRes[0])
          }
          var profileQuery = `SELECT * FROM profile WHERE user_id=${req.user.id}`
          db.query(profileQuery, (profileError, profileRes) => {
            if(profileError){
              res.json({error: profileError})
            } else {
              var data = {
                user: userArr[0],
                profile: profileRes[0]
              }
              res.set('Content-Type', 'text/html');
              res.send(socialNetworkHtml(data));
            }
          })
        });
      } else {
        res.redirect('/social-network');
      }
    } else {
      res.redirect('/social-network');
    }
  });
}
