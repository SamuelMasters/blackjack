// Setup initial event listeners for player buttons
let hitButton = document.getElementById('hit-button');
let standButton = document.getElementById('stand-button');
let opponentMessage = document.getElementById('opponent-message');
let playerMessage = document.getElementById('turn-reminder');

document.addEventListener('DOMContentLoaded', function () {
    hitButton.innerText = 'START GAME!';
    hitButton.addEventListener('click', startGame);
    standButton.addEventListener('click', stand);
    standButton.style.visibility = 'hidden';
    document.getElementById('opponent-message').style.visibility = 'hidden';
});

// Initial declaration of global variables for use within functions. 
let computerPlayedCards = []; // contains all cards dealth to computer in current round
let humanPlayedCards = []; // contains all cards dealt to player in current round
let turnOwner = undefined; // indicates who the current turn belongs to
let computerTotal = 0; // the total of the computer's hand
let playerTotal = 0; // the total of the player's hand
let riskValue = 0; // this value will range from 0 - 1, increasing as the computer total approaches 21
let computerScore = 0; // represents rounds won by the computer in the current session
let playerScore = 0; // represents rounds won by the player in the current session
let playerStood = false; // indicates whether the player has stood down
let computerStood = false; // indicates whether the computer has stood down

// Generate a full deck of 52 'cards' / values
// Consider putting this in a function to allow for repeated resets after each game
let cardDeck = [];
let values = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "king", "queen"];

/**
 * Logs the selected variables to the console, used for 
 debugging purposes.
 */
function logVariables() {
    console.log('Cards remaining: ' + cardDeck.length);
    console.log('Whose turn is it? ' + turnOwner);
    console.log('Computer hand: ' + computerPlayedCards);
    console.log('Computer Total: ' + computerTotal);
    console.log('Player hand: ' + humanPlayedCards);
    console.log('Player Total: ' + playerTotal);
    console.log('Risk Value: ' + riskValue);
    console.log('Player stood? ' + playerStood);
    console.log('Computer stood? ' + computerStood);
    console.log('Player Score: ' + playerScore);
    console.log('Computer Score: ' + computerScore);
}

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
    // riskValue = 0;
    playerStood = false;
    computerStood = false;
    console.log('playerStood, computerStood, playerTotal, computerTotal all reset, and turnOwner set to player.');
}


function startGame() {
    console.log("Starting new game...");
    hitButton.innerText = 'HIT';
    hitButton.removeEventListener('click', startGame);
    opponentMessage.innerText = "It is the opponent's turn!";
    resetVariables();
    console.log('Variables have been reset.');

    setTimeout(console.log('Waiting...'), 3000);
    resetCardDeck();
    dealStartingCards();
    // determineStartingPlayer();
    // if (humanPlayedCards.includes('ace')) {
    //     i = humanPlayedCards.indexOf('ace');
    //     humanPlayedCards[i] = 10;
    // }

    // The two for loops here check for aces in the opening hands, and 
    // convert them to a numerical value of 10. 
    for (let i = 0; i < humanPlayedCards.length; i++) {
        if (humanPlayedCards[i] === 'ace') {
            humanPlayedCards[i] = 10;
        }
    }
    for (let i = 0; i < computerPlayedCards.length; i++) {
        if (computerPlayedCards[i] === 'ace') {
            computerPlayedCards[i] = 10;
        }
    }
    // turnOwner = 'computer';
    // handleAce();
    // turnOwner = 'player'; // player always goes first, AKA 'dealer advantage', consider removing determineStartingPlayer() function?
    // console.log('Turn owner reset to player.');
    // handleAce();
    evaluateCards();
    console.log('evaluateCards() called from startGame() function.');
    // evaluateRisk();
    // if (turnOwner === 'computer') {
    //     computerTurn();
    // }    
    playerMessage.style.visibility = 'visible';
    hitButton.addEventListener('click', hit);
    standButton.style.visibility = 'visible';
    standButton.addEventListener('click', stand);
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
    console.log(`The player's opening cards are ${humanPlayedCards}.`);
    document.getElementById('computer-cards').innerText = `[${computerPlayedCards}]`;
    console.log(`The computer's opening cards are ${computerPlayedCards}.`);
}

/**
 * Evaluates whether a random number between 0 - 1 exceeds the current 
 * riskValue variable, and hits or stands accordingly. 
 */
