module.exports = (app, path, db) => {
  app.get('/', function(req,res){
  	res.sendFile(path.join(__dirname, '../../front-end/html/index.html'));
  });

  app.get('/github/cloning', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/cloning_empty_github_repository.html'));
  });

  app.get('/github/creating-repository-with-readme', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/creating_github_with_readme.html'));
  });

  app.get('/github/creating-repository-without-readme', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/creating_github_without_readme.html'));
  });

  app.get('/github/syncing-repository-with-readme', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/syncing_github_with_readme.html'));
  });

  app.get('/github/syncing-repository-without-readme', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/syncing_github_without_readme.html'));
  });

  app.get('/heroku/pushing', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/pushing_to_heroku.html'));
  });

  app.get('/paid-hosting/pushing', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/instructions/pushing_to_host.html'));
  });

  app.get('/questions', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/questions_answers/questions.html'))
  });

  app.get('/ask-question', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/questions_answers/ask_a_question.html'))
  });

  // app.get('/questions/submitted', function(req,res){
  //   res.sendFile(path.join(__dirname, '../../front-end/html/questions_answers/question_submitted.html'))
  // });

  app.get('/questions/:id', function(req, res){
    var id = req.params.id;
    if(Number.isInteger(parseInt(id))){
      db.query("SELECT * FROM questions where id=" + id, function(questionErr, questionResult){
        if(questionErr){
          throw new Error(questionErr)
        }
        if(questionResult.length == 0){
          var errorHtml = "";
          errorHtml += '<html>';
          errorHtml += '<head>';
          errorHtml += '<meta charset="utf-8">'
          errorHtml += '<title>Error Page</title>'
          errorHtml += '<link rel="stylesheet" href="../css/index.css">'
          errorHtml += '</head>';
          errorHtml += '<body>';
          errorHtml += '<header><div class="header-links"><span id="header-basics">Welcome to the Basics</span><span><a class="header-link" href="/">Home</a><a class="header-link" href="/questions">Questions</a><a class="header-link" href="/ask-question">Ask a Question</a></span></div></header>';
          errorHtml += "<h1>question id " + id + " not found</h1>";
          errorHtml += '</body></html>';

          res.set('Content-Type', 'text/html');
          res.status(404).send(errorHtml);
        } else {
          db.query("SELECT * FROM answers where question_id=" + id, function(answersErr, answersResult){
            if(answersErr){
              throw new Error(answersErr)
            }
            var htmlString = '<html>';
            htmlString += '<head>';
            htmlString += '<meta charset="utf-8">'
            htmlString += '<title>Question: '+questionResult[0].question+'</title>'
            htmlString += '<link rel="stylesheet" href="/css/index.css">'
            htmlString += '</head>';
            htmlString += '<body>';
            htmlString += '<header><div class="header-links"><span id="header-basics">Welcome to the Basics</span><span><a class="header-link" href="/">Home</a><a class="header-link" href="/questions">Questions</a></span></div></header>';
            htmlString += "<h1>" + questionResult[0].question + "</h1>";
            htmlString += "<a href='/answer/"+id+"'><button data-id="+id+">Answer Question</button></a>";
            htmlString += "<h2>Answers</h2>";
            htmlString += "<div id='answers-div'>";
            for(var i = 0; i < answersResult.length; i++){
              htmlString += "<p class='answer'>"+answersResult[i].answer+"</p>";
            }
            htmlString += "</div>";
            htmlString += '<script src="../js/index.js" charset="utf-8"></script>';
            htmlString += '</body></html>';

            res.set('Content-Type', 'text/html');
            res.status(200).send(htmlString);
          });
        }
      });
    } else if (id == "submitted") {
      var successHtml = "";
      successHtml += '<html>';
      successHtml += '<head>';
      successHtml += '<meta charset="utf-8">'
      successHtml += '<title>Question Submitted</title>'
      successHtml += '<link rel="stylesheet" href="../css/index.css">'
      successHtml += '</head>';
      successHtml += '<body>';
      successHtml += '<header><div class="header-links"><span id="header-basics">Welcome to the Basics</span><span><a class="header-link" href="/">Home</a><a class="header-link" href="/questions">Questions</a><a class="header-link" href="/ask-question">Ask a Question</a></span></div></header>';
      successHtml += "<h1 class='submission-header-text'>Question Submission Successful</h1>";
      successHtml += '</body></html>';

      res.set('Content-Type', 'text/html');
      res.status(200).send(successHtml);
    }
  });

  app.get('/answer/:id', function(req, res){
    var id = req.params.id;
    if(Number.isInteger(parseInt(id))){
      db.query("SELECT * FROM questions where id=" + id, function(err, result){
        if(err){
          throw new Error(err)
        }
        var htmlString = '<html>';
        htmlString += '<head>';
        htmlString += '<meta charset="utf-8">'
        htmlString += '<title>Question: '+result[0].question+'</title>'
        htmlString += '<link rel="stylesheet" href="../css/index.css">'
        htmlString += '</head>';
        htmlString += '<body>';
        htmlString += '<header><div class="header-links"><span id="header-basics">Welcome to the Basics</span><span><a class="header-link" href="/">Home</a><a class="header-link" href="/questions">Questions</a><a class="header-link" href="/ask-question">Ask a Question</a></span></div></header>';
        htmlString += "<h1><a href='/questions/"+id+"'>" + result[0].question + "</a></h1>";
        htmlString += '<form id="answer-form">';
        htmlString += '<label>Name</label>';
        htmlString += '<br>';
        htmlString += '<input type="text" id="name-input" placeholder="Your Name">';
        htmlString += '<br><br>';
        htmlString += '<label>Answer</label>';
        htmlString += '<br>';
        htmlString += '<textarea id="answer-input" data-id="'+id+'" placeholder="Your Answer to The Question" rows="8" cols="80"></textarea>';
        htmlString += '<br><br>';
        htmlString += '<input type="submit" value="Submit">';
        htmlString += '</form>';
        htmlString += '<script src="../js/index.js" charset="utf-8"></script>';
        htmlString += '<script src="../js/questions/answer_question.js" charset="utf-8"></script>';
        htmlString += '</body></html>';

        res.set('Content-Type', 'text/html');
        res.send(htmlString);
      })
    } else if (id == "submitted") {
      var successHtml = "";
      successHtml += '<html>';
      successHtml += '<head>';
      successHtml += '<meta charset="utf-8">'
      successHtml += '<title>Error Page</title>'
      successHtml += '<link rel="stylesheet" href="../css/index.css">'
      successHtml += '</head>';
      successHtml += '<body>';
      successHtml += '<header><div class="header-links"><span id="header-basics">Welcome to the Basics</span><span><a class="header-link" href="/">Home</a><a class="header-link" href="/questions">Questions</a><a class="header-link" href="/ask-question">Ask a Question</a></span></div></header>';
      successHtml += "<h1 class='submission-header-text'>Answer Submission Successful</h1>";
      successHtml += '</body></html>';

      res.set('Content-Type', 'text/html');
      res.status(200).send(successHtml);
    }

  });
}
