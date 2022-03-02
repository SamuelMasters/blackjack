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
let computerTotal = 0;
let playerTotal = 0;

// Generate a full deck of 52 'cards' / values
// Consider putting this in a function to allow for repeated resets after each game
let cardDeck = [];
let values = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "king", "queen"];

/**
 * Resets the cardDeck variable to an empty array, then generates a new set
 * of 51 values, and pushes them to the newly-emptied cardDeck array.
 */
function resetCardDeck() {
    cardDeck = [];
    for (let i = 0; i < values.length; i++) {
        cardDeck.push(values[i]);
        cardDeck.push(values[i]);
        cardDeck.push(values[i]);
        cardDeck.push(values[i]);
    }
}


function startGame() {
    resetCardDeck();
    dealStartingCards();
    determineStartingPlayer();
    evaluateCards();
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

/**
 * Evaluates whether a random number between 0 - 1 exceeds the current 
 * riskValue variable, and hits or stands accordingly. 
 */
function computerTurn() {
    evaluateRisk();
    if (Math.random() > riskValue) {
        hit();
    } else {
        stand();
    }
}

/**
 * Randomly chooses a value from cardDeck array, and pushes it to the
 * computerPlayedCards or humanPlayedCards array (depending on whose turn
 * it is).
 */
function dealCard() {
    if (turnOwner === 'player') {
        humanPlayedCards.push(chooseRandomCard());
        evaluateCards();
    } else if (turnOwner === 'computer') {
        computerPlayedCards.push(chooseRandomCard());
        evaluateCards();
        evaluateRisk();
    } else {
        throw 'turnOwner variable is invalid! [dealCard() function]';
    }
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
        if (computerTotal > 21) {
            console.log("The computer has gone bust!");
            playerScore++;
        }
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
        if (playerTotal > 21) {
            console.log("You've gone bust!");
            computerScore++;
        }
        return playerTotal;
    } else {
        throw 'turnOwner variable is invalid! [evaluateCards() function]';
    }

}

function playerTurn() {

}

/**
 * Randomly chooses which player will take their turn first
 * after initial cards are dealt. 
 */
function determineStartingPlayer() {
    let randomNum = Math.random();
    if (randomNum < 0.5) {
        turnOwner = 'computer';
    } else if (randomNum > 0.5) {
        turnOwner = 'player';
    } else {
        throw 'Invalid conditional value for randomNum variable! [determineStartingPlayer() function]';
    }
}

function stand() {
    alert("The 'stand' button was pressed!");
}

function hit() {
    alert("The 'hit' button was pressed!");
    dealCard();
}

function drawCard() {
    let activeCard = chooseRandomCard();
}

/**
 * Changes the riskValue variable depending how close the computerTotal
 * variable is to 21. 
 */
function evaluateRisk() {
    if (turnOwner === 'computer') {
        if (computerTotal < 10) {
            riskValue = 0.2;
        } else if (computerTotal < 13) {
            riskValue = 0.3;
        } else if (computerTotal < 15) {
            riskValue = 0.6;
        } else if (computerTotal < 17) {
            riskValue = 0.8;
        } else if (computerTotal > 18) {
            riskValue = 0.99;
        } else {
            throw 'No condition matched [evaluateRisk()] function for riskValue assignment.';
        }
    }
}

/**
 * Swaps the value of the turnOwner variable to the other player. 
 */
function switchTurn() {
    if (turnOwner === 'computer') {
        turnOwner = 'player';
    } else {
        turnOwner === 'computer';
    }
}

let cardInPlay = '';
let computerScore = '';
let playerScore = '';
let riskValue = ''; // this value will range from 0 - 1, increasing as the computer total approaches 21