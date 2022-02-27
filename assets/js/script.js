// Setup initial event listeners for player buttons

document.addEventListener('DOMContentLoaded', function() {
    let hitButton = document.getElementById('hit-button');
    let standButton = document.getElementById('stand-button');
    hitButton.addEventListener('click', hit);
    standButton.addEventListener('click', stand);
});

function startGame() {

}

function dealStartingCards() {

}

function computerTurn() {

}

function dealCard() {

}

function evaluateCards() {

}

function playerTurn() {

}

function stand() {
    alert("The 'stand' button was pressed!");
}

function hit() {
    alert("The 'hit' button was pressed!");
}

let computerTotal = '';
let playerTotal = '';
let cardInPlay = '';
let computerScore = '';
let playerScore = '';