function computerTurn() {
    evaluateRisk();
    let randomValue = Math.random();
    console.log(`Random value is: ${randomValue}`);
    if (randomValue > riskValue) {
        hit();
        console.log('The computer chose to hit.');
    } else if (playerTotal < computerTotal === true && playerStood === true) { // the computer should stand if it exceeds the playerTotal and the player has stood
        stand();
        console.log('The computer chose to stand.');
    } else if (playerTotal === computerTotal && randomValue < riskValue) {
        stand();
        console.log('The computer chose to stand.');
    } else if (randomValue < riskValue && playerTotal < computerTotal === true) {
        stand();
        console.log('The computer chose to stand.');
    } else if (playerStood === true && playerTotal > computerTotal) {
        hit();
        console.log('The computer chose to hit.');
    } else {
        stand();
        console.log('No evaluation matched for computerTurn() function, defaulting to stand().'); // testing shows that this triggers when it shouldn't
    }

    if (playerStood === true && computerStood === false) {
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
        console.log('The player chose hit, and is about to be dealt another card.');
        humanPlayedCards.push(chooseRandomCard());
        // handleAce();
        evaluatePlayerTotal();
        document.getElementById('player-cards').innerText = `[${humanPlayedCards}]`;
        console.log(`The player's cards are now ${humanPlayedCards}.`)
    } else if (turnOwner === 'computer') {
        console.log('The computer chose hit, and is about to be dealt another card.');
        computerPlayedCards.push(chooseRandomCard());
        // handleAce();
        evaluateComputerTotal();
        // evaluateRisk(); // leaving this commented out for testing (appears to be running twice on some turns)
        document.getElementById('computer-cards').innerText = `[${computerPlayedCards}]`;
        console.log(`The computer's cards are now ${computerPlayedCards}.`);
    } else {
        throw 'turnOwner variable is invalid! [dealCard() function]';
    }
}

/**
 * Calculates the total of the computers's hand, updates player score if 
 * computer's hand exceeds 21 ('bust'). 
 */
function evaluateComputerTotal() {
    convertRoyals(); // converts 'royal' cards to a numerical value of 10  

    computerTotal = computerPlayedCards.reduce(function (a, b) { // https://www.tutorialrepublic.com/faq/how-to-find-the-sum-of-an-array-of-numbers-in-javascript.php
        return a + b; // sums the numerical values of PlayedCards arrays
    }, 0);

    document.getElementById('computer-total').innerText = `${computerTotal}`;

    // checks if the computer has gone bust
    if (computerTotal > 21) {
        console.log('The computer has gone bust!');
        opponentMessage.innerText = 'The computer has bust!';
        playerScore++;
        console.log("The player's score has increased by 1.");
        document.getElementById('player-score').innerText = `Your Score: ${playerScore}`;
        // console.log("Automatically starting new game from evaluateComputerTotal() function...");
        // setTimeout(startGame, 3000); // THIS NEEDS TO BE REPLACED WITH A USER MESSAGE ASKING IF THEY WANT TO PLAY AGAIN
        hitButton.removeEventListener('click', hit);
        hitButton.innerText = 'PLAY AGAIN?';
        hitButton.addEventListener('click', startGame);
        standButton.style.visibility = 'hidden';
        return;
    }

    console.log(`Computer total is now ${computerTotal}.`);
    // return computerTotal;
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
        console.log("You've gone bust!");
        computerScore++;
        console.log("The computer's score has incremented by 1.");
        // computerStood = true;
        playerStood = true;
        document.getElementById('computer-score').innerText = `Opponent Score: ${computerScore}`;
        // console.log('Starting new game automatically from the evaluatePlayerTotal() function...');
        // setTimeout(startGame, 3000); // THIS NEEDS TO BE REPLACED WITH A USER MESSAGE ASKING IF THEY WANT TO PLAY AGAIN
        hitButton.removeEventListener('click', hit);
        hitButton.innerText = 'PLAY AGAIN?';
        standButton.style.visibility = 'hidden';
        hitButton.addEventListener('click', startGame); // in debugging, the script continued to run onto the computer's turn at this point!
        return; 
    } else if (playerTotal === 21) {
        playerStood = true;
        console.log("The player automatically stands, having reached 21.");
    }
    console.log(`Player total is now ${playerTotal}.`);
    // return playerTotal;
}

/**
 * Allows for separate, simultaneous calculation and updating of 
 * player and computer hand totals.
 */
function evaluateCards() {
    // handleAce();
    evaluateComputerTotal();
    evaluatePlayerTotal();
    // document.getElementById('computer-total').innerText = `${computerTotal}`; // updates the hand total value on game interface
    // document.getElementById('player-total').innerText = `${playerTotal}`; // updates the hand total value on game interface
}

/**
 * Looks for 'royal' cards in player and computer hands, and converts
 * them to the numerical value of 10. 
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
 * Randomly chooses which player will take their turn first
 * after initial cards are dealt. 
 */
// function determineStartingPlayer() {
//     let randomNum = Math.random();
//     if (randomNum < 0.5) {
//         turnOwner = 'computer';
//     } else if (randomNum > 0.5) {
//         turnOwner = 'player';
//         playerMessage.style.visibility = 'visible';
//     } else {
//         throw 'Invalid conditional value for randomNum variable! [determineStartingPlayer()] function';
//     }
// }

function stand() {
    // alert("The 'stand' button was pressed!");
    if (turnOwner === 'computer' && playerStood === false) {
        computerStood = true;
        console.log('The computer has chosen to stand.');
        switchTurn();
        return;
    } else if (turnOwner === 'player' && computerStood === false) {
        playerStood = true;
        console.log('The player has chosen to stand.');
        switchTurn();
        return;
    } else if (turnOwner === 'computer' && playerStood === true) {
        computerStood = true;
        console.log('Both players have now stood.');
        evaluateWinner();
    } else if (turnOwner === 'player' && computerStood === true) {
        playerStood = true;
        console.log('Both players have now stood.');
        evaluateWinner();
    } else {
        throw 'No condition matched within [stand()] function.';
    }
}

