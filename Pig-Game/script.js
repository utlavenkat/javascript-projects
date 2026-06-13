'use strict';

const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const imgDice = document.querySelector('.dice');
const players = document.querySelectorAll('.player');

let activePlayerTotalScore;
let activePlayerCurrentScore;
let activePlayer;
let inactivePlayer;

const player1TotalScore = document.querySelector('#score--0') ;
const player1CurrentScore = document.querySelector('#current--0') ;
const player2TotalScore = document.querySelector('#score--1') ;
const player2CurrentScore = document.querySelector('#current--1') ;

const diceImgDisplay = function(display) {
    imgDice.style.display = display ? 'block' : 'none';
}
diceImgDisplay(false);

const resetScores = function() {
    player1TotalScore.textContent = 0;
    player1CurrentScore.textContent = 0;
    player2TotalScore.textContent = 0;
    player2CurrentScore.textContent = 0;
    players[0].classList.remove('player--winner');
    players[1].classList.remove('player--winner');
    players[1].classList.remove('player--active');
    if(!players[0].classList.contains('player--active')) {
        players[0].classList.add('player--active');
    }
    activePlayer = players[0];
    assignPlayers();
    diceImgDisplay(false);
}

const diceImageUpdate = function(dice) {
    diceImgDisplay(true);
    switch (dice){
        case 1 : imgDice.setAttribute('src','dice-1.png');
                 break;
        case 2 : imgDice.setAttribute('src','dice-2.png');
                 break;
        case 3 : imgDice.setAttribute('src','dice-3.png');
                 break;
        case 4 : imgDice.setAttribute('src','dice-4.png');
                 break;
        case 5 : imgDice.setAttribute('src','dice-5.png');
                 break;
        case 6 : imgDice.setAttribute('src','dice-6.png');
                 break;
    }
}

const assignPlayers = function() {
    if(players[0].classList.contains('player--active')) {
        activePlayer = players[0];
        inactivePlayer = players[1];
        activePlayerTotalScore = player1TotalScore;
        activePlayerCurrentScore = player1CurrentScore;
    } else {
        activePlayer = players[1];
        inactivePlayer = players[0];
        activePlayerTotalScore = player2TotalScore;
        activePlayerCurrentScore = player2CurrentScore;
    }
}

assignPlayers();

const flipGame = function() {
    if(players[0].classList.contains('player--active')) {
        players[0].classList.remove('player--active');
        players[1].classList.add('player--active');
        activePlayer = players[1];
        inactivePlayer = players[0];
        activePlayerTotalScore = player2TotalScore;
        activePlayerCurrentScore = player2CurrentScore;
    } else {
        players[1].classList.remove('player--active');
        players[0].classList.add('player--active');
        activePlayer = players[0];
        inactivePlayer = players[1];
        activePlayerTotalScore = player1TotalScore;
        activePlayerCurrentScore = player1CurrentScore;
    }
}

const rollDice = function() {
    if(Number(activePlayerTotalScore.textContent) >=100) {
        return;
    }
    // Calculate Dice number between 1 to 6
    const diceNumber = Math.trunc((Math.random())*6) +1;
    diceImageUpdate(diceNumber);  
    

    //If dice number is 1, active Player's current score becomes zero and flip the game.
    if(diceNumber === 1) {
        activePlayerCurrentScore.textContent = '0';
        flipGame();
    } else {
        const currentScore = Number(activePlayerCurrentScore.textContent);
        activePlayerCurrentScore.textContent = currentScore + diceNumber;
    }

}

const holdGame = function() {
    const totalScore = Number(activePlayerTotalScore.textContent) + Number(activePlayerCurrentScore.textContent);
    activePlayerTotalScore.textContent = totalScore;
    activePlayerCurrentScore.textContent = '0';

    if(totalScore < 100) {
        flipGame();
    } else {
        activePlayer.classList.remove('player--active');
        activePlayer.classList.add('player--winner');
        diceImgDisplay(false);
        
    }
}

btnNewGame.addEventListener('click', resetScores);
btnRollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdGame);