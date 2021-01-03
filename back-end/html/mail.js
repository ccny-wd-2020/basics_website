exports.questionSubmitted = (requestObject) => {
  var html = "";
  html += '<h1>Question</h1>';
  html += '<p>Name: ' + requestObject.name + '<br>';
  html += 'Question: ' + requestObject.question + '</p>';
  html += '<img src="https://i.ytimg.com/vi/B-uYP8o-gvY/maxresdefault.jpg" height=150 width=300 />'

  return html;
}
