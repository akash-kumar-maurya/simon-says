const colors = ["red", "green", "blue", "yellow"];

let gameSeq = [];
let userSeq = [];
let level = 0;
let highestScore = 0;
let started = false;
let acceptingInput = false; // blocks clicks while the sequence is playing

const statusEl = document.querySelector("#status");
const levelEl = document.querySelector("#level");
const bestEl = document.querySelector("#best");
const startBtn = document.querySelector("#start");
const buttons = document.querySelectorAll(".btn");

function startGame() {
  if (started) return;
  started = true;
  startBtn.style.display = "none";
  levelUp();
}

document.addEventListener("keydown", startGame);
startBtn.addEventListener("click", startGame);

function flash(btn, ms = 300) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), ms);
}

function levelUp() {
  userSeq = [];
  level++;
  levelEl.innerText = level;
  statusEl.innerText = `Level ${level}`;

  const randColor = colors[Math.floor(Math.random() * colors.length)];
  gameSeq.push(randColor);

  acceptingInput = false;
  setTimeout(() => {
    flash(document.getElementById(randColor));
    acceptingInput = true; // player can click after the flash starts
  }, 1000);
}

function btnPress() {
  if (!started || !acceptingInput) return;

  flash(this, 200);
  userSeq.push(this.id);
  checkAns(userSeq.length - 1);
}

buttons.forEach((btn) => btn.addEventListener("pointerdown", btnPress));

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      acceptingInput = false;
      levelUp();
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  const score = level - 1;
  if (score > highestScore) highestScore = score;

  statusEl.innerHTML = `Game over! Your score was <b>${score}</b>.<br>Press any key to start.`;
  bestEl.innerText = highestScore;

  document.body.classList.add("game-over");
  setTimeout(() => document.body.classList.remove("game-over"), 500);

  reset();
}

function reset() {
  started = false;
  acceptingInput = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  levelEl.innerText = 0;
  startBtn.style.display = "";
  startBtn.innerText = "Play Again";
}