function getPlayerChoice() {
    let choice = prompt("Please type : 'Rock', 'Paper', 'Scissors");
    choice = choice.charAt(0).toUpperCase() + choice.slice(1).toLowerCase();
    return choice;
}

function getComputerChoice () {
    const choices = ["Rock", "Paper", "Scissors"];
    let choice = choices[Math.floor(Math.random() * choices.length)];
    return choice;
}

function playRound (playerSelection, computerSelection) {
    if ((playerSelection == 'Rock' && computerSelection == 'Scissors') || 
        (playerSelection == 'Paper' && computerSelection == 'Rock') ||
        (playerSelection == 'Scissors' && computerSelection == 'Paper')) {
        return `You Win! ${playerSelection} beats ${computerSelection}`;
    } else if (playerSelection == computerSelection) {
        return "It's a tie!";
    } else {
        return `You Lose! ${computerSelection} beats ${playerSelection}`;
    }
}

function displayScore (playerScore, computerScore) {
    console.log(`Player Score: ${playerScore}`);
    console.log(`Computer Score: ${computerScore}`);
}

function displayWinner (playerScore, computerScore) {
    if (playerScore > computerScore) {
        console.log("You win the game!");
    } else if (computerScore > playerScore) {
        console.log("Computer wins this game!");
    } else {
        console.log("Friendship wins!");
    }
}

function playGame() {
    
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
        const playerSelection = getPlayerChoice();
        const computerSelection =  getComputerChoice();
    
        const result = playRound(playerSelection, computerSelection);

        const losingChoice = result.split(" ").at(-1);
        if (playerSelection != computerSelection) {
            playerSelection == losingChoice ? computerScore += 1 : playerScore += 1
        }

        console.log(`Computer selected: ${computerSelection}`);
        console.log(result);
        displayScore(playerScore, computerScore);
    }
    displayWinner(playerScore, computerScore);
}

playGame();
