// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementsByTagName("header")[0];

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    // TODO: this didnt work
    // document.querySelector("#header-basics").style.marginTop = "-7px;"
  } else {
    header.classList.remove("sticky");
  }
}