function hit() {
    // alert("The 'hit' button was pressed!");
    dealCard();
    // if (turnOwner === 'player') {
    //     handleAce();
    //     console.log('Aces were automatically handled for the player.');
    // }
    switchTurn();
    if (playerTotal === 21 && computerStood === true) {
        playerStood = true;
        evaluateWinner();
    } else if (computerTotal === 21 && playerStood === true) {
        computerStood = true;
        evaluateWinner();
    }
}

// function drawCard() {
//     let activeCard = chooseRandomCard();
// }

/**
 * Changes the riskValue variable depending how close the computerTotal
 * variable is to 21. 
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
    console.log(`Risk value evaluated and set to ${riskValue}.`);
}

/**
 * Swaps the value of the turnOwner variable to the other player. 
 */
function switchTurn() {
    if (turnOwner === 'computer' && playerStood === false) {
        hitButton.addEventListener('click', hit);
        standButton.addEventListener('click', stand);
        turnOwner = 'player';
        playerMessage.style.visibility = 'visible';
        document.getElementById('opponent-message').style.visibility = 'hidden';
        console.log(`The condition to change the turnOwner variable to "player" was matched. turnOwner = ${turnOwner}`);
    } else if (turnOwner === 'player' && computerStood === false) {
        turnOwner = 'computer';
        console.log(`The condition to change the turnOwner variable to 'computer' was matched. turnOwner = ${turnOwner}`);
        playerMessage.style.visibility = 'hidden';
        document.getElementById('opponent-message').style.visibility = 'visible';
        hitButton.removeEventListener('click', hit);
        standButton.removeEventListener('click', stand);
        computerTurn();
        // return;
    } else if (turnOwner === 'computer' && playerStood === true) {
        console.log('Calling computerTurn() function from switchTurn() function...');
        setTimeout(console.log('Three seconds...'));
        computerTurn();
    } else if (turnOwner === 'player' && computerStood === true) {
        // console.log("It is the player's turn, and the computer has already stood.");
    } else {
        evaluateWinner();
    }
    console.log(`It is currently the ${turnOwner}'s turn.`);
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
            console.log("Ace was evaluated for CPU, and set as 10.")
        } else if (computerTotal >= 12) {
            i = computerPlayedCards.indexOf('ace');
            computerPlayedCards[i] = 1;
            console.log("Ace was evaluated for CPU, and set as 1.");
        } else {
            throw 'No condition was matched for handleAce() evaluation (computer).';
        }
    }
    if (turnOwner === 'player' && humanPlayedCards.includes('ace')) {
        if (playerTotal < 12) {
            i = humanPlayedCards.indexOf('ace');
            humanPlayedCards[i] = 10;
            console.log("Ace was evaluated for player, and set as 10.")
        } else if (playerTotal >= 12) {
            i = humanPlayedCards.indexOf('ace');
            humanPlayedCards[i] = 1;
            console.log("Ace was evaluated for player, and set as 1.")
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
            document.getElementById('player-score').innerText = `Your Score: ${playerScore}`;
            resetVariables();
            console.log('You won the round!');
            // console.log('Starting new game automatically from evaluateWinner() function...');
            // setTimeout(startGame, 3000); // automatically starts a new game after the round ends // THIS NEEDS TO BE REPLACED WITH A USER MESSAGE ASKING IF THEY WANT TO PLAY AGAIN
            hitButton.removeEventListener('click', hit);
            hitButton.innerText = 'PLAY AGAIN?';
            standButton.style.visibility = 'hidden';
            hitButton.addEventListener('click', startGame);
            return;
        } else if (playerTotal < computerTotal && computerTotal < 22) {
            computerScore++;
            document.getElementById('computer-score').innerText = `Opponent Score: ${computerScore}`;
            console.log('The computer won the round!');
            hitButton.removeEventListener('click', hit);
            hitButton.innerText = 'PLAY AGAIN?';
            standButton.style.visibility = 'hidden';
            hitButton.addEventListener('click', startGame);
            // console.log('Starting new game automatically from evaluateWinner() function...');
            // setTimeout(startGame, 3000); // automatically starts a new game after the round ends // THIS NEEDS TO BE REPLACED WITH A USER MESSAGE ASKING IF THEY WANT TO PLAY AGAIN
            return;
        } else if (playerTotal === computerTotal) {
            console.log("It's a tie!");
            hitButton.removeEventListener('click', hit);
            hitButton.innerText = 'PLAY AGAIN?';
            standButton.style.visibility = 'hidden';
            hitButton.addEventListener('click', startGame);
            // console.log('Starting new game automatically from evaluateWinner() function...');
            // setTimeout(startGame, 3000); // automatically starts a new game after the round ends // THIS NEEDS TO BE REPLACED WITH A USER MESSAGE ASKING IF THEY WANT TO PLAY AGAIN
            return;
        }
    }
}