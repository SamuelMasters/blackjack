// Setup initial event listeners for player buttons
document.addEventListener('DOMContentLoaded', function() {
    let hitButton = document.getElementById('hit-button');
    let standButton = document.getElementById('stand-button');
    hitButton.addEventListener('click', hit);
    standButton.addEventListener('click', stand);
});

// Generate a full deck of 52 'cards' / values
let cardDeck = [];
let values = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "king", "queen"];
for (let i = 0; i < values.length; i++) {
    cardDeck.push(values[i]);
    cardDeck.push(values[i]);
    cardDeck.push(values[i]);
    cardDeck.push(values[i]);
}

function startGame() {

}

/**
 * Takes two random values from cardDeck array and
 * moves them to computerPlayedCards and
 * humanPlayedCards arrays
 */
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

function drawCard() {

}

let computerTotal = '';
let playerTotal = '';
let cardInPlay = '';
let computerScore = '';
let playerScore = '';
let computerPlayedCards = [];
let humanPlayedCards = [];