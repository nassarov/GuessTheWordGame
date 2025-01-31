// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Created By Nassarov`;

// Setting Game Options
let numOfTries = 5;
let numOfLetters = 6;
let currentTry = 1; // initial state focus on try 1
