exports.getQuestionError = function(questionId){
  var errorHtml = "";
  errorHtml += '<html>';
  errorHtml += '<head>';
  errorHtml += '<meta charset="utf-8">'
  errorHtml += '<title>Error Page</title>'
  errorHtml += '<link rel="stylesheet" href="../css/index.css">'
  errorHtml += '</head>';
  errorHtml += '<body>';
  errorHtml += '<header><div class="header-links"><span id="header-basics">Welcome to the Basics</span><span><a class="header-link" href="/">Home</a><a class="header-link" href="/questions">Questions</a><a class="header-link" href="/ask-question">Ask a Question</a></span></div></header>';
  errorHtml += "<h1>question id " + questionId + " not found</h1>";
  errorHtml += '</body></html>';
  return errorHtml
}

exports.getQuestionSuccess = function(questionId, question, answers){
  var htmlString = '<html>';
  htmlString += '<head>';
  htmlString += '<meta charset="utf-8">'
  htmlString += '<title>Question: '+question+'</title>'
  htmlString += '<link rel="stylesheet" href="/css/index.css">'
  htmlString += '</head>';
  htmlString += '<body>';
  htmlString += '<header><div class="header-links"><span id="header-basics">Welcome to the Basics</span><span><a class="header-link" href="/">Home</a><a class="header-link" href="/questions">Questions</a></span></div></header>';
  htmlString += "<h1>" + question + "</h1>";
  htmlString += "<a href='/answer-question/"+questionId+"'><button data-id="+questionId+">Answer Question</button></a>";
  htmlString += "<h2>Answers</h2>";
  htmlString += "<div id='answers-div'>";
  for(var i = 0; i < answers.length; i++){
    htmlString += "<p class='answer'>"+answers[i].answer+"</p>";
  }
  htmlString += "</div>";
  htmlString += '<script src="../js/index.js" charset="utf-8"></script>';
  htmlString += '</body></html>';

  return htmlString;
}

/* TODO: Parameterize */
exports.questionSubmittedSuccess = function(){
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

  return successHtml;
}

exports.answerQuestion = function(question, questionId){
  var htmlString = '<html>';
  htmlString += '<head>';
  htmlString += '<meta charset="utf-8">'
  htmlString += '<title>Question: '+question+'</title>'
  htmlString += '<link rel="stylesheet" href="../css/index.css">'
  htmlString += '</head>';
  htmlString += '<body>';
  htmlString += '<header><div class="header-links"><span id="header-basics">Welcome to the Basics</span><span><a class="header-link" href="/">Home</a><a class="header-link" href="/questions">Questions</a><a class="header-link" href="/ask-question">Ask a Question</a></span></div></header>';
  htmlString += "<h1><a href='/questions/"+questionId+"'>" + question + "</a></h1>";
  htmlString += '<form id="answer-form">';
  htmlString += '<label>Name</label>';
  htmlString += '<br>';
  htmlString += '<input type="text" id="name-input" placeholder="Your Name">';
  htmlString += '<br><br>';
  htmlString += '<label>Answer</label>';
  htmlString += '<br>';
  htmlString += '<textarea id="answer-input" data-id="'+questionId+'" placeholder="Your Answer to The Question" rows="8" cols="80"></textarea>';
  htmlString += '<br><br>';
  htmlString += '<input type="submit" value="Submit">';
  htmlString += '</form>';
  htmlString += '<script src="../js/index.js" charset="utf-8"></script>';
  htmlString += '<script src="../js/questions/answer_question.js" charset="utf-8"></script>';
  htmlString += '</body></html>';

  return htmlString;
}

exports.answerSubmittedSuccessfully = function(){
  var successHtml = "";
  successHtml += '<html>';
  successHtml += '<head>';
  successHtml += '<meta charset="utf-8">'
  successHtml += '<title>Answer Submitted</title>'
  successHtml += '<link rel="stylesheet" href="../css/index.css">'
  successHtml += '</head>';
  successHtml += '<body>';
  successHtml += '<header><div class="header-links"><span id="header-basics">Welcome to the Basics</span><span><a class="header-link" href="/">Home</a><a class="header-link" href="/questions">Questions</a><a class="header-link" href="/ask-question">Ask a Question</a></span></div></header>';
  successHtml += "<h1 class='submission-header-text'>Answer Submission Successful</h1>";
  successHtml += '</body></html>';

  return successHtml;
}
