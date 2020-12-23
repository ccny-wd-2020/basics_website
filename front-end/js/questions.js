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

fetch("/api/questions").then(response => response.json()).then(result => {
  var links = "";
  for(var i = 0; i < result.data.length; i++){
    links += "<p><a href='questions/"+result.data[i].id+"'>"+result.data[i].question+"</a></p>";
  }
  document.querySelector(".questions").innerHTML = links;
});

String.prototype.isBlank = function(){
  this == "";
}
