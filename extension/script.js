'use strict'
//developer.chrome.com/docs/extensions/mv3/getstarted
document.getElementsByTagName("button")[0].addEventListener("click", () => {
  // document.getElementsByTagName("h1")[0].innerText = document.getElementsByTagName("h1")[0].innerText == "EAEA" ? "AnimeSync" : "EAEA";
  alert("This is my favorite website!");
})

console.log(chrome.webNavigation)

chrome.webNavigation.onCompleted.addListener(function() {
  alert("This is my favorite website!");
});