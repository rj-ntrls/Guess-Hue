console.log("Guess Hue JaveScript is connected!");

const joinBtn = document.getElementById("joinBtn")
const playerName = document.getElementById("playerName")
const playerList = document.getElementById("playerList")

const submitGuessBtn = document.getElementById("submitGuessBtn");
const redInput = document.getElementById("red");
const greenInput = document.getElementById("green");
const blueInput = document.getElementById("blue");

const scoreDisplay = document.getElementById("score");
const roundScoreDisplay = document.getElementById("roundScore");

const timerDisplay = document.getElementById("timer");
const roundDisplay = document.getElementById("round");

const targetcolorBox = document.getElementById("targetcolor");

let gameActive = true;
let roundNumber = 1;
let totalScore = 0;




function generateTargetColor(){
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const color = `rgb(${red}, ${green}, ${blue})`;
    
    console.log("Target color:", color)
    return color;


}


function startNewRound() {
    gameActive = true;
    submitGuessBtn.disabled = false;
    redInput.disabled = false;
    greenInput.disabled = false;
    blueInput.disabled = false;


    roundScoreDisplay.textContent = 0;

    redInput.value = "";
    greenInput.value = "";
    blueInput.value = "";
    
    const newtargetColor = generateTargetColor();

    const newTargetValues = newtargetColor.match(/\d+/g).map(Number);

    targetRed = newTargetValues[0];
    targetGreen = newTargetValues[1];
    targetBlue = newTargetValues[2];

    targetcolorBox.style.backgroundColor = newtargetColor;

    console.log("new round started!");
    console.log("New target RGB:", targetRed, targetGreen, targetBlue);

    roundNumber++;
    roundDisplay.textContent = roundNumber;

    timeRemaining = 30;
    timerDisplay.textContent = timeRemaining;

    startTimer();



}

joinBtn.addEventListener("click", function() {
    const name = playerName.value.trim();
    if (name === ""){

        alert("Please enter your name!")
        return;
    }

    console.log("Player name:", name)

    playerList.innerHTML = "";

    const newPlayer = document.createElement("li");
    newPlayer.textContent = name;

    playerList.appendChild(newPlayer);

});

submitGuessBtn.addEventListener("click", function() {
    
    if (!gameActive) {
        alert("You already submitted your guess for this round!");
        return;
    }

    const redValue = redInput.value;
    const greenValue = greenInput.value;
    const blueValue = blueInput.value;

    if (redValue === "" || greenValue === "" || blueValue === "") {
        alert("Please enter all RGB values!");
        return;
    }

    const red = Number(redInput.value);
    const green = Number(greenInput.value);
    const blue = Number(blueInput.value);

    if (red < 0 || red > 255 ||
        green < 0 || green > 255 ||
        blue < 0 || blue > 255) {
            alert("RGB Values must be between 0 and 255!");
            return;
        }

    console.log("player guess:", red, green, blue);

    const redDifference = Math.abs(targetRed - red);
    const greenDifference = Math.abs(targetGreen - green);
    const blueDifference = Math.abs(targetBlue - blue);


    console.log("Red difference:", redDifference);
    console.log("Green difference:", greenDifference);
    console.log("blue difference:", blueDifference);

    const totalDifference = redDifference + greenDifference + blueDifference;

    console.log("Total difference:", totalDifference);

    const score = Math.round(100 - (totalDifference / 765) * 100);

    console.log("Score:", score);

    totalScore += score;

    console.log("Total score:", totalScore);

    scoreDisplay.textContent = totalScore;
    roundScoreDisplay.textContent = score;

    gameActive = false;
    submitGuessBtn.disabled = true;

    redInput.disabled = true;
    greenInput.disabled = true;
    blueInput.disabled = true;

    


});



const targetcolor = generateTargetColor();

const targetvalues = targetcolor.match(/\d+/g).map(Number);

let targetRed = targetvalues[0];
let targetGreen = targetvalues[1];
let targetBlue = targetvalues[2];

console.log("Target RGB:", targetRed,targetGreen,targetBlue);



targetcolorBox.style.backgroundColor = targetcolor;

let timeRemaining = 30;

function startTimer() {
    const timer = setInterval(function() {
        timeRemaining--;

        timerDisplay.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            gameActive = false;

            console.log("time's up!");
            
            startNewRound();
        }
    },1000);
}

startTimer();
