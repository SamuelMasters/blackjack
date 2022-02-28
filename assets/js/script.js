// Setup initial event listeners for player buttons
document.addEventListener('DOMContentLoaded', function () {
    let hitButton = document.getElementById('hit-button');
    let standButton = document.getElementById('stand-button');
    hitButton.addEventListener('click', hit);
    standButton.addEventListener('click', stand);
});

let computerPlayedCards = [];
let humanPlayedCards = [];
let turnOwner = '';

// Generate a full deck of 52 'cards' / values
// Consider putting this in a function to allow for repeated resets after each game
let cardDeck = [];
let values = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "king", "queen"];
for (let i = 0; i < values.length; i++) {
    cardDeck.push(values[i]);
    cardDeck.push(values[i]);
    cardDeck.push(values[i]);
    cardDeck.push(values[i]);
}

function startGame() {
    dealStartingCards();
}

/**
 * Generates a random index within the cardDeck array, removes
 * it from the array, and then returns it as randomCard variable
 */
function chooseRandomCard() {
    let randomIndex = Math.floor(Math.random() * cardDeck.length + 1);
    let randomCard = cardDeck[randomIndex];
    cardDeck.splice(randomIndex, 1);
    return randomCard;
}

/**
 * Takes four random values from cardDeck array and
 * moves them to computerPlayedCards and
 * humanPlayedCards arrays (two each)
 */
function dealStartingCards() {
    let activeCard = chooseRandomCard();
    computerPlayedCards.push(activeCard);
    activeCard = chooseRandomCard();
    humanPlayedCards.push(activeCard);
    activeCard = chooseRandomCard();
    computerPlayedCards.push(activeCard);
    activeCard = chooseRandomCard();
    humanPlayedCards.push(activeCard);
}

function computerTurn() {

}

function dealCard() {

}

/**
 * Calculates total of card values in CPU and player hands. 
 * Evaluates hand totals, if either exceeds 21, then they 'bust' and lose. 
 */
function evaluateCards() {
    if (turnOwner === 'computer') {
        for (let i = 0; i < computerPlayedCards.length; i++) {
            if (typeof computerPlayedCards[i] === 'string') { // this will need to change to account for 'ace'
                computerPlayedCards[i] = 10;
            }
        }
        computerTotal = computerPlayedCards.reduce(function(a, b) {
            return a + b;
        }, 0);
        return computerTotal;
    } else if (turnOwner === 'player') {
        for (let i = 0; i < humanPlayedCards.length; i++) {
            if (typeof humanPlayedCards[i] === 'string') { // this will need to change to account for 'ace'
                humanPlayedCards[i] = 10;
            }
        }
        playerTotal = humanPlayedCards.reduce(function(a, b) {
            return a + b;
        }, 0);
        return playerTotal;
    } else {
        throw 'turnOwner variable is invalid!';
    }

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
    let activeCard = chooseRandomCard();
}

let computerTotal = '';
let playerTotal = '';
let cardInPlay = '';
let computerScore = '';
let playerScore = '';
