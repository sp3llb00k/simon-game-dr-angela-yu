// alert("test");

// arrays, setup for the game
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickPattern = [];

var currentLevel = 0;

var guessNum = 0;

// Random chosen color for next sequence in game

function nextSequence(){
  userClickPattern = [];
  guessNum = 0;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log("game click pattern: " + gamePattern);
  soundEffect(randomChosenColor);
  $("#" + randomChosenColor).fadeOut().fadeIn();
  // setTimeout($("#" + randomChosenColor).fadeOut().fadeIn(), 5000);
  currentLevel++;
  $("h1").text("Level " + currentLevel);
  console.log("current level is: " + currentLevel);
}

// check answer

function checkAnswer(currentLevel){
  console.log(gamePattern[guessNum]);
  console.log(userClickPattern[guessNum]);
  console.log(guessNum);
  if (gamePattern[guessNum] === userClickPattern[guessNum]){
    console.log("correct");
    if (guessNum === currentLevel - 1) {
      setTimeout(nextSequence, 500);
    }
  }
  else {
    console.log("incorrect");
    soundEffect("wrong");
    wrongPress();
    startOver();
  }
  guessNum++;
}

// Start Game aka key press event listener
function startGame(){
  $(document).keydown(function(event){
    console.log("key pressed : " + event.key);
    if (currentLevel === 0){
      nextSequence();
    }
  })
}

startGame();

// click button event listener interaction

$(".btn").click(function(event){
  var userChosenColor = event.target.id;
  soundEffect(userChosenColor);
  animatePress(userChosenColor);
  userClickPattern.push(userChosenColor);
  console.log("user click pattern: " + userClickPattern);
  checkAnswer(currentLevel);
})

// start over after wrong guess

function startOver(){
  gamePattern = [];
  currentLevel = 0;
  startGame();
}

// animation for clicked button

function animatePress (pressedColor){
  $("#" + pressedColor).addClass("pressed");
  setTimeout(function(){
    $("#" + pressedColor).removeClass("pressed");
  }, 100);
}

// animation for wrong guessNum

function wrongPress (){
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over")}, 200);
  $("h1").text("Game Over, Press Any Key to Restart")
}

// sound effects switch function taking inputs of color, also wrong

function soundEffect(input){
  switch (input) {
    case "blue":
        var blueSound = new Audio('sounds/blue.mp3');
        blueSound.play();
        break;

    case "green":
        var greenSound = new Audio('sounds/green.mp3');
        greenSound.play();
        break;

    case "red":
        var redSound = new Audio('sounds/red.mp3');
        redSound.play();
        break;

    case "yellow":
        var yellowSound = new Audio('sounds/yellow.mp3');
        yellowSound.play();
        break;

    case "wrong":
        var wrongSound = new Audio('sounds/wrong.mp3');
        wrongSound.play();
        break;

    default: console.log("error");

}
}
