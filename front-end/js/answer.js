document.querySelector("#answer-form").onsubmit = function(e){
  e.preventDefault();

  var nameInput = document.querySelector("#name-input").value;
  var answerInput = document.querySelector("#answer-input").value;
  var questionId = document.querySelector("#answer-input").dataset.id;

  var inputs = {
    name: nameInput,
    answer: answerInput,
    questionId: questionId
  }

  if(!inputs.name.isBlank() && !inputs.answer.isBlank()){
    fetch("/api/answer", {
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
