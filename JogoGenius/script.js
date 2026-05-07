const pads = document.querySelectorAll(".pad");

const startBtn = document.getElementById("startBtn");

const restartBtn = document.getElementById("restartBtn");

const roundText = document.getElementById("round");

const recordText = document.getElementById("record");

const message = document.getElementById("message");

const gameOver = document.getElementById("gameOver");

const finalText = document.getElementById("finalText");

const colors = [
  "green",
  "red",
  "yellow",
  "blue"
];

let sequence = [];

let playerSequence = [];

let round = 0;

let canPlay = false;

let record =
localStorage.getItem("geniusRecord") || 0;

recordText.textContent = record;

const sounds = {
  green: document.getElementById("greenSound"),
  red: document.getElementById("redSound"),
  yellow: document.getElementById("yellowSound"),
  blue: document.getElementById("blueSound")
};

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", restartGame);

pads.forEach(pad => {

  pad.addEventListener("click", () => {

    if(!canPlay) return;

    const color = pad.dataset.color;

    playerSequence.push(color);

    flash(color);

    playSound(color);

    checkMove();

  });

});

function startGame(){

  round = 0;

  sequence = [];

  playerSequence = [];

  gameOver.classList.add("hidden");

  nextRound();

}

function restartGame(){

  startGame();

}

function nextRound(){

  playerSequence = [];

  round++;

  roundText.textContent = round;

  const randomColor =
  colors[Math.floor(Math.random() * colors.length)];

  sequence.push(randomColor);

  message.textContent =
  "Observe a sequência";

  showSequence();

}

function showSequence(){

  canPlay = false;

  let delay = 0;

  sequence.forEach(color => {

    setTimeout(() => {

      flash(color);

      playSound(color);

    }, delay);

    delay += 700;

  });

  setTimeout(() => {

    canPlay = true;

    message.textContent =
    "Sua vez";

  }, delay);

}

function flash(color){

  const pad =
  document.querySelector(`.${color}`);

  pad.classList.add("active");

  setTimeout(() => {

    pad.classList.remove("active");

  }, 350);

}

function playSound(color){

  sounds[color].currentTime = 0;

  sounds[color].play();

}

function checkMove(){

  const current =
  playerSequence.length - 1;

  if(playerSequence[current]
  !== sequence[current]){

    loseGame();

    return;

  }

  if(playerSequence.length
  === sequence.length){

    canPlay = false;

    message.textContent =
    "Acertou";

    setTimeout(() => {

      nextRound();

    }, 1200);

  }

}

function loseGame(){

  canPlay = false;

  message.textContent =
  "Errou";

  if(round > record){

    record = round;

    localStorage.setItem(
      "geniusRecord",
      record
    );

    recordText.textContent = record;

  }

  finalText.textContent =
  `Você chegou na rodada ${round}`;

  gameOver.classList.remove("hidden");

}