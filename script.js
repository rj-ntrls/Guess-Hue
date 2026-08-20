console.log("Guess Hue JaveScript is connected!");

const joinBtn = document.getElementById("joinBtn")
const playerName = document.getElementById("playerName")
const playerList = document.getElementById("playerList")

const submitGuessBtn = document.getElementById("submitGuessBtn");
const redInput = document.getElementById("red");
const greenInput = document.getElementById("green");
const blueInput = document.getElementById("blue");

const scoreDisplay = document.getElementById("score");

const timerDisplay = document.getElementById("timer");

const targetcolorBox = document.getElementById("targetcolor");

let gameActive = true;



function generateTargetColor(){
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const color = `rgb(${red}, ${green}, ${blue})`;
    
    console.log("Target color:", color)
    return color;


}


function startNewRound() {
    const newtargerColor = generateTargetColor();

    const newTargetValues = newtargerColor.match(/\d+/g).map(Number);

    targetRed = newTargetValues[0];
    targetGreen = newTargetValues[1];
    targetBlue = newTargetValues[2];

    targetcolorBox.style.backgroundColor = newtargerColor;

    console.log("new round started!");
    console.log("New target RGB:", targetRed, targetGreen, targetBlue);

    timeRemaining = 5;
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
        alert("The Game is over!!");
        return;
    }

    const red = redInput.value;
    const green = greenInput.value;
    const blue = blueInput.value;

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

    scoreDisplay.textContent = score;

    


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

startNewRound();