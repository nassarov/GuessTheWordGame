// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Created By Nassarov`;

// Setting Game Options
let numOfTries = 5;
let numOfLetters = 6;
let currentTry = 1; // initial state focus on try 1

// Manage Words
let wordToGuess = "";
const words = ["School", "Create", "Update", "Delete", "Master", "Branch"];
// random word
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

function generateInputs() {
  const inputsContainer = document.querySelector(".inputs");
  //   Create Main Try Div
  for (let i = 1; i <= numOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    // disable all except focused
    if (i !== 1) {
      tryDiv.classList.add("disabled-inputs");
    }
    // Create Letter Inputs
    for (let j = 1; j <= numOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }
  //   Focus Try 1
  inputsContainer.children[0].children[1].focus();

  // disable inputs except first one (user can traverse through TAB to next inputs)
  const inputInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    // Convert input to Uppercase

    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();

      //   moving to next input by typing letters
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      //   console.log(event); display props of the event keypressed key:ArrowLeft / target:(input#guess-1-letter-6)
      const currentIndex = Array.from(inputs).indexOf(event.target); // getting index of target
      if (event.key === "ArrowRight" || event.key === "Enter") {
        const nextInput = currentIndex + 1;
        // making sure inside the range
        if (nextInput < inputs.length) inputs[nextInput].focus();
      } else if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        // making sure inside the range
        if (prevInput >= 0) inputs[prevInput].focus();
      } else if (event.key === "Backspace") {
        const prevInput = currentIndex - 1;
        // Clear current input if not empty, else move to previous input
        if (inputs[currentIndex].value !== "") {
          inputs[currentIndex].value = "";
        } else if (prevInput >= 0) {
          inputs[prevInput].focus();
          inputs[prevInput].value = "";
        }
      }
    });
  });
}
console.log(wordToGuess);
const checkButton = document.querySelector(".check");
checkButton.addEventListener("click", handleChecks);
function handleChecks() {
  let successGuess = true;
  for (let i = 1; i <= numOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const inputLetter = inputField.value.toLowerCase(); // letter
    const actualLetter = wordToGuess[i - 1]; //actual letter of word

    // GAME LOGIC
    // correct and in place
    if (inputLetter === actualLetter) {
      inputField.classList.add("yes-in-place");
      //   correct not in place
    } else if (wordToGuess.includes(inputLetter) && inputLetter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }
  // Check if user win or lose
  if (successGuess) {
    messageArea.innerHTML = `You win The word was <span>${wordToGuess}</span>`;
    // add disabled class to all inputs
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    // disable buttons
    checkButton.disabled = true;
  }
  //   needed now to access the rest inputs
  else {
    // disable previous inputs
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    currTryInputs.forEach((input) => (input.disabled = true));
    currentTry++;
    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));
  }
}

window.onload = () => generateInputs();
