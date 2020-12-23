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
      console.log(result)
      res.json({success: true, message: "record received", data: result})
    })
  });
}
