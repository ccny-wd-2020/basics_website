document.querySelector("#question-form").onsubmit = function(e){
  e.preventDefault();

  var nameInput = document.querySelector("#name-input").value;
  var questionInput = document.querySelector("#question-input").value;

  var inputs = {
    name: nameInput,
    question: questionInput
  }

  if(!inputs.name.isBlank() && !inputs.question.isBlank()){
    fetch("/api/questions", {
      method: "POST",
      body: JSON.stringify(inputs)
    }).then(response => response.json()).then(data => {
      console.log(data)
    }).catch(err => {
      console.error(err)
    })
  }
}

String.prototype.isBlank = function(){
  this == "";
}
