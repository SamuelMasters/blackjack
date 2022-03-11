// Setup initial event listeners for player buttons
let hitButton = document.getElementById('hit-button');
let standButton = document.getElementById('stand-button');
let opponentMessage = document.getElementById('opponent-message');
let playerMessage = document.getElementById('turn-reminder');
let rulesButton = document.getElementById('rules-button');
let rulesInterface = document.getElementById('rules');
let rulesToggle = true;
let gridThree = document.getElementById('grid-item-3');
let gridFour = document.getElementById('grid-item-4');
let gridFive = document.getElementById('grid-item-5');
let gridSix = document.getElementById('grid-item-6');

// Initial setup of event listeners
document.addEventListener('DOMContentLoaded', function () {
    rulesButton.addEventListener('click', startGame);
    hitButton.innerText = 'START GAME!';
    hitButton.addEventListener('click', startGame);
    standButton.addEventListener('click', stand);
    standButton.style.visibility = 'hidden';
    document.getElementById('opponent-message').style.visibility = 'hidden';
    document.getElementById('rules-header').addEventListener('click', toggleRules);
    document.getElementById('reset-button').addEventListener('click', hardReset);
});


/**
 * Toggles visibility of the rules interface. Attached via event listener to 'Rules' button. 
 */
function toggleRules() {
    if (rulesToggle === true) {
        rulesInterface.style.visibility = 'hidden';
        rulesToggle = false;
        gridThree.style.visibility = 'visible';
        gridFour.style.visibility = 'visible';
        gridFive.style.visibility = 'visible';
        gridSix.style.visibility = 'visible';
    } else if (rulesToggle === false) {
        rulesInterface.style.visibility = 'visible';
        rulesToggle = true;
        gridThree.style.visibility = 'hidden';
        gridFour.style.visibility = 'hidden';
        gridFive.style.visibility = 'hidden';
        gridSix.style.visibility = 'hidden';
        standButton.style.visibility = 'hidden';
    }
}

// Initial declaration of global variables for use within functions. 
let computerPlayedCards = []; // contains all cards dealth to computer in current round
let humanPlayedCards = []; // contains all cards dealt to player in current round
let turnOwner; // indicates who the current turn belongs to
let computerTotal = 0; // the total of the computer's hand
let playerTotal = 0; // the total of the player's hand
let riskValue = 0; // this value will range from 0 - 1, increasing as the computer total approaches 21
let computerScore = 0; // represents rounds won by the computer in the current session
let playerScore = 0; // represents rounds won by the player in the current session
let playerStood = false; // indicates whether the player has stood down
let computerStood = false; // indicates whether the computer has stood down
let cardDeck = []; // Generate a full deck of 52 'cards' / values
let values = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "king", "queen"];

/**
 * Resets the cardDeck variable to an empty array, then generates a new set
 * of 52 values, and pushes them to the empty cardDeck array.
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

/**
 * Resets key variables to their unedited state, for use at the 
 * start of each new round, and resets game interface (except score).  
 */
function resetVariables() {
    hitButton.removeEventListener('click', hit);
    hitButton.innerText = 'HIT';
    opponentMessage.innerHTML = `<strong>It is the computer's turn!</strong>`;
    opponentMessage.style.visibility = 'hidden';
    playerMessage.innerHTML = `<strong>It is your turn.</strong>`;
    standButton.removeEventListener('click', stand);
    computerPlayedCards = [];
    document.getElementById('computer-cards').innerText = computerPlayedCards;
    humanPlayedCards = [];
    document.getElementById('player-cards').innerText = humanPlayedCards;
    computerTotal = 0;
    document.getElementById('computer-total').innerText = computerTotal;
    playerTotal = 0;
    document.getElementById('player-total').innerText = playerTotal;
    turnOwner = 'player'; // review this 
    riskValue = 0;
    playerStood = false;
    computerStood = false;
    resetCardDeck();

}

/**
 * Starts a new round of the game, calls functions to reset variables, regenerate deck, 
 * and deal starting cards. 
 */
