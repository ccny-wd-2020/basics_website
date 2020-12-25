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

  app.get('/questions/:id', function(req, res){
    var id = req.params.id;
    db.query("SELECT * FROM questions where id=" + id, function(err, result){
      if(err){
        throw new Error(err)
      }
      db.query("SELECT * FROM answers where question_id=" + id, function(err, answersResult){
        var htmlString = '<html>';
        htmlString += '<head>';
        htmlString += '<meta charset="utf-8">'
        htmlString += '<title>Question: '+result[0].question+'</title>'
        htmlString += '<link rel="stylesheet" href="../css/index.css">'
        htmlString += '</head>';
        htmlString += '</body>';
        htmlString += '<header><a href="/" class="header-links">Home</a><a href="/questions" class="header-links">Questions</a></header>';
        htmlString += "<h1>" + result[0].question + "</h1>";
        htmlString += "<a href='/answer/"+id+"'><button data-id="+id+">Answer Question</button></a>";
        htmlString += "<h2>Answers</h2>";
        for(var i = 0; i < answersResult.length; i++){
          htmlString += "<li>"+answersResult[i].answer+"</li>";
        }
        htmlString += "<ol>";
        htmlString += "</ol>";
        htmlString += '<script src="../js/index.js" charset="utf-8"></script>';
        htmlString += '</body></html>';

        res.set('Content-Type', 'text/html');
  		  res.send(htmlString);
      });
    });
  });

  app.get('/answer/:id', function(req, res){
    var id = req.params.id;
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
      htmlString += '</body>';
      htmlString += '<header><a href="/" class="header-links">Home</a><a href="/questions" class="header-links">Questions</a><a href="/ask-question" class="header-links">Ask a Question</a></header>';
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
  });
}
