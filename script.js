'use strict';
// SELECTORS
const scoreOne = document.querySelector('#score--0');
const scoreTwo = document.querySelector('#score--1');
const currentScoreOne = document.querySelector('#current--0');
const currentScoreTwo = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const sectionPlayer = document.querySelectorAll('section');

// VALUES
const scores = [0, 0];
let currentScore = 0;
let image = './img/dice-';
let activePlayer = 0;
let playing = true;

// INITIALIZE THE VALUES
scoreOne.textContent = currentScore;
scoreTwo.textContent = currentScore;
dice.classList.add('hidden');

function generateDice() {
  return Math.ceil(Math.random() * 6);
}

function switchPlayer() {
  // in  this situation u can use classList.toggle();
  if (activePlayer == 1) {
    sectionPlayer[0].classList.remove('player--active');
    sectionPlayer[1].classList.add('player--active');
  } else {
    sectionPlayer[1].classList.remove('player--active');
    sectionPlayer[0].classList.add('player--active');
  }
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    // generating random number
    const number = generateDice();
    // dispaly dice
    dice.classList.remove('hidden');
    dice.src = `${image + number}.png`;

    // check for rolled: if TRUE switch next
    if (number !== 1) {
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer == 0 ? 1 : 0;
      currentScore = 0;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] > 10) {
      console.log(activePlayer + '==');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
    }
    activePlayer = activePlayer == 0 ? 1 : 0;

    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scoreOne.textContent = scores[0];
  scoreTwo.textContent = scores[1];
  currentScoreOne.textContent = currentScore;
  currentScoreTwo.textContent = currentScore;
  sectionPlayer[1].classList.remove('player--active');
  sectionPlayer[0].classList.add('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
});