function startGame() {
    if (rulesToggle === true) {
        toggleRules();
    }
    document.getElementById('grid-item-3').style.visibility = 'visible'; // check if/why this was added?
    hitButton.innerText = 'HIT';
    hitButton.removeEventListener('click', startGame);
    opponentMessage.style.visibility = 'hidden'; // hides opponent message at the start of each new round
    opponentMessage.innerHTML = "<strong>It is the computer's turn!</strong>"; // resets opponent message at start of each new round
    resetVariables();
    dealStartingCards();


    // Checks for blackjacks, and assigns aces as 11 if they are present but not triggering a blackjack
    for (let i = 0; i < humanPlayedCards.length; i++) {
        if (humanPlayedCards.includes(10) && humanPlayedCards.includes('ace')) {
            playerScore++;
            document.getElementById('player-score').innerHTML = `<strong>Player Score: ${playerScore}</strong>`;
            playerMessage.innerHTML = `<strong>You got a blackjack!</strong>`;
            hitButton.removeEventListener('click', hit);
            hitButton.addEventListener('click', startGame);
            hitButton.innerText = 'PLAY AGAIN?';
            standButton.removeEventListener('click', stand);
            standButton.style.visibility = 'hidden';
        } else if (computerPlayedCards.includes(10) && computerPlayedCards.includes('ace')) {
            computerScore++;
            document.getElementById('computer-score').innerHTML = `<strong>Opponent Score: ${computerScore}</strong>`;
            opponentMessage.innerHTML = `<strong>The computer got a blackjack!</strong>`;
            hitButton.removeEventListener('click', hit);
            hitButton.addEventListener('click', startGame);
            hitButton.innerText = 'PLAY AGAIN?';
            standButton.removeEventListener('click', stand);
            standButton.style.visibility = 'hidden';
        } else if (computerPlayedCards.includes('ace')) {
            let x = computerPlayedCards.indexOf('ace');
            computerPlayedCards[x] = 11;
        } else if (humanPlayedCards.includes('ace')) {
            let x = humanPlayedCards.indexOf('ace');
            humanPlayedCards[x] = 11;
        }
    }

    evaluateCards();

    playerMessage.style.visibility = 'visible';
    hitButton.addEventListener('click', hit);
    standButton.style.visibility = 'visible';
    standButton.addEventListener('click', stand);
}

/**
 * Resets both scores, and then starts a new game after a short delay. 
 */
function hardReset() {
    computerScore = 0;
    playerScore = 0;
    document.getElementById('computer-score').innerHTML = `<strong>Opponent Score: ${computerScore}</strong>`;
    document.getElementById('player-score').innerHTML = `<strong>Player Score: ${playerScore}</strong>`;
    setTimeout(startGame, 3000);
}


/**
 * Generates a random index within the cardDeck array, removes
 * it from the array, and then returns it as randomCard variable
 */
function chooseRandomCard() {
    let randomIndex = Math.floor(Math.random() * cardDeck.length); // does this need to change to Math.round instead?
    let randomCard = cardDeck[randomIndex];
    cardDeck.splice(randomIndex, 1);
    return randomCard;
}

/**
 * Takes four random values from cardDeck array and
 * moves them to computerPlayedCards and
 * humanPlayedCards arrays (two each).
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
 * riskValue variable, and hits or stands accordingly. Handles a rough appropriation
 * of how an opponent might play. 
 */
function computerTurn() {
    evaluateRisk();
    let randomValue = Math.random();
    if (randomValue > riskValue) { // hits if the riskValue is exceeded
        hit();
    } else if (playerTotal < computerTotal === true && playerStood === true) { // the computer should stand if it exceeds the playerTotal and the player has stood
        stand();
        opponentMessage.innerHTML = '<strong>The computer has stood.</strong>';
        opponentMessage.style.visibility = 'visible';
    } else if (playerTotal === computerTotal && randomValue < riskValue) { // settles on a tie if riskValue is not exceeded 
        stand();
        opponentMessage.innerHTML = '<strong>The computer has stood.</strong>';
        opponentMessage.style.visibility = 'visible';
    } else if (randomValue < riskValue && playerTotal < computerTotal) { // stands if the current total exceeds the players, and riskValue is not exceeded 
        stand();
        opponentMessage.innerHTML = '<strong>The computer has stood.</strong>';
        opponentMessage.style.visibility = 'visible';
    } else if (playerStood === true && playerTotal > computerTotal) { // hits if the player has already stood and the computer total is lower than the player's 
        hit();
    } else {
        stand();
        opponentMessage.innerHTML = '<strong>The computer has stood.</strong>';
        opponentMessage.style.visibility = 'visible';
    }

    if (playerStood === true && computerStood === false) { // loops the computers turn if the player has stood, and the computer has not
        computerTurn();
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
        document.getElementById('player-cards').innerText = `[${humanPlayedCards}]`;
        evaluatePlayerTotal();
    } else if (turnOwner === 'computer') {
        computerPlayedCards.push(chooseRandomCard());
        document.getElementById('computer-cards').innerText = `[${computerPlayedCards}]`;
        evaluateComputerTotal();
    } else {
        throw 'turnOwner variable is invalid! [dealCard() function]';
    }
}

/**
 * Calculates the total of the computers's hand, updates player score if 
 * computer's hand exceeds 21 ('bust'). 
 */
