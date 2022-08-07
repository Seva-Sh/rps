const buttons = Array.from(document.querySelector('#choices').children);
const playAgainButton = document.querySelector('#playAgain');
const plScore = document.querySelector('#plScore');
const comScore = document.querySelector('#comScore');
const disWinner = document.querySelector('#displayWinner');
const comSelection = document.querySelector('#computerSelection');

let playerScore = 0;
let computerScore = 0;


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
    plScore.textContent = `Player Score: ${playerScore}`;
    comScore.textContent = `Computer Score: ${computerScore}`
}

function displayComputerSelection(computerSelection) {
    comSelection.textContent = `Computer selected: ${computerSelection}`;
}

function displayWinner (playerScore, computerScore, result) {
    if (playerScore >= 5 || computerScore >= 5) {
        if (playerScore > computerScore) {
            disWinner.textContent = "You win the game!";
            disWinner.style.color = 'green';
        } else if (computerScore > playerScore) {
            disWinner.textContent = "Computer wins this game!";
            disWinner.style.color = 'red';
        } else {
            disWinner.textContent = "Friendship wins!";
        }
    } else {
        disWinner.textContent = result;
    } 
}

function mainGame(playerSelection) {
    
    const computerSelection =  getComputerChoice();
    
    const result = playRound(playerSelection, computerSelection);

    const losingChoice = result.split(" ").at(-1);
    if (playerSelection != computerSelection) {
         playerSelection == losingChoice ? computerScore += 1 : playerScore += 1
    }

    displayScore(playerScore, computerScore);
    displayComputerSelection(computerSelection);
    displayWinner(playerScore, computerScore, result);

}

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.id}"]`);
    const button = document.querySelector(`button[id="${e.id}"]`);

    audio.currentTime = 0;
    audio.play();
    button.classList.add('playing');
}

function removeTransition(e) {
    if (e.propertyName != 'transform') return;
    this.classList.remove('playing');
}


function runGame() {
    displayScore(playerScore, computerScore);

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            playSound(button);
            button.addEventListener('transitionend', removeTransition)
            mainGame(button.id);
            if (playerScore >= 5 || computerScore >= 5) {
                buttons.forEach((button) => {
                    button.disabled = true;
                })
            }
        });
    });

    playAgainButton.addEventListener('click', () => {
        document.location.reload();
    })
}

runGame();