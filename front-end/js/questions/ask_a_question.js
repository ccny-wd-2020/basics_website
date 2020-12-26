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
    }).then(response => {
      window.location.href = "/questions/submitted";
    }).catch(err => {
      alert(err)
    })
  }
}

String.prototype.isBlank = function(){
  this == "";
}
