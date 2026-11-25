let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let results = [];

// Start the game after validating player name
function startGame() {
    let nameInput = document.getElementById("playerName").value.trim();

    // Check if name input is empty
    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }

    // Display welcome message and start time
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + nameInput + "!";
    document.getElementById("startTime").innerHTML = "Game started at: " + new Date().toLocaleString();
    gameStarted = true;
}

// Randomly return 'rock', 'paper', or 'scissors'
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Play one round against the computer
function playRound(playerChoice) {
    // Ensure Start Game was clicked first
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();

    // Update images based on choices (changed to .jpg to match your files)
    document.getElementById("playerImg").src = playerChoice + ".jpg";
    document.getElementById("computerImg").src = computerChoice + ".jpg";

    let roundResult = "";
    let resultElement = document.getElementById("result");

    // Determine win, lose, or draw
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
        resultElement.innerHTML = "It's a Draw!";
        resultElement.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
        resultElement.innerHTML = "You Win!";
        resultElement.style.color = "green";
    } else {
        roundResult = "Lose";
        losses++;
        resultElement.innerHTML = "You Lose!";
        resultElement.style.color = "red";
    }

    // Update scoreboard numbers
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Record result in array and append new row to history table
    results.push(roundResult);
    let roundNumber = results.length;
    let historyBody = document.getElementById("historyBody");
    historyBody.innerHTML +=
        "<tr>" +
            "<td>" + roundNumber + "</td>" +
            "<td>" + playerChoice + "</td>" +
            "<td>" + computerChoice + "</td>" +
            "<td>" + roundResult + "</td>" +
        "</tr>";
}

// Calculate and display win percentage summary using a for loop
function showSummary() {
    let totalRounds = results.length;

    if (totalRounds === 0) {
        document.getElementById("summary").innerHTML = "No rounds played yet.";
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    let winPercentage = Math.round((winCount / totalRounds) * 100);
    document.getElementById("summary").innerHTML =
        "You played " + totalRounds + " rounds and won " + winPercentage + "%.";
}

// Reset all scores, history rows, arrays, and messages back to initial state
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    results = [];

    // Reset scoreboard display
    document.getElementById("wins").innerHTML = "0";
    document.getElementById("losses").innerHTML = "0";
    document.getElementById("draws").innerHTML = "0";

    // Clear history table rows, result message, and summary message
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";

    // Reset images back to default
    document.getElementById("playerImg").src = "rock.jpg";
    document.getElementById("computerImg").src = "rock.jpg";
}