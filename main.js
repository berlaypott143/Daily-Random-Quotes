import { quotes } from "./Quotes.js";

let button = document.getElementById("btn");
let container = document.getElementById("quote-container");

button.addEventListener("click", function () {
  container.innerHTML = "";
  //getting a random index of imported quotes array
  let randomIndex = Math.floor(Math.random() * quotes.length);
  //console.log(quotes.length); ask how to access the content of the quotes length - chatgpt

  //creating a div
  let randomQuote = document.createElement("div");

  //giving a name of the div
  randomQuote.className = "quote";

  //setting text content of div with the random selected quote
  randomQuote.textContent = quotes[randomIndex];

  container.appendChild(randomQuote);

  console.log(container);
});
