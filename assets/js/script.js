// Setup initial event listeners for player buttons
document.addEventListener('DOMContentLoaded', function () {
    let hitButton = document.getElementById('hit-button');
    let standButton = document.getElementById('stand-button');
    hitButton.addEventListener('click', hit);
    standButton.addEventListener('click', stand);
});

let computerPlayedCards = []; // contains all cards dealth to computer in current round
let humanPlayedCards = []; // contains all cards dealt to player in current round
let turnOwner = ''; // indicates who the current turn belongs to
let computerTotal = 0; // the total of the computer's hand
let playerTotal = 0; // the total of the player's hand
let riskValue = 0; // this value will range from 0 - 1, increasing as the computer total approaches 21
let computerScore = 0; 
let playerScore = 0;
let playerStood = false; // indicates whether the player has stood down
let computerStood = false; // indicates whether the computer has stood down

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
    playerStood = false;
    computerStood = false;
}

/**
 * Resets key variables to their unedited state, for use at the 
 * start of each new round. 
 */
function resetVariables() {
    computerPlayedCards = [];
    humanPlayedCards = [];
    computerTotal = 0;
    playerTotal = 0;
    turnOwner = '';
    riskValue = 0;
    playerStood = false;
    computerStood = false;
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
    document.getElementById('player-cards').innerText = `[${humanPlayedCards}]`;
    document.getElementById('computer-cards').innerText = `[${computerPlayedCards}]`;
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
        document.getElementById('player-cards').innerText = `[${humanPlayedCards}]`;
    } else if (turnOwner === 'computer') {
        computerPlayedCards.push(chooseRandomCard());
        evaluateCards();
        evaluateRisk();
        document.getElementById('computer-cards').innerText = `[${computerPlayedCards}]`;
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
            if (computerPlayedCards.includes('ace')) {
                handleAce(); // evaluates how to play an ace automatically to simulate the appearance of strategy
            } else if (typeof computerPlayedCards[i] === 'string' && computerPlayedCards[i] != 'ace') {
                computerPlayedCards[i] = 10; // explicitly changes 'royal' cards to a value of 10
            }
        }
        computerTotal = computerPlayedCards.reduce(function(a, b) { // https://www.tutorialrepublic.com/faq/how-to-find-the-sum-of-an-array-of-numbers-in-javascript.php
            return a + b; // sums the numerical values of PlayedCards arrays
        }, 0);
        document.getElementById('computer-total').innerText = `${computerTotal}`;
        if (computerTotal > 21) {
            console.log("The computer has gone bust!");
            playerScore++;
            document.getElementById('player-score').innerText = `Your Score: ${playerScore}`;
            // begin a new round here
        }
        return computerTotal;
        
    } else if (turnOwner === 'player') {
        for (let i = 0; i < humanPlayedCards.length; i++) {
            if (humanPlayedCards.includes('ace')) {
                // insert code here to allow player to decide what to do with an ace
            } else if (typeof humanPlayedCards[i] === 'string' && humanPlayedCards[i] != 'ace') { 
                humanPlayedCards[i] = 10;
            }
        }
        playerTotal = humanPlayedCards.reduce(function(a, b) { // https://www.tutorialrepublic.com/faq/how-to-find-the-sum-of-an-array-of-numbers-in-javascript.php
            return a + b; // sums the numerical values of PlayedCards arrays
        }, 0);
        document.getElementById('player-total').innerText = `${playerTotal}`;
        if (playerTotal > 21) {
            console.log("You've gone bust!");
            computerScore++;
            document.getElementById('computer-score').innerText = `Opponent Score: ${computerScore}`;
            // begin a new round here
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
        throw 'Invalid conditional value for randomNum variable! [determineStartingPlayer()] function';
    }
}

function stand() {
    alert("The 'stand' button was pressed!");
    if (turnOwner === 'computer') {
        computerStood = true;
        switchTurn();
    } else if (turnOwner === 'player') {
        playerStood = true;
        switchTurn();
    } else if (computerStood === true && playerStood === true) {
        evaluateWinner();
    } else {
        throw 'Invalid turnOwner value within [stand()] function.';
    }
    switchTurn();
    // how is this handled if both players have now stood? 
}

function hit() {
    alert("The 'hit' button was pressed!");
    dealCard();
    switchTurn();
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
    if (turnOwner === 'computer' && playerStood === false) {
        turnOwner = 'player';
        document.getElementById('turn-reminder').style.visibility = 'visible';
    } else if (turnOwner ==='player' && computerStood === false) {
        turnOwner === 'computer';
        document.getElementById('turn-reminder').style.visibility = 'hidden';
    } else {
        evaluateWinner();
    }
}

/**
 * Evaluates the computerTotal variable, and decides the played
 * value of an ace based on the value returned. 
 */
function handleAce() {
    if (turnOwner === 'computer' && computerPlayedCards.includes('ace')) {
        if (computerTotal < 12) {
            i = computerPlayedCards.indexOf('ace'); 
            computerPlayedCards[i] = 10;
        } else {
            i = computerPlayedCards.indexOf('ace'); 
            computerPlayedCards[i] = 1;
        }
    }
}

let cardInPlay = '';

/**
 * Evaluates playerTotal and computerTotal variables when both 
 * have stood, and assigns a winner.
 */
function evaluateWinner() {
    if (playerTotal > computerTotal) {
        playerScore++;
        document.getElementById('player-score').innerText = `Your Score: ${playerScore}`;
        console.log('You won the round!');
        // start a new game here
    } else if (playerTotal < computerTotal) {
        computerScore++;
        document.getElementById('computer-score').innerText = `Opponent Score: ${computerScore}`;
        console.log('The computer won the round!');
        // start a new game here
    } else {
        console.log("It's a tie!");
        // start a new game here
    }

}