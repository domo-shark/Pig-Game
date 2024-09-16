"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let scores, currentScore, isFinished, activePlayer;
// Starting Conditoins
const init = () => {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	isFinished = false;
	diceEl.classList.add("hidden");
	player0El.classList.remove("player--winner");
	player1El.classList.remove("player--winner");
	player1El.classList.remove("player--active");
	player0El.classList.add("player--active");
	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;
};

init();

// Rolling dice functionality
const SwitchPlayer = () => {
	currentScore = 0;
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	player0El.classList.toggle("player--active");
	player1El.classList.toggle("player--active");
	activePlayer = activePlayer === 0 ? 1 : 0;
};

const IsWinGame = () => {
	if (scores[activePlayer] >= 100) {
		// Finish the game
		document
			.querySelector(`.player--${activePlayer}`)
			.classList.add("player--winner");
		document
			.querySelector(`.player--${activePlayer}`)
			.classList.remove("player--active");
		diceEl.classList.add("hidden");
		isFinished = true;
	} else {
		// Switch to the mext player
		SwitchPlayer();
	}
};

btnRoll.addEventListener("click", function () {
	if (!isFinished) {
		// 1. Generating a random dice roll
		const dice = Math.trunc(Math.random() * 6) + 1;
		// 2. Display dice
		diceEl.classList.remove("hidden");
		diceEl.src = `dice-${dice}.png`;
		// 3. Check for rolled 1: if true
		if (dice !== 1) {
			// Add dice to current score
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		} else {
			// Switch to next player
			SwitchPlayer();
		}
	}
});

btnHold.addEventListener("click", function () {
	if (!isFinished) {
		// 1. Add current score to active player's score
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer];
		// 2. Check if player's score is >= 100
		IsWinGame();
	}
});

btnNew.addEventListener("click", init);