function evaluateComputerTotal() {
    convertRoyals();

    computerTotal = computerPlayedCards.reduce(function (a, b) { // https://www.tutorialrepublic.com/faq/how-to-find-the-sum-of-an-array-of-numbers-in-javascript.php
        return a + b; // sums the numerical values of PlayedCards arrays
    }, 0);

    document.getElementById('computer-total').innerText = `${computerTotal}`;

    // checks if the computer has gone bust
    if (computerTotal > 21) {
        opponentMessage.innerHTML = '<strong>The computer has bust!</strong>';
        playerScore++;
        computerStood = true;
        playerStood = true;
        document.getElementById('player-score').innerHTML = `<strong>Player Score: ${playerScore}</strong>`;
        hitButton.removeEventListener('click', hit);
        hitButton.innerText = 'PLAY AGAIN?';
        hitButton.addEventListener('click', startGame);
        standButton.style.visibility = 'hidden';
        return;
    } else if (computerTotal === 21) { // automatically makes the computer stand if it hits a total of 21
        computerStood = true;
        opponentMessage.innerHTML = `<strong>The computer has stood.</strong>`;
        opponentMessage.style.visibility = 'visible';
    }
}

/**
 * Calculates the total of the player's hand, updates computer score if 
 * player's hand exceeds 21 ('bust'). 
 */
function evaluatePlayerTotal() {
    convertRoyals();
    playerTotal = humanPlayedCards.reduce(function (a, b) { // https://www.tutorialrepublic.com/faq/how-to-find-the-sum-of-an-array-of-numbers-in-javascript.php
        return a + b; // sums the numerical values of PlayedCards arrays
    }, 0);

    document.getElementById('player-total').innerText = `${playerTotal}`;

    if (playerTotal > 21) {
        playerMessage.innerHTML = `<strong>You've gone bust!</strong>`;
        playerMessage.style.visibility = 'visible';
        computerScore++;
        computerStood = true;
        playerStood = true;
        // computerStood = true;
        playerStood = true;
        document.getElementById('computer-score').innerHTML = `<strong>Opponent Score: ${computerScore}</strong>`;
        hitButton.removeEventListener('click', hit);
        hitButton.innerText = 'PLAY AGAIN?';
        standButton.style.visibility = 'hidden';
        hitButton.addEventListener('click', startGame);
        return;
    } else if (playerTotal === 21) {
        playerStood = true;
        playerMessage.innerHTML = `<strong>You have stood.</strong>`;
        playerMessage.style.visibility = 'visible';
    }
}

/**
 * Allows for separate, simultaneous calculation and updating of 
 * player and computer hand totals.
 */
function evaluateCards() {
    evaluateComputerTotal();
    evaluatePlayerTotal();
}

/**
 * Looks for 'royal' cards in player and computer hands, and converts
 * them to the numerical value of 10. Searches for aces, and call the handleAce function
 * if they are found in either player's hand. 
 */
function convertRoyals() {
    for (let i = 0; i < computerPlayedCards.length; i++) {
        if (computerPlayedCards.includes('ace')) {
            handleAce(); // evaluates how to play an ace automatically to simulate the appearance of strategy
        } else if (typeof computerPlayedCards[i] === 'string' && computerPlayedCards[i] != 'ace') {
            computerPlayedCards[i] = 10; // explicitly changes 'royal' cards to a value of 10
        }
    }
    for (let i = 0; i < humanPlayedCards.length; i++) {
        if (humanPlayedCards.includes('ace')) {
            handleAce(); // evaluates how to play an ace, where ace = 10 if playerTotal < 12
        } else if (typeof humanPlayedCards[i] === 'string' && humanPlayedCards[i] != 'ace') {
            humanPlayedCards[i] = 10;
        }
    }
}

/**
 * Prevents the player/computer from taking additional turns, 
 * displays a message to the user, and switches the turnOwner. 
 */
function stand() {
    if (turnOwner === 'computer' && playerStood === false) { 
        computerStood = true;
        opponentMessage.innerHTML = `<strong>The computer has stood.</strong>`;
        opponentMessage.style.visibility = 'visible';
        switchTurn();
    } else if (turnOwner === 'player' && computerStood === false) {
        playerStood = true;
        playerMessage.innerHTML = `<strong>You have stood.</strong>`;
        playerMessage.style.visibility = 'visible';
        switchTurn();
    } else if (turnOwner === 'computer' && playerStood === true) {
        computerStood = true;
        opponentMessage.innerHTML = `<strong>The computer has stood.</strong>`;
        opponentMessage.style.visibility = 'visible';
        evaluateWinner();
    } else if (turnOwner === 'player' && computerStood === true) {
        playerStood = true;
        evaluateWinner();
    } else {
        throw 'No condition matched within [stand()] function.';
    }
}

