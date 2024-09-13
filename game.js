//colors array
let buttonColours = ["red", "blue", "green", "yellow"];

//generated game color pattern array
let gamePattern = [];

//user button pattern array
let userClickedPattern = [];

//for keyboard starting
let status = false;

//level counter
let level = 0;

//color Generator function
function nextSequence() {
  userClickedPattern = [];
  level++; //increases the level each time the function is executed
  $("#level-title").text("LEVEL " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber]; //selecting the random colour
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}
//button click event
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
//audio playing creator funcion
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}
//animation function for the click and the code generation
function animatePress(currentColor) {
  $("#" + currentColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); //button animation
  playSound(currentColor);

  $("." + currentColor).addClass("pressed"); //firs we add the class when the function is excecuted

  setTimeout(() => {
    $("." + currentColor).removeClass("pressed"); //then we remove the class after 2 sec
  }, 200);
}

//key boardevent detection and call the function
$(document).on("keypress", function () {
  if (!status) {
    $("#level-title").text("Level " + level);
    nextSequence();
    status = true;
  }
});
//function to check the answers
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("GAME OVER..!!!please click any key to continue");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    reset();
  }
}
function reset() {
  level = 0;
  gamePattern = 0;
  status = false;
}
