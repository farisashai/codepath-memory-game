var sequence = [];
var turn = 1;
var step = 1;
var inProgress = false;
var play;
var sounds = [
  "https://cdn.glitch.com/276d7ca5-41b8-401f-b6b5-ed11f826ba06%2Fpiano_middle_C.mp3?v=1616644935869",
  "https://cdn.glitch.com/276d7ca5-41b8-401f-b6b5-ed11f826ba06%2Fpiano_D.mp3?v=1616644930211",
  "https://cdn.glitch.com/276d7ca5-41b8-401f-b6b5-ed11f826ba06%2Fpiano_E.mp3?v=1616644940445",
  "https://cdn.glitch.com/276d7ca5-41b8-401f-b6b5-ed11f826ba06%2Fpiano_F.mp3?v=1616644944412"
];
var clicks = [];

var DURATION = 300;

function onStart() {
  var button = document.getElementById("start-btn");
  if (inProgress) {
    button.innerHTML = "Start";
    button.classList.remove("stop");
    button.classList.add("start");
    clearInterval(play);
    console.log("Game interrupted");
    document.getElementById('current-turn').innerHTML = "Turn: 1/8";
    turn = 1;
    step = 1;
    sequence = [];
    clicks = [];
  } else {
    button.innerHTML = "Stop";
    button.classList.remove("start");
    button.classList.add("stop");
    generateSequence();
    play = setInterval(nextSquare, 1000);
    document.getElementById("page-subtitle").innerHTML =
      "Repeat the pattern back to win!";
  }
  inProgress = !inProgress;
}

function nextSquare() {
  if (step <= turn) {
    console.log("Square Active");
    selectButton(sequence[step - 1]);
    step++;
  } else {
    clearInterval(play);
  }
}

function checkClick() {
  var button = document.getElementById("start-btn");
  if (clicks.length < turn) {
  } else if (clicks.length == turn) {
    if (turn == 8) {
      if (equal(clicks, sequence.slice(0, turn))) {
        document.getElementById("page-subtitle").innerHTML =
          "You won! Click start to play again";
        button.innerHTML = "Start";
        button.classList.remove("stop");
        button.classList.add("start");
        document.getElementById('current-turn').innerHTML = "Turn: 1/8";
        inProgress = false;
        turn = 1;
        step = 1;
        sequence = [];
        clicks = [];
        clearInterval(play);
        return;
      }
    }
    if (equal(clicks, sequence.slice(0, turn))) {
      console.log("Valid pattern");
      turn++;
      step = 1;
      window.setTimeout(() => {
        play = setInterval(nextSquare, 2*DURATION);
        document.getElementById('current-turn').innerHTML = `Turn: ${turn}/8`;
      }, 1000);
    } else {
      document.getElementById("page-subtitle").innerHTML =
        "Wrong move! You lose.";
      button.innerHTML = "Start";
      button.classList.remove("stop");
      button.classList.add("start");
      clearInterval(play);
      console.log("Game over");
      turn = 1;
      step = 1;
      sequence = [];
      inProgress = false;
    }
    clicks = [];
  }
}
function clicked(num) {
  console.log("Clicked ",num);
  if (step > turn) {
    selectButton(num);
    clicks.push(num);
    checkClick();
  } else {
    console.log("Ignored click");
  }
}

function selectButton(num) {
  var id = `btn-${num}`;
  document.getElementById(id).classList.add("active");
  window.setTimeout(
    () => document.getElementById(id).classList.remove("active"),
    DURATION
  );
  var sound = new Audio(sounds[num - 1]);
  sound.play();
}
function generateSequence() {
  sequence = [];
  for (let i = 0; i < 8; i++) {
    sequence.push(Math.floor(Math.random() * 4) + 1);
  }
  console.log(sequence);
}
function equal(arr1, arr2) {
  if (arr1.length != arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) {
      return false;
    }
  }
  return true;
}
