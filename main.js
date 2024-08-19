import { quotes } from "./Quotes.js";
import { colors } from "./Colors.js";

let button = document.getElementById("generator-btn");
let iconButton = document.getElementById("icon-btn");
let container = document.getElementById("quote-container");
let lineVertical = document.getElementById("line-vertical");
let lineHorizontal = document.getElementById("line-horizontal");

let prevIndex = -1;

button.addEventListener("click", function () {
  // Remove the previous quote (if any), without clearing the entire container
  let existingQuote = document.querySelector("#quote-container .quote");
  if (existingQuote) {
    existingQuote.remove();
  }

  //getting a random index of imported quotes array and loop until a different random index is found
  let randomIndex;
  let randomColor;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
    randomColor = Math.floor(Math.random() * colors.length);
  } while (randomIndex === prevIndex);

  prevIndex = randomIndex;
  console.log(randomIndex);

  //creating a div
  let randomQuote = document.createElement("div");

  //giving a name of the div
  randomQuote.className = "quote";

  //setting text content of div with the random selected quote
  randomQuote.textContent = quotes[randomIndex];

  // Select the <html> and <body> elements
  const htmlElement = document.documentElement;
  const bodyElement = document.body;

  // Set the styles directly (no jQuery)
  htmlElement.style.backgroundColor = colors[randomColor];
  htmlElement.style.color = colors[randomColor];
  bodyElement.style.backgroundColor = colors[randomColor];
  button.style.backgroundColor = colors[randomColor];
  iconButton.style.backgroundColor = colors[randomColor];

  //controlling vertical and horizontal lines
  lineVertical.style.backgroundColor = colors[randomColor];
  lineHorizontal.style.backgroundColor = colors[randomColor];
  lineVertical.style.width = "10px";
  lineHorizontal.style.height = "10px";
  // Insert the new quote at the beginning of the container (before the hr and buttons)
  container.insertBefore(randomQuote, container.firstChild);

  console.log("Random Index:", randomIndex);
  console.log(container);
});

iconButton.addEventListener("click", function () {
  let quotes = document.querySelector(".quote");
  let utterance = new SpeechSynthesisUtterance();

  //retrieve text from container
  let quoteText = quotes.textContent;

  //set the text for utterance
  utterance.text = quoteText;

  //speak the quote
  window.speechSynthesis.speak(utterance);
});
