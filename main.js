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

  // Getting a random index of imported quotes array and colors array and loop until a different random index is found
  let randomIndex;
  let randomColor;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
    randomColor = Math.floor(Math.random() * colors.length);
  } while (randomIndex === prevIndex);

  prevIndex = randomIndex;

  // Create a div for the quote
  let randomQuote = document.createElement("div");
  randomQuote.className = "quote";

  // Check if `quotes[randomIndex]` is an array
  let quoteData = quotes[randomIndex];
  let quoteText, author;

  if (Array.isArray(quoteData)) {
    // Extract the quote text (first element) and the author (second element)
    quoteText = quoteData[0];
    author = quoteData[1];
  } else {
    console.error("Invalid quote data: ", quotes[randomIndex]);
    randomQuote.textContent = "Error: Invalid quote format.";
    return; // Exit early if the format is incorrect
  }

  // Ensure quoteText is a valid string before proceeding
  if (typeof quoteText === "string") {
    // Declare formattedQuote variable outside the loop
    let formattedQuote = "";

    // Split the quote into words and chunk it into rows of 4 words
    let words = quoteText.split(" ");
    for (let i = 0; i < words.length; i += 4) {
      formattedQuote += words.slice(i, i + 4).join(" ");
    }

    // Set the formatted quote as the innerHTML of the div
    randomQuote.innerHTML = formattedQuote;

    // Optionally, you can also append the author's name below the quote
    if (author) {
      let authorDiv = document.createElement("div");
      authorDiv.className = "author";
      authorDiv.textContent = `- ${author}`;
      randomQuote.appendChild(authorDiv);
    }
  } else {
    console.error("Invalid quote format.");
    randomQuote.textContent = "Error: Invalid quote format.";
  }

  // Select the <html> and <body> elements
  const htmlElement = document.documentElement;
  const bodyElement = document.body;

  // Set the styles directly (no jQuery)
  htmlElement.style.backgroundColor = colors[randomColor];
  htmlElement.style.color = colors[randomColor];
  bodyElement.style.backgroundColor = colors[randomColor];
  button.style.backgroundColor = colors[randomColor];
  iconButton.style.backgroundColor = colors[randomColor];

  // Controlling vertical and horizontal lines
  lineVertical.style.backgroundColor = colors[randomColor];
  lineHorizontal.style.backgroundColor = colors[randomColor];
  lineVertical.style.width = "10px";
  lineHorizontal.style.height = "10px";

  // Insert the new quote at the beginning of the container (before the hr and buttons)
  container.insertBefore(randomQuote, container.firstChild);

  // Delay the transition so the quote starts from the top
  setTimeout(() => {
    randomQuote.style.top = "0"; // Move the quote to its final position
    randomQuote.style.right = "0"; // Move the quote to its final horizontal position (right-to-left)
    randomQuote.style.opacity = "1"; // Fade in the quote
  }, 50); // Small delay to trigger the CSS transition
});

iconButton.addEventListener("click", function () {
  let quotes = document.querySelector(".quote");
  let utterance = new SpeechSynthesisUtterance();

  //retrieve text from quotes
  let quoteText = quotes.textContent;

  //set the text for utterance
  utterance.text = quoteText;

  //speak the quote
  window.speechSynthesis.speak(utterance);
});
