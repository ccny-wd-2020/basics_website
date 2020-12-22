document.querySelector("#question-form").onsubmit = function(e){
  e.preventDefault();

  var nameInput = document.querySelector("#name-input").value;
  var questionInput = document.querySelector("#question-input").value;

  var inputs = {
    name: nameInput,
    question: questionInput
  }

  if(!inputs.name.isBlank() && !inputs.question.isBlank()){
    var http = new XMLHttpRequest();
    var url = '/api/questions';
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
        }
    }
    http.send(JSON.stringify(inputs));
  }
}

String.prototype.isBlank = function(){
  this == "";
}
