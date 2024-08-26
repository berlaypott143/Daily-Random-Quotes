import { quotes } from "./Quotes.js";
import { colors } from "./Colors.js";

let button = document.getElementById("generator-btn");
let iconButton = document.getElementById("icon-btn");
let container = document.getElementById("quote-container");
let lineVertical = document.getElementById("line-vertical");
let lineHorizontal = document.getElementById("line-horizontal");

let prevIndex = -1;

button.addEventListener("click", function () {
  // Select the previous quote if it exists
  let existingQuote = document.querySelector("#quote-container .quote");

  if (existingQuote) {
    // Fade out the existing quote and author
    existingQuote.classList.add("fade-out");

    // Ensure the existing quote is only removed after the fade-out transition is complete
    setTimeout(() => {
      existingQuote.remove(); // Remove the quote after fade-out
    }, 600); // Match this to the CSS transition duration (0.6s)
  }

  // Generate new quote and color
  let randomIndex;
  let randomColor;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
    randomColor = Math.floor(Math.random() * colors.length);
  } while (randomIndex === prevIndex);

  prevIndex = randomIndex;

  // Get the selected quote and author
  let [quoteText, author] = quotes[randomIndex];

  // Format the quote: split into words and create rows of 4 words
  let words = quoteText.split(" ");
  let formattedQuote = "";
  for (let i = 0; i < words.length; i += 4) {
    formattedQuote += words.slice(i, i + 4).join(" ") + "<br>"; // Add a line break every 4 words
  }

  // Create a new div for the quote
  let randomQuote = document.createElement("div");
  randomQuote.className = "quote fade-in"; // Apply the fade-in class

  // Set the content for the quote and author
  randomQuote.innerHTML = `
    <div>${formattedQuote}</div>
    <div class="author fade-in">- ${author}</div>
  `;

  // Update background colors
  document.documentElement.style.backgroundColor = colors[randomColor];
  document.documentElement.style.color = colors[randomColor];
  document.body.style.backgroundColor = colors[randomColor];
  button.style.backgroundColor = colors[randomColor];
  iconButton.style.backgroundColor = colors[randomColor];

  // Update the vertical and horizontal lines
  lineVertical.style.backgroundColor = colors[randomColor];
  lineHorizontal.style.backgroundColor = colors[randomColor];
  lineVertical.style.width = "10px";
  lineHorizontal.style.height = "10px";

  // Insert the new quote
  container.insertBefore(randomQuote, container.firstChild);

  // Add a delay for the fade-in to make sure it starts smoothly
  setTimeout(() => {
    randomQuote.classList.remove("fade-in"); // Ensure the quote keeps its final position
  }, 50); // Small delay to trigger the CSS transition
});

iconButton.addEventListener("click", function () {
  let quotes = document.querySelector(".quote");
  let utterance = new SpeechSynthesisUtterance();

  // Retrieve the text from quotes
  let quoteText = quotes.textContent;

  // Set the text for utterance
  utterance.text = quoteText;

  // Speak the quote
  window.speechSynthesis.speak(utterance);
});
