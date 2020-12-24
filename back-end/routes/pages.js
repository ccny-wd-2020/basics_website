module.exports = (app, path, db) => {
  app.get('/', function(req,res){
  	res.sendFile(path.join(__dirname, '../../front-end/html/index.html'));
  });

  app.get('/github/cloning', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/cloning_empty_github_repository.html'));
  });

  app.get('/github/creating-repository-with-readme', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/creating_github_with_readme.html'));
  });

  app.get('/github/creating-repository-without-readme', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/creating_github_without_readme.html'));
  });

  app.get('/github/syncing-repository-with-readme', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/syncing_github_with_readme.html'));
  });

  app.get('/github/syncing-repository-without-readme', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/syncing_github_without_readme.html'));
  });

  app.get('/heroku/pushing', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/pushing_to_heroku.html'));
  });

  app.get('/paid-hosting/pushing', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/pushing_to_host.html'));
  });

  app.get('/questions', function(req,res){
    res.sendFile(path.join(__dirname, '../../front-end/html/questions.html'))
  })

  app.get('/questions/:id', function(req, res){
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
      htmlString += '<header><a href="/" class="header-links">Home</a></header>';
      htmlString += "<h1>" + result[0].question + "</h1>";
      htmlString += '<form id="answer-form">';
      htmlString += '<label>Name</label>';
      htmlString += '<br>';
      htmlString += '<input type="text" id="name-input" placeholder="Your Name">';
      htmlString += '<br><br>';
      htmlString += '<label>Answer</label>';
      htmlString += '<br>';
      htmlString += '<textarea id="answer-input" data-id="'+result[0].id+'" placeholder="Your Answer to The Question" rows="8" cols="80"></textarea>';
      htmlString += '<br><br>';
      htmlString += '<input type="submit" value="Submit">';
      htmlString += '</form>';
      htmlString += '<script src="../js/index.js" charset="utf-8"></script>';
      htmlString += '<script src="../js/answer.js" charset="utf-8"></script>';
      htmlString += '</body></html>';
      res.set('Content-Type', 'text/html');
		  res.send(htmlString);
    })
  });
}
