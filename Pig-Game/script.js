'use strict';

const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const imgDice = document.querySelector('.dice');
const players = document.querySelectorAll('.player');

const scores = [document.querySelector('#score--0'), document.querySelector('#score--1')];
const current = [document.querySelector('#current--0'), document.querySelector('#current--1')];

let activePlayerIndex =0;

const init = function() {
    imgDice.classList.add('hidden');
    activePlayerIndex = 0;
    scores[0].textContent = 0;
    current[0].textContent = 0;
    scores[1].textContent = 0;
    current[1].textContent = 0;
    players[0].classList.remove('player--winner');
    players[0].classList.add('player--active');
    players[1].classList.remove('player--winner');
    players[1].classList.remove('player--active');
}

init();

const switchPlayer = function() {
    if(players[0].classList.contains('player--active')) {
        players[0].classList.remove('player--active');
        players[1].classList.add('player--active');
        activePlayerIndex = 1;
    } else {
        players[1].classList.remove('player--active');
        players[0].classList.add('player--active');
        activePlayerIndex = 0;
    }
}

btnNewGame.addEventListener('click', init);

btnRollDice.addEventListener('click', function() {
    if(Number(scores[activePlayerIndex].textContent) >=100) {
        return;
    }
    // Calculate Dice number between 1 to 6
    const diceNumber = Math.trunc((Math.random())*6) +1;
    imgDice.classList.remove('hidden');
    imgDice.setAttribute('src',`dice-${diceNumber}.png`);
    

    //If dice number is 1, active Player's current score becomes zero and flip the game.
    if(diceNumber === 1) {
        current[activePlayerIndex].textContent = '0';
        switchPlayer();
    } else {
        const currentScore = Number(current[activePlayerIndex].textContent);
        current[activePlayerIndex].textContent = currentScore + diceNumber;
    }

});

btnHold.addEventListener('click', function() {
    const totalScore = Number(scores[activePlayerIndex].textContent) + Number(current[activePlayerIndex].textContent);
    scores[activePlayerIndex].textContent = totalScore;
    current[activePlayerIndex].textContent = '0';

    if(totalScore < 100) {
        switchPlayer();
    } else {
        players[activePlayerIndex].classList.remove('player--active');
        players[activePlayerIndex].classList.add('player--winner');
        imgDice.classList.add('hidden');        
    }
});