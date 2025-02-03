// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Created By Nassarov`;

// OPTION OBJ
const gameOptions = {
  numberOfLetters: 4,
  difficulty: "Easy",
};

// Update numOfTries whenever difficulty changes
function updateNumOfTries() {
  numOfTries =
    gameOptions.difficulty.toLowerCase() === "easy"
      ? 5
      : gameOptions.difficulty.toLowerCase() === "medium"
      ? 4
      : 3;
}

// Setting Game Options
updateNumOfTries(); // default difficulty

let currentTry = 1; // initial state focus on try 1
function updateNumOfHints() {
  numOfHints = numOfTries === 5 ? 3 : numOfTries === 4 ? 2 : 1;
  document.querySelector(".hint > span").innerHTML = numOfHints;
}

updateNumOfHints();

// Manage Words
let wordToGuess = "";
const four = ["Game", "Door", "Boat", "Fish", "Rock"];
const five = ["Apple", "Brain", "House", "Tiger", "Money"];
const six = ["Branch", "Garden", "Forest", "System", "Police", "School"];
const seven = ["Victory", "Mystery", "Freedom", "Journey", "Weather"];

function updateWords() {
  const words =
    gameOptions.numberOfLetters === 5
      ? five
      : gameOptions.numberOfLetters === 6
      ? six
      : gameOptions.numberOfLetters === 7
      ? seven
      : four;

  wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
  console.log(words);
  console.log(gameOptions.numberOfLetters);
}

updateWords(); // initial word selection

let messageArea = document.querySelector(".message");

// Manage Hints in html
const hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", getHint);

// Options
const optionButton = document.querySelector(".option-button");
const option = document.querySelector(".options-tab");
optionButton.addEventListener("click", () => {
  option.style.display = "flex";
  overlay.style.display = "block";
});

document.querySelector(".nbL").addEventListener("click", (event) => {
  if (event.target.classList.contains("char")) {
    document.querySelectorAll(".nbL .char").forEach((ele) => {
      ele.classList.remove("selected");
    });
    event.target.classList.add("selected");
    gameOptions.numberOfLetters = parseInt(event.target.textContent);
    console.log(gameOptions.numberOfLetters);
    updateWords(); // Update words
    generateInputs(); // Regenerate inputs
  }
});

document.querySelector(".difs").addEventListener("click", (event) => {
  if (event.target.classList.contains("diff")) {
    document.querySelectorAll(".difs .diff").forEach((ele) => {
      ele.classList.remove("selected");
    });
    event.target.classList.add("selected");
    gameOptions.difficulty = event.target.innerHTML.trim();
    updateNumOfTries(); // Update numOfTries
    updateNumOfHints(); // Update hints
    generateInputs(); // Regenerate input
  }
});


// End Options

function generateInputs() {
  checkButton.disabled = true;

  const inputsContainer = document.querySelector(".inputs");

  // Clear previous input fields
  inputsContainer.innerHTML = "";

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
    for (let j = 1; j <= gameOptions.numberOfLetters; j++) {
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

    // Enable check when all inputs filled
    input.addEventListener("input", able);

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
        able();
        messageArea.style.display = "none";
      }
    });
  });
}
console.log(wordToGuess);
const checkButton = document.querySelector(".check");
checkButton.addEventListener("click", handleChecks);

function able() {
  let allFilled = true;
  for (let i = 1; i <= gameOptions.numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    if (inputField.value === "") {
      allFilled = false;
      break;
    }
  }
  checkButton.disabled = !allFilled;
}

function handleChecks() {
  let successGuess = true;
  for (let i = 1; i <= numOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    if (inputField.value === "") {
      checkButton.disabled = true;
    }
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
    overlay.style.display = "block";
    messageArea.style.display = "block";
    messageArea.innerHTML = `You win The word was <span>${wordToGuess}</span><div class='reload'>Play Again</div>`;
    if (numOfHints === 2) {
      messageArea.innerHTML = `Congrats you did not even used a single Hint!<div class='reload'>Play Again</div>`;
    }
    // add disabled class to all inputs
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    let reload = document.querySelector(".reload");
    reload.addEventListener("click", () => location.reload());
    // disable buttons
    checkButton.disabled = true;
    hintButton.disabled = true;
  }
  //   needed now to access the rest inputs
  else {
    checkButton.disabled = true;
    // disable previous inputs
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    currTryInputs.forEach((input) => (input.disabled = true));
    currentTry++;
    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));

    let ele = document.querySelector(`.try-${currentTry}`);
    if (ele) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");
      ele.children[1].focus();
    } else {
      checkButton.disabled = true;
      messageArea.innerHTML = `You Failed! The word was <span>${wordToGuess}</span> <div class='reload'>Play Again</div>`;
      let reload = document.querySelector(".reload");
      reload.addEventListener("click", () => location.reload());
      overlay.style.display = "block";
      messageArea.style.display = "block";
    }
  }
}

function getHint() {
  if (numOfHints > 0) {
    numOfHints--;
    document.querySelector(".hint span").innerHTML = numOfHints;
  }
  if (numOfHints === 0) {
    hintButton.disabled = true;
  }
  //  selecting only enabled inputs
  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  //   specify the empty inputs only
  const emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );
  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

// Hide and Show Keys
const guide = document.querySelector(".keys");
const keys = document.querySelector(".key-colors");
const close = document.querySelector(".close");
const overlay = document.querySelector(".overlay");
guide.addEventListener("click", toggleShow);
close.addEventListener("click", toggleShow);
function toggleShow() {
  const isHidden = keys.style.display === "none" || keys.style.display === "";
  keys.style.display = isHidden ? "block" : "none";
  overlay.style.display = isHidden ? "block" : "none";
}

window.onload = () => generateInputs();
