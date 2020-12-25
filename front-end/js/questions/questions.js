fetch("/api/questions").then(response => response.json()).then(result => {
  var links = "";
  for(var i = 0; i < result.data.length; i++){
    links += "<p><a href='questions/"+result.data[i].id+"'>"+result.data[i].question+"</a></p>";
  }
  document.querySelector(".questions").innerHTML = links;
});
