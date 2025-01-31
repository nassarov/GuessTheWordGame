// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Created By Nassarov`;

// Setting Game Options
let numOfTries = 5;
let numOfLetters = 6;
let currentTry = 1; // initial state focus on try 1

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
}

window.onload = () => generateInputs();