/**
 * Asks for another card to be added to the player/computer's hand, 
 * and calls switchTurn if the one player has not stood. 
 */
function hit() {
    dealCard();
    if (computerStood === false || playerStood === false) {
        switchTurn();
        if (playerTotal === 21 && computerStood === true) {
            playerStood = true;
            evaluateWinner();
        } else if (computerTotal === 21 && playerStood === true) {
            computerStood = true;
            evaluateWinner();
        }
    }

}

/**
 * Changes the riskValue variable depending how close the computerTotal
 * variable is to 21. Directly impacts how likely the computer is to 
 * choose to call the hit function. 
 */
function evaluateRisk() {
    if (turnOwner === 'computer') {
        if (computerTotal < 10) {
            riskValue = 0.05;
        } else if (computerTotal < 13) {
            riskValue = 0.15;
        } else if (computerTotal < 15) {
            riskValue = 0.25;
        } else if (computerTotal <= 17) {
            riskValue = 0.85;
        } else if (computerTotal >= 18) {
            riskValue = 0.95;
        } else {
            throw 'No condition matched [evaluateRisk()] function for riskValue assignment.';
        }
    }
}

/**
 * Swaps the value of the turnOwner variable to the other player, or calls 
 * the evaluateWinner function if both have now stood. 
 */
function switchTurn() {
    if (turnOwner === 'computer' && playerStood === false) {
        hitButton.addEventListener('click', hit);
        standButton.addEventListener('click', stand);
        turnOwner = 'player';
        playerMessage.style.visibility = 'visible';
        if (computerStood === false) {
            opponentMessage.style.visibility = 'hidden';
        }
    } else if (turnOwner === 'player' && computerStood === false) {
        turnOwner = 'computer';
        if (playerStood === false) {
            playerMessage.style.visibility = 'hidden';
        }
        document.getElementById('opponent-message').style.visibility = 'visible';
        hitButton.removeEventListener('click', hit);
        standButton.removeEventListener('click', stand);
        setTimeout(computerTurn, 3000);
    } else if (turnOwner === 'computer' && playerStood === true) {
        setTimeout(computerTurn, 3000);
    } else {
        evaluateWinner();
    }
}

/**
 * Evaluates the computerTotal variable, and decides the
 * value of an ace automatically based on hand total. 
 */
function handleAce() {
    if (turnOwner === 'computer' && computerPlayedCards.includes('ace')) {
        if (computerTotal <= 10) {
           let i = computerPlayedCards.indexOf('ace');
            computerPlayedCards[i] = 11;
        } else if (computerTotal >= 11) {
            let i = computerPlayedCards.indexOf('ace');
            computerPlayedCards[i] = 1;
        } else {
            throw 'No condition was matched for handleAce() evaluation (computer).';
        }
    }
    if (turnOwner === 'player' && humanPlayedCards.includes('ace')) {
        if (playerTotal <= 10) {
            let i = humanPlayedCards.indexOf('ace');
            humanPlayedCards[i] = 11;
        } else if (playerTotal >= 11) {
            let i = humanPlayedCards.indexOf('ace');
            humanPlayedCards[i] = 1;
        } else {
            throw 'No condition was matched for handleAce() evaluation (player).';
        }
    }
}

/**
 * Evaluates playerTotal and computerTotal variables when both 
 * have stood, and assigns a winner.
 */
function evaluateWinner() {
    if (playerStood === true && computerStood === true) {
        if (playerTotal > computerTotal && playerTotal < 22) {
            playerScore++;
            document.getElementById('player-score').innerHTML = `<strong>Player Score: ${playerScore}</strong>`;
            resetVariables();
            hitButton.removeEventListener('click', hit);
            hitButton.innerText = 'PLAY AGAIN?';
            standButton.style.visibility = 'hidden';
            hitButton.addEventListener('click', startGame);
        } else if (playerTotal < computerTotal && computerTotal < 22) {
            computerScore++;
            document.getElementById('computer-score').innerHTML = `<strong>Opponent Score: ${computerScore}</strong>`;
            hitButton.removeEventListener('click', hit);
            hitButton.innerText = 'PLAY AGAIN?';
            standButton.style.visibility = 'hidden';
            hitButton.addEventListener('click', startGame);return;
        } else if (playerTotal === computerTotal) {
            hitButton.removeEventListener('click', hit);
            hitButton.innerText = 'PLAY AGAIN?';
            standButton.style.visibility = 'hidden';
            hitButton.addEventListener('click', startGame);
        }
    }
